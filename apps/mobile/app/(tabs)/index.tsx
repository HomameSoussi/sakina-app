import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { PanicButton } from '@sakina/ui';
import { colors, spacing, fontSize } from '@sakina/ui';
import { usePanicStore, useSettingsStore } from '../../src/store';
import { Trans, t } from '@lingui/macro';

export default function HomeScreen() {
  const { startSession } = usePanicStore();
  const { islamicContentEnabled } = useSettingsStore();

  const handlePanicPress = () => {
    startSession();
    router.push('/panic');
  };

  const handleCrisisPress = () => {
    Alert.alert(
      t`crisis.title`,
      t`crisis.subtitle`,
      [
        { text: t`action.cancel`, style: 'cancel' },
        { text: t`crisis.call`, onPress: () => router.push('/crisis') },
      ]
    );
  };

  const quickActions = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      subtitle: '4-7-8 or Box Breathing',
      icon: 'leaf-outline',
      color: colors.primary,
      onPress: () => router.push('/breathing'),
    },
    {
      id: 'grounding',
      title: '5-4-3-2-1 Grounding',
      subtitle: 'Use your senses to stay present',
      icon: 'hand-left-outline',
      color: colors.secondary,
      onPress: () => router.push('/grounding'),
    },
    {
      id: 'journal',
      title: 'Mood Check-in',
      subtitle: 'Track how you\'re feeling',
      icon: 'heart-outline',
      color: colors.prayer,
      onPress: () => router.push('/journal'),
    },
    {
      id: 'dhikr',
      title: 'Dhikr & Remembrance',
      subtitle: 'Find peace through remembrance',
      icon: 'moon-outline',
      color: colors.accent,
      onPress: () => router.push('/dhikr'),
      showIf: islamicContentEnabled,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          <Trans>app.tagline</Trans>
        </Text>
        <Pressable style={styles.crisisButton} onPress={handleCrisisPress}>
          <Ionicons name="medical" size={20} color={colors.error} />
          <Text style={styles.crisisText}>
            <Trans>nav.crisis</Trans>
          </Text>
        </Pressable>
      </View>

      {/* Panic Button */}
      <View style={styles.panicSection}>
        <PanicButton onPress={handlePanicPress} size="large" />
        <Text style={styles.panicDescription}>
          <Trans>panic.button.accessibility</Trans>
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Relief</Text>
        <View style={styles.actionsGrid}>
          {quickActions
            .filter(action => action.showIf !== false)
            .map((action) => (
              <Pressable
                key={action.id}
                style={[styles.actionCard, { borderLeftColor: action.color }]}
                onPress={action.onPress}
              >
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon as any} size={24} color={action.color} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </Pressable>
            ))}
        </View>
      </View>

      {/* Prayer Times (if enabled) */}
      {islamicContentEnabled && (
        <View style={styles.prayerSection}>
          <Text style={styles.sectionTitle}>Prayer Times</Text>
          <View style={styles.prayerCard}>
            <Text style={styles.prayerText}>Next: Dhuhr in 2h 15m</Text>
            <Pressable style={styles.prayerButton}>
              <Text style={styles.prayerButtonText}>View All</Text>
            </Pressable>
          </View>
        </View>
      )}

      {/* Daily Verse (if enabled) */}
      {islamicContentEnabled && (
        <View style={styles.verseSection}>
          <Text style={styles.sectionTitle}>Verse of the Day</Text>
          <View style={styles.verseCard}>
            <Text style={styles.verseArabic}>
              وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ
            </Text>
            <Text style={styles.verseTranslation}>
              "And whoever relies upon Allah - then He is sufficient for him."
            </Text>
            <Text style={styles.verseReference}>Quran 65:3</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingTop: spacing.md,
  },
  greeting: {
    fontSize: fontSize.lg,
    color: colors.text,
    fontWeight: '500',
    flex: 1,
  },
  crisisButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.error,
  },
  crisisText: {
    color: colors.error,
    fontWeight: '600',
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
  },
  panicSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  panicDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
    maxWidth: 280,
  },
  quickActions: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  actionsGrid: {
    gap: spacing.md,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  prayerSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  prayerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.prayer,
    padding: spacing.md,
    borderRadius: 12,
  },
  prayerText: {
    fontSize: fontSize.md,
    color: colors.textInverse,
    fontWeight: '500',
  },
  prayerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
  },
  prayerButtonText: {
    color: colors.textInverse,
    fontWeight: '600',
    fontSize: fontSize.sm,
  },
  verseSection: {
    padding: spacing.lg,
    paddingTop: 0,
    paddingBottom: spacing.xl,
  },
  verseCard: {
    backgroundColor: colors.accent,
    padding: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
  },
  verseArabic: {
    fontSize: fontSize.xl,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: fontSize.xl * 1.5,
  },
  verseTranslation: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  verseReference: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
