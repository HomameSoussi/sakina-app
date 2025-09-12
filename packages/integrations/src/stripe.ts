/**
 * Stripe Integration
 * Handles payments, subscriptions, and billing for Sakina Pro features
 */

import Stripe from 'stripe';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string;
  popular?: boolean;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface Subscription {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  cancel_at_period_end: boolean;
  plan: SubscriptionPlan;
  customer_id: string;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  metadata: Record<string, string>;
}

export class StripeService {
  private stripe: Stripe;

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  /**
   * Create a new customer
   */
  async createCustomer(
    email: string,
    name?: string,
    metadata: Record<string, string> = {}
  ): Promise<Customer> {
    const customer = await this.stripe.customers.create({
      email,
      name,
      metadata: {
        ...metadata,
        app: 'sakina',
        created_via: 'app_registration',
      },
    });

    return {
      id: customer.id,
      email: customer.email!,
      name: customer.name || undefined,
      phone: customer.phone || undefined,
      metadata: customer.metadata,
    };
  }

  /**
   * Get customer by ID
   */
  async getCustomer(customerId: string): Promise<Customer> {
    const customer = await this.stripe.customers.retrieve(customerId);
    
    if (customer.deleted) {
      throw new Error('Customer has been deleted');
    }

    return {
      id: customer.id,
      email: customer.email!,
      name: customer.name || undefined,
      phone: customer.phone || undefined,
      metadata: customer.metadata,
    };
  }

  /**
   * Update customer information
   */
  async updateCustomer(
    customerId: string,
    updates: {
      email?: string;
      name?: string;
      phone?: string;
      metadata?: Record<string, string>;
    }
  ): Promise<Customer> {
    const customer = await this.stripe.customers.update(customerId, updates);

    return {
      id: customer.id,
      email: customer.email!,
      name: customer.name || undefined,
      phone: customer.phone || undefined,
      metadata: customer.metadata,
    };
  }

  /**
   * Create a subscription checkout session
   */
  async createCheckoutSession(
    customerId: string,
    priceId: string,
    successUrl: string,
    cancelUrl: string,
    metadata: Record<string, string> = {}
  ): Promise<{ sessionId: string; url: string }> {
    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        ...metadata,
        app: 'sakina',
      },
      subscription_data: {
        metadata: {
          ...metadata,
          app: 'sakina',
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      customer_update: {
        address: 'auto',
        name: 'auto',
      },
    });

    return {
      sessionId: session.id,
      url: session.url!,
    };
  }

  /**
   * Create a one-time payment intent
   */
  async createPaymentIntent(
    amount: number,
    currency: string = 'usd',
    customerId?: string,
    metadata: Record<string, string> = {}
  ): Promise<PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      metadata: {
        ...metadata,
        app: 'sakina',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      client_secret: paymentIntent.client_secret!,
    };
  }

  /**
   * Get customer's active subscription
   */
  async getCustomerSubscription(customerId: string): Promise<Subscription | null> {
    const subscriptions = await this.stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      return null;
    }

    const subscription = subscriptions.data[0];
    const price = subscription.items.data[0].price;

    return {
      id: subscription.id,
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      customer_id: subscription.customer as string,
      plan: {
        id: price.id,
        name: price.nickname || 'Sakina Pro',
        description: 'Premium features for enhanced mental wellness',
        price: price.unit_amount || 0,
        currency: price.currency,
        interval: price.recurring?.interval as 'month' | 'year',
        features: [], // Will be populated from your plan configuration
        stripePriceId: price.id,
      },
    };
  }

  /**
   * Cancel subscription at period end
   */
  async cancelSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    const price = subscription.items.data[0].price;

    return {
      id: subscription.id,
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      customer_id: subscription.customer as string,
      plan: {
        id: price.id,
        name: price.nickname || 'Sakina Pro',
        description: 'Premium features for enhanced mental wellness',
        price: price.unit_amount || 0,
        currency: price.currency,
        interval: price.recurring?.interval as 'month' | 'year',
        features: [],
        stripePriceId: price.id,
      },
    };
  }

  /**
   * Reactivate a cancelled subscription
   */
  async reactivateSubscription(subscriptionId: string): Promise<Subscription> {
    const subscription = await this.stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });

    const price = subscription.items.data[0].price;

    return {
      id: subscription.id,
      status: subscription.status,
      current_period_start: subscription.current_period_start,
      current_period_end: subscription.current_period_end,
      cancel_at_period_end: subscription.cancel_at_period_end,
      customer_id: subscription.customer as string,
      plan: {
        id: price.id,
        name: price.nickname || 'Sakina Pro',
        description: 'Premium features for enhanced mental wellness',
        price: price.unit_amount || 0,
        currency: price.currency,
        interval: price.recurring?.interval as 'month' | 'year',
        features: [],
        stripePriceId: price.id,
      },
    };
  }

  /**
   * Create a customer portal session for managing billing
   */
  async createPortalSession(
    customerId: string,
    returnUrl: string
  ): Promise<{ url: string }> {
    const session = await this.stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return {
      url: session.url,
    };
  }

  /**
   * Handle webhook events
   */
  async handleWebhook(
    payload: string,
    signature: string,
    webhookSecret: string
  ): Promise<{
    type: string;
    data: any;
  }> {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret
    );

    return {
      type: event.type,
      data: event.data,
    };
  }

  /**
   * Get all available prices/plans
   */
  async getAvailablePlans(): Promise<SubscriptionPlan[]> {
    const prices = await this.stripe.prices.list({
      active: true,
      type: 'recurring',
      expand: ['data.product'],
    });

    return prices.data
      .filter(price => price.product && typeof price.product === 'object')
      .map(price => {
        const product = price.product as Stripe.Product;
        return {
          id: price.id,
          name: product.name,
          description: product.description || '',
          price: price.unit_amount || 0,
          currency: price.currency,
          interval: price.recurring?.interval as 'month' | 'year',
          features: product.metadata.features ? JSON.parse(product.metadata.features) : [],
          stripePriceId: price.id,
          popular: product.metadata.popular === 'true',
        };
      });
  }

  /**
   * Create a setup intent for saving payment methods
   */
  async createSetupIntent(customerId: string): Promise<{
    client_secret: string;
    id: string;
  }> {
    const setupIntent = await this.stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
    });

    return {
      client_secret: setupIntent.client_secret!,
      id: setupIntent.id,
    };
  }

  /**
   * Get customer's payment methods
   */
  async getCustomerPaymentMethods(customerId: string): Promise<Array<{
    id: string;
    type: string;
    card?: {
      brand: string;
      last4: string;
      exp_month: number;
      exp_year: number;
    };
  }>> {
    const paymentMethods = await this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data.map(pm => ({
      id: pm.id,
      type: pm.type,
      card: pm.card ? {
        brand: pm.card.brand,
        last4: pm.card.last4,
        exp_month: pm.card.exp_month,
        exp_year: pm.card.exp_year,
      } : undefined,
    }));
  }
}

// Predefined subscription plans for Sakina
export const SAKINA_PLANS: SubscriptionPlan[] = [
  {
    id: 'sakina-pro-monthly',
    name: 'Sakina Pro Monthly',
    description: 'Full access to premium features',
    price: 999, // $9.99
    currency: 'usd',
    interval: 'month',
    stripePriceId: 'price_sakina_pro_monthly', // Replace with actual Stripe price ID
    features: [
      'Unlimited audio downloads',
      'Advanced CBT worksheets',
      'Personalized insights',
      'Priority crisis support',
      'Extended ruqyah library',
      'Custom dhikr reminders',
      'Export journal data',
      'Ad-free experience',
    ],
  },
  {
    id: 'sakina-pro-yearly',
    name: 'Sakina Pro Yearly',
    description: 'Full access to premium features (2 months free)',
    price: 9999, // $99.99 (saves $19.89)
    currency: 'usd',
    interval: 'year',
    stripePriceId: 'price_sakina_pro_yearly', // Replace with actual Stripe price ID
    popular: true,
    features: [
      'Unlimited audio downloads',
      'Advanced CBT worksheets',
      'Personalized insights',
      'Priority crisis support',
      'Extended ruqyah library',
      'Custom dhikr reminders',
      'Export journal data',
      'Ad-free experience',
      '2 months free (17% savings)',
    ],
  },
];

// Helper function to create Stripe service instance
export const createStripeService = (secretKey: string) => new StripeService(secretKey);

// Helper functions for common operations
export const getSubscriptionPlans = () => SAKINA_PLANS;

export const formatPrice = (amount: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100);
};
