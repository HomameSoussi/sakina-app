import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MoodCheckIn } from '@sakina/ui';
import { colors, spacing, fontSize } from '@sakina/ui';
import { useJournalStore } from '../../src/store';
import { Trans, t } from '@lingui/macro';

interface MoodData {
  valence: number;
  arousal: number;
  tags: string[];
  notes: string;
  timestamp: Date;
}

export default function JournalScreen() {
  const [showMoodCheckIn, setShowMoodCheckIn] = useState(false);
  const { entries, addEntry } = useJournalStore();

  const handleMoodSubmit = (moodData: MoodData) => {
    addEntry({
      mood_valence: moodData.valence,
      mood_arousal: moodData.arousal,
      tags: moodData.tags,
      body: moodData.notes,
    });
    setShowMoodCheckIn(false);
  };

  const getMoodEmoji = (valence?: number) => {
    if (!valence) return '😐';
    if (valence <= 2) return '😢';
    if (valence === 3) return '😐';
    if (valence === 4) return '😊';
    return '😄';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (showMoodCheckIn) {
    return (
      <MoodCheckIn
        onSubmit={handleMoodSubmit}
        onCancel={() => setShowMoodCheckIn(false)}
      />
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Actions */}
      <View style={styles.header}>
        <Pressable
          style={styles.actionButton}
          onPress={() => setShowMoodCheckIn(true)}
        >
          <Ionicons name="add-circle" size={24} color={colors.primary} />
          <Text style={styles.actionButtonText}>
            <Trans>mood.title</Trans>
          </Text>
        </Pressable>
      </View>

      {/* Mood Trends */}
      {entries.length > 0 && (
        <View style={styles.trendsSection}>
          <Text style={styles.sectionTitle}>Recent Mood</Text>
          <View style={styles.trendsCard}>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>This Week</Text>
              <Text style={styles.trendValue}>😊 Positive</Text>
            </View>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>Energy Level</Text>
              <Text style={styles.trendValue}>⚡ Moderate</Text>
            </View>
            <View style={styles.trendItem}>
              <Text style={styles.trendLabel}>Check-ins</Text>
              <Text style={styles.trendValue}>{entries.length}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Journal Entries */}
      <View style={styles.entriesSection}>
        <Text style={styles.sectionTitle}>Journal Entries</Text>
        
        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="journal-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>Start Your Journey</Text>
            <Text style={styles.emptyDescription}>
              Track your mood and thoughts to better understand your patterns and progress.
            </Text>
            <Pressable
              style={styles.startButton}
              onPress={() => setShowMoodCheckIn(true)}
            >
              <Text style={styles.startButtonText}>
                <Trans>mood.title</Trans>
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.entriesList}>
            {entries.map((entry) => (
              <View key={entry.id} style={styles.entryCard}>
                <View style={styles.entryHeader}>
                  <View style={styles.entryMood}>
                    <Text style={styles.moodEmoji}>
                      {getMoodEmoji(entry.mood_valence)}
                    </Text>
                    <View>
                      <Text style={styles.entryDate}>
                        {formatDate(entry.created_at)}
                      </Text>
                      {entry.mood_valence && (
                        <Text style={styles.moodDetails}>
                          Mood: {entry.mood_valence}/5 • Energy: {entry.mood_arousal}/5
                        </Text>
                      )}
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
                
                {entry.tags.length > 0 && (
                  <View style={styles.tagsContainer}>
                    {entry.tags.slice(0, 3).map((tag, index) => (
                      <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                    {entry.tags.length > 3 && (
                      <Text style={styles.moreTagsText}>+{entry.tags.length - 3} more</Text>
                    )}
                  </View>
                )}
                
                {entry.body && (
                  <Text style={styles.entryPreview} numberOfLines={2}>
                    {entry.body}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* CBT Tools */}
      <View style={styles.toolsSection}>
        <Text style={styles.sectionTitle}>CBT Tools</Text>
        <View style={styles.toolsGrid}>
          <Pressable style={styles.toolCard}>
            <Ionicons name="bulb-outline" size={24} color={colors.secondary} />
            <Text style={styles.toolTitle}>Thought Record</Text>
            <Text style={styles.toolDescription}>Challenge negative thoughts</Text>
          </Pressable>
          
          <Pressable style={styles.toolCard}>
            <Ionicons name="refresh-outline" size={24} color={colors.primary} />
            <Text style={styles.toolTitle}>Reframing</Text>
            <Text style={styles.toolDescription}>Find balanced perspectives</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  actionButtonText: {
    color: colors.primary,
    fontWeight: '600',
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
  },
  trendsSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  trendsCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trendItem: {
    alignItems: 'center',
  },
  trendLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  trendValue: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  entriesSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 12,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: fontSize.md * 1.4,
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  startButtonText: {
    color: colors.textInverse,
    fontWeight: '600',
    fontSize: fontSize.md,
  },
  entriesList: {
    gap: spacing.md,
  },
  entryCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryMood: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  entryDate: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  moodDetails: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: fontSize.xs,
    color: colors.text,
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    alignSelf: 'center',
  },
  entryPreview: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: fontSize.sm * 1.4,
  },
  toolsSection: {
    padding: spacing.lg,
    paddingTop: 0,
    paddingBottom: spacing.xl,
  },
  toolsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  toolCard: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  toolTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  toolDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
