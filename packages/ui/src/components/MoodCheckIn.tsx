import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

interface MoodCheckInProps {
  onSubmit: (mood: MoodData) => void;
  onCancel?: () => void;
}

interface MoodData {
  valence: number; // 1-5 (very negative to very positive)
  arousal: number; // 1-5 (very calm to very energetic)
  tags: string[];
  notes: string;
  timestamp: Date;
}

const moodTags = [
  'Anxious', 'Calm', 'Stressed', 'Peaceful', 'Worried', 'Grateful',
  'Overwhelmed', 'Hopeful', 'Sad', 'Content', 'Angry', 'Joyful',
  'Tired', 'Energetic', 'Confused', 'Clear', 'Lonely', 'Connected'
];

const valenceLabels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
const arousalLabels = ['Very Calm', 'Calm', 'Neutral', 'Energetic', 'Very Energetic'];

export const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onSubmit, onCancel }) => {
  const [valence, setValence] = useState(3);
  const [arousal, setArousal] = useState(3);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    const moodData: MoodData = {
      valence,
      arousal,
      tags: selectedTags,
      notes,
      timestamp: new Date(),
    };
    onSubmit(moodData);
  };

  const renderMoodScale = (
    value: number,
    setValue: (value: number) => void,
    labels: string[],
    title: string
  ) => (
    <View style={styles.scaleContainer}>
      <Text style={styles.scaleTitle}>{title}</Text>
      <View style={styles.scaleRow}>
        {[1, 2, 3, 4, 5].map(num => (
          <Pressable
            key={num}
            style={[
              styles.scaleButton,
              value === num && styles.scaleButtonActive
            ]}
            onPress={() => setValue(num)}
          >
            <Text style={[
              styles.scaleButtonText,
              value === num && styles.scaleButtonTextActive
            ]}>
              {num}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.scaleLabel}>{labels[value - 1]}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Take a moment to check in with yourself</Text>
      </View>

      {renderMoodScale(valence, setValence, valenceLabels, 'How positive do you feel?')}
      {renderMoodScale(arousal, setArousal, arousalLabels, 'How energetic do you feel?')}

      <View style={styles.tagsContainer}>
        <Text style={styles.sectionTitle}>What describes your mood?</Text>
        <View style={styles.tagsGrid}>
          {moodTags.map(tag => (
            <Pressable
              key={tag}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagActive
              ]}
              onPress={() => handleTagToggle(tag)}
            >
              <Text style={[
                styles.tagText,
                selectedTags.includes(tag) && styles.tagTextActive
              ]}>
                {tag}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.notesContainer}>
        <Text style={styles.sectionTitle}>Additional notes (optional)</Text>
        <TextInput
          style={styles.notesInput}
          multiline
          numberOfLines={4}
          placeholder="What's on your mind? How was your day?"
          placeholderTextColor={colors.textMuted}
          value={notes}
          onChangeText={setNotes}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Check-in</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scaleContainer: {
    marginBottom: spacing.xl,
  },
  scaleTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  scaleButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 2,
    borderColor: colors.neutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scaleButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  scaleButtonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
  },
  scaleButtonTextActive: {
    color: colors.textInverse,
  },
  scaleLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  tagsContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.md,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  tag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.neutral,
  },
  tagActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagText: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '500',
  },
  tagTextActive: {
    color: colors.textInverse,
  },
  notesContainer: {
    marginBottom: spacing.xl,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.neutral,
    borderRadius: 12,
    padding: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.backgroundSecondary,
    minHeight: 100,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.neutral,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  submitButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textInverse,
  },
});
