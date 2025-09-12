import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, spacing, fontSize } from '@sakina/ui';
import { useAuthStore, useSettingsStore, useProfileStore } from '../../src/store';
import { supabase } from '../../src/utils/supabase';
import { Trans, t } from '@lingui/macro';

export default function SettingsScreen() {
  const { user, signOut } = useAuthStore();
  const { profile, updateProfile } = useProfileStore();
  const { 
    locale, 
    theme, 
    notificationsEnabled, 
    prayerRemindersEnabled, 
    islamicContentEnabled,
    updateSettings 
  } = useSettingsStore();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            setIsSigningOut(true);
            try {
              await supabase.auth.signOut();
              signOut();
              router.replace('/auth');
            } catch (error) {
              console.error('Error signing out:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            } finally {
              setIsSigningOut(false);
            }
          },
        },
      ]
    );
  };

  const settingSections = [
    {
      title: 'Preferences',
      items: [
        {
          id: 'language',
          title: t`settings.language`,
          subtitle: 'English',
          icon: 'language-outline',
          onPress: () => router.push('/settings/language'),
          showChevron: true,
        },
        {
          id: 'notifications',
          title: t`settings.notifications`,
          subtitle: 'Manage notification preferences',
          icon: 'notifications-outline',
          value: notificationsEnabled,
          onToggle: (value: boolean) => updateSettings({ notificationsEnabled: value }),
          showToggle: true,
        },
        {
          id: 'prayer-times',
          title: t`settings.prayer_times`,
          subtitle: 'Get reminders for prayer times',
          icon: 'time-outline',
          value: prayerRemindersEnabled,
          onToggle: (value: boolean) => {
            updateSettings({ prayerRemindersEnabled: value });
            updateProfile({ prayer_reminders_enabled: value });
          },
          showToggle: true,
        },
        {
          id: 'islamic-content',
          title: t`settings.islamic_content`,
          subtitle: 'Show Islamic verses, duas, and content',
          icon: 'moon-outline',
          value: islamicContentEnabled,
          onToggle: (value: boolean) => {
            updateSettings({ islamicContentEnabled: value });
            updateProfile({ islamic_content_enabled: value });
          },
          showToggle: true,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          title: 'Profile',
          subtitle: user?.email || 'Manage your profile',
          icon: 'person-outline',
          onPress: () => router.push('/settings/profile'),
          showChevron: true,
        },
        {
          id: 'subscription',
          title: 'Subscription',
          subtitle: profile?.subscription_status === 'pro' ? 'Pro Member' : 'Free Plan',
          icon: 'star-outline',
          onPress: () => router.push('/settings/subscription'),
          showChevron: true,
        },
        {
          id: 'privacy',
          title: t`settings.privacy`,
          subtitle: 'Data and privacy settings',
          icon: 'shield-outline',
          onPress: () => router.push('/settings/privacy'),
          showChevron: true,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'crisis-resources',
          title: 'Crisis Resources',
          subtitle: 'Emergency mental health support',
          icon: 'medical-outline',
          onPress: () => router.push('/crisis'),
          showChevron: true,
          urgent: true,
        },
        {
          id: 'help',
          title: 'Help & Support',
          subtitle: 'FAQs and contact support',
          icon: 'help-circle-outline',
          onPress: () => router.push('/settings/help'),
          showChevron: true,
        },
        {
          id: 'about',
          title: t`settings.about`,
          subtitle: 'App version and information',
          icon: 'information-circle-outline',
          onPress: () => router.push('/settings/about'),
          showChevron: true,
        },
      ],
    },
  ];

  const renderSettingItem = (item: any) => {
    return (
      <Pressable
        key={item.id}
        style={[styles.settingItem, item.urgent && styles.urgentItem]}
        onPress={item.onPress}
        disabled={item.showToggle}
      >
        <View style={styles.settingIcon}>
          <Ionicons 
            name={item.icon} 
            size={24} 
            color={item.urgent ? colors.error : colors.primary} 
          />
        </View>
        
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, item.urgent && styles.urgentText]}>
            {item.title}
          </Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
        
        {item.showToggle && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: colors.backgroundTertiary, true: colors.primary }}
            thumbColor={colors.background}
          />
        )}
        
        {item.showChevron && (
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        )}
      </Pressable>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* User Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileInitial}>
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.user_metadata?.full_name || 'User'}
          </Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
          <View style={styles.subscriptionBadge}>
            <Ionicons 
              name={profile?.subscription_status === 'pro' ? 'star' : 'star-outline'} 
              size={16} 
              color={profile?.subscription_status === 'pro' ? colors.warning : colors.textMuted} 
            />
            <Text style={styles.subscriptionText}>
              {profile?.subscription_status === 'pro' ? 'Pro Member' : 'Free Plan'}
            </Text>
          </View>
        </View>
      </View>

      {/* Settings Sections */}
      {settingSections.map((section) => (
        <View key={section.title} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderSettingItem)}
          </View>
        </View>
      ))}

      {/* Sign Out */}
      <View style={styles.section}>
        <Pressable
          style={styles.signOutButton}
          onPress={handleSignOut}
          disabled={isSigningOut}
        >
          <Ionicons name="log-out-outline" size={24} color={colors.error} />
          <Text style={styles.signOutText}>
            {isSigningOut ? 'Signing Out...' : 'Sign Out'}
          </Text>
        </Pressable>
      </View>

      {/* App Version */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Sakina v1.0.0</Text>
        <Text style={styles.copyrightText}>
          Made with ❤️ for mental wellness
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundSecondary,
    marginBottom: spacing.lg,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  profileInitial: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.textInverse,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  profileEmail: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  subscriptionText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontWeight: '500',
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  sectionContent: {
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.backgroundTertiary,
  },
  urgentItem: {
    backgroundColor: colors.error + '10',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  urgentText: {
    color: colors.error,
  },
  settingSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
    gap: spacing.sm,
  },
  signOutText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.error,
  },
  footer: {
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  versionText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  copyrightText: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
