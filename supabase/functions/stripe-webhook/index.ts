import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.15.0?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
      apiVersion: '2024-12-18.acacia',
    })

    const signature = req.headers.get('stripe-signature')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!signature || !webhookSecret) {
      throw new Error('Missing Stripe signature or webhook secret')
    }

    const body = await req.text()
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`Processing webhook event: ${event.type}`)

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Get customer email to find user
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        if (!customer || customer.deleted) {
          throw new Error('Customer not found')
        }

        // Find user by email
        const { data: user } = await supabaseClient
          .from('profiles')
          .select('id, user_id')
          .eq('email', customer.email)
          .single()

        if (!user) {
          console.error(`User not found for email: ${customer.email}`)
          break
        }

        // Update user subscription status
        const subscriptionStatus = subscription.status === 'active' ? 'pro' : 'free'
        
        await supabaseClient
          .from('profiles')
          .update({
            subscription_status: subscriptionStatus,
            stripe_customer_id: customer.id,
            stripe_subscription_id: subscription.id,
            subscription_current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            subscription_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            subscription_cancel_at_period_end: subscription.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.user_id)

        // Log subscription event
        await supabaseClient
          .from('subscription_events')
          .insert({
            user_id: user.user_id,
            event_type: event.type,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            event_data: event.data.object,
            created_at: new Date().toISOString(),
          })

        console.log(`Updated subscription for user ${user.user_id}: ${subscriptionStatus}`)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Update user to free plan
        await supabaseClient
          .from('profiles')
          .update({
            subscription_status: 'free',
            stripe_subscription_id: null,
            subscription_current_period_start: null,
            subscription_current_period_end: null,
            subscription_cancel_at_period_end: false,
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        // Log cancellation event
        const { data: user } = await supabaseClient
          .from('profiles')
          .select('user_id')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (user) {
          await supabaseClient
            .from('subscription_events')
            .insert({
              user_id: user.user_id,
              event_type: event.type,
              stripe_subscription_id: subscription.id,
              status: 'canceled',
              event_data: event.data.object,
              created_at: new Date().toISOString(),
            })
        }

        console.log(`Canceled subscription: ${subscription.id}`)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          // Log successful payment
          const { data: user } = await supabaseClient
            .from('profiles')
            .select('user_id')
            .eq('stripe_subscription_id', invoice.subscription)
            .single()

          if (user) {
            await supabaseClient
              .from('payment_events')
              .insert({
                user_id: user.user_id,
                stripe_invoice_id: invoice.id,
                stripe_subscription_id: invoice.subscription as string,
                amount: invoice.amount_paid,
                currency: invoice.currency,
                status: 'succeeded',
                event_data: event.data.object,
                created_at: new Date().toISOString(),
              })
          }
        }

        console.log(`Payment succeeded for invoice: ${invoice.id}`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          // Log failed payment
          const { data: user } = await supabaseClient
            .from('profiles')
            .select('user_id')
            .eq('stripe_subscription_id', invoice.subscription)
            .single()

          if (user) {
            await supabaseClient
              .from('payment_events')
              .insert({
                user_id: user.user_id,
                stripe_invoice_id: invoice.id,
                stripe_subscription_id: invoice.subscription as string,
                amount: invoice.amount_due,
                currency: invoice.currency,
                status: 'failed',
                event_data: event.data.object,
                created_at: new Date().toISOString(),
              })

            // Optionally send notification about failed payment
            // You could trigger an email or push notification here
          }
        }

        console.log(`Payment failed for invoice: ${invoice.id}`)
        break
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription' && session.subscription) {
          // The subscription webhook will handle the actual subscription update
          console.log(`Checkout completed for session: ${session.id}`)
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response(
      JSON.stringify({ received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
