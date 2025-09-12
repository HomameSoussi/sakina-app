import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '@sakina/ui';
import { Trans, t } from '@lingui/macro';

interface Lesson {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 1 | 2 | 3;
  readTime: number;
  isPremium: boolean;
  isCompleted: boolean;
  progress: number;
}

const mockLessons: Lesson[] = [
  {
    id: '1',
    title: 'Understanding Anxiety',
    description: 'Learn what anxiety is and how it affects your mind and body',
    category: 'Basics',
    difficulty: 1,
    readTime: 5,
    isPremium: false,
    isCompleted: true,
    progress: 100,
  },
  {
    id: '2',
    title: 'Breathing Techniques for Calm',
    description: 'Master simple breathing exercises to reduce anxiety and find peace',
    category: 'Techniques',
    difficulty: 1,
    readTime: 4,
    isPremium: false,
    isCompleted: false,
    progress: 60,
  },
  {
    id: '3',
    title: '5-4-3-2-1 Grounding Technique',
    description: 'Use your senses to stay present and calm during anxiety',
    category: 'Techniques',
    difficulty: 1,
    readTime: 3,
    isPremium: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '4',
    title: 'Islamic Perspective on Mental Health',
    description: 'Understanding anxiety and mental health through an Islamic lens',
    category: 'Islamic',
    difficulty: 2,
    readTime: 8,
    isPremium: false,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '5',
    title: 'Introduction to CBT',
    description: 'Learn how your thoughts, feelings, and behaviors are connected',
    category: 'CBT',
    difficulty: 2,
    readTime: 7,
    isPremium: true,
    isCompleted: false,
    progress: 0,
  },
  {
    id: '6',
    title: 'Managing Nighttime Anxiety',
    description: 'Techniques for better sleep when anxiety keeps you awake',
    category: 'Techniques',
    difficulty: 2,
    readTime: 6,
    isPremium: true,
    isCompleted: false,
    progress: 0,
  },
];

const categories = ['All', 'Basics', 'Techniques', 'Islamic', 'CBT'];

export default function LessonsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredLessons = mockLessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || lesson.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return colors.success;
      case 2: return colors.warning;
      case 3: return colors.error;
      default: return colors.neutral;
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      default: return 'Unknown';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Basics': return 'book-outline';
      case 'Techniques': return 'fitness-outline';
      case 'Islamic': return 'moon-outline';
      case 'CBT': return 'bulb-outline';
      default: return 'document-outline';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search lessons..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesList}>
            {categories.map((category) => (
              <Pressable
                key={category}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive
                ]}>
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Progress Overview */}
      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Your Progress</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1</Text>
              <Text style={styles.statLabel}>In Progress</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Remaining</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
          <Text style={styles.progressText}>33% Complete</Text>
        </View>
      </View>

      {/* Lessons List */}
      <View style={styles.lessonsSection}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'All Lessons' : `${selectedCategory} Lessons`}
        </Text>
        
        {filteredLessons.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No lessons found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your search or category filter
            </Text>
          </View>
        ) : (
          <View style={styles.lessonsList}>
            {filteredLessons.map((lesson) => (
              <Pressable key={lesson.id} style={styles.lessonCard}>
                <View style={styles.lessonHeader}>
                  <View style={styles.lessonIcon}>
                    <Ionicons 
                      name={getCategoryIcon(lesson.category) as any} 
                      size={24} 
                      color={colors.primary} 
                    />
                  </View>
                  <View style={styles.lessonMeta}>
                    <View style={styles.lessonBadges}>
                      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(lesson.difficulty) }]}>
                        <Text style={styles.difficultyText}>
                          {getDifficultyText(lesson.difficulty)}
                        </Text>
                      </View>
                      <View style={styles.timeBadge}>
                        <Ionicons name="time-outline" size={12} color={colors.textMuted} />
                        <Text style={styles.timeText}>{lesson.readTime} min</Text>
                      </View>
                      {lesson.isPremium && (
                        <View style={styles.premiumBadge}>
                          <Ionicons name="star" size={12} color={colors.warning} />
                          <Text style={styles.premiumText}>Pro</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  {lesson.isCompleted && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.success} />
                  )}
                </View>
                
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                
                {lesson.progress > 0 && !lesson.isCompleted && (
                  <View style={styles.lessonProgress}>
                    <View style={styles.progressBarSmall}>
                      <View style={[styles.progressFillSmall, { width: `${lesson.progress}%` }]} />
                    </View>
                    <Text style={styles.progressPercentage}>{lesson.progress}%</Text>
                  </View>
                )}
                
                <View style={styles.lessonFooter}>
                  <Text style={styles.categoryLabel}>{lesson.category}</Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
  },
  categoriesContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  categoriesList: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: colors.neutral,
  },
  categoryChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.text,
  },
  categoryTextActive: {
    color: colors.textInverse,
  },
  progressSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  progressCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.lg,
    borderRadius: 12,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  lessonsSection: {
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
  },
  lessonsList: {
    gap: spacing.md,
  },
  lessonCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  lessonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  lessonMeta: {
    flex: 1,
  },
  lessonBadges: {
    flexDirection: 'row',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  difficultyBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: fontSize.xs,
    color: colors.textInverse,
    fontWeight: '600',
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  timeText: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  premiumText: {
    fontSize: fontSize.xs,
    color: colors.warning,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  lessonDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: fontSize.sm * 1.4,
    marginBottom: spacing.sm,
  },
  lessonProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  progressBarSmall: {
    flex: 1,
    height: 4,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 2,
  },
  progressFillSmall: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  progressPercentage: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '500',
  },
});
