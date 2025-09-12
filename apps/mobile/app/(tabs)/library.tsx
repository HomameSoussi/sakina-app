import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize } from '@sakina/ui';
import { Trans, t } from '@lingui/macro';

interface AudioTrack {
  id: string;
  title: string;
  description: string;
  kind: 'quran' | 'ruqyah' | 'story' | 'nature' | 'dhikr';
  duration: number; // in seconds
  reciter?: string;
  isPremium: boolean;
  isDownloaded: boolean;
  isPlaying: boolean;
  fileSize?: string;
}

const mockTracks: AudioTrack[] = [
  {
    id: '1',
    title: 'Surah Al-Fatiha',
    description: 'Beautiful, slow recitation for meditation and calm',
    kind: 'quran',
    duration: 120,
    reciter: 'Sheikh Mishary Rashid',
    isPremium: false,
    isDownloaded: true,
    isPlaying: false,
    fileSize: '2.1 MB',
  },
  {
    id: '2',
    title: 'Ayat al-Kursi',
    description: 'Recitation of the Throne Verse for protection and peace',
    kind: 'quran',
    duration: 180,
    reciter: 'Sheikh Abdul Rahman Al-Sudais',
    isPremium: false,
    isDownloaded: false,
    isPlaying: false,
    fileSize: '3.2 MB',
  },
  {
    id: '3',
    title: 'Ruqyah for Anxiety Relief',
    description: 'Islamic spiritual healing recitation for anxiety and worry',
    kind: 'ruqyah',
    duration: 900,
    reciter: 'Sheikh Saad Al-Ghamdi',
    isPremium: true,
    isDownloaded: false,
    isPlaying: false,
    fileSize: '15.8 MB',
  },
  {
    id: '4',
    title: 'The Peaceful Garden',
    description: 'A calming sleep story about walking through a beautiful Islamic garden',
    kind: 'story',
    duration: 1200,
    isPremium: true,
    isDownloaded: false,
    isPlaying: false,
    fileSize: '21.4 MB',
  },
  {
    id: '5',
    title: 'Gentle Rain Sounds',
    description: 'Natural rain sounds for relaxation and sleep',
    kind: 'nature',
    duration: 3600,
    isPremium: false,
    isDownloaded: true,
    isPlaying: false,
    fileSize: '45.2 MB',
  },
  {
    id: '6',
    title: 'Guided Dhikr Meditation',
    description: 'Gentle guidance through remembrance of Allah with breathing',
    kind: 'dhikr',
    duration: 600,
    isPremium: true,
    isDownloaded: false,
    isPlaying: false,
    fileSize: '10.7 MB',
  },
];

const categories = ['All', 'Quran', 'Ruqyah', 'Stories', 'Nature', 'Dhikr'];

export default function LibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showDownloadsOnly, setShowDownloadsOnly] = useState(false);

  const filteredTracks = mockTracks.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           track.kind === selectedCategory.toLowerCase() ||
                           (selectedCategory === 'Quran' && track.kind === 'quran') ||
                           (selectedCategory === 'Stories' && track.kind === 'story');
    const matchesDownload = !showDownloadsOnly || track.isDownloaded;
    return matchesSearch && matchesCategory && matchesDownload;
  });

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getKindIcon = (kind: string) => {
    switch (kind) {
      case 'quran': return 'book-outline';
      case 'ruqyah': return 'shield-outline';
      case 'story': return 'library-outline';
      case 'nature': return 'leaf-outline';
      case 'dhikr': return 'heart-outline';
      default: return 'musical-notes-outline';
    }
  };

  const getKindColor = (kind: string) => {
    switch (kind) {
      case 'quran': return colors.primary;
      case 'ruqyah': return colors.secondary;
      case 'story': return colors.prayer;
      case 'nature': return colors.success;
      case 'dhikr': return colors.warning;
      default: return colors.neutral;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search audio library..."
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
        
        <Pressable
          style={[styles.filterButton, showDownloadsOnly && styles.filterButtonActive]}
          onPress={() => setShowDownloadsOnly(!showDownloadsOnly)}
        >
          <Ionicons 
            name={showDownloadsOnly ? "cloud-done" : "cloud-download-outline"} 
            size={20} 
            color={showDownloadsOnly ? colors.textInverse : colors.primary} 
          />
          <Text style={[
            styles.filterText,
            showDownloadsOnly && styles.filterTextActive
          ]}>
            Downloaded
          </Text>
        </Pressable>
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

      {/* Download Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Ionicons name="cloud-done" size={24} color={colors.success} />
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Downloaded</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="time-outline" size={24} color={colors.primary} />
            <Text style={styles.statNumber}>1h 2m</Text>
            <Text style={styles.statLabel}>Offline Content</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="save-outline" size={24} color={colors.warning} />
            <Text style={styles.statNumber}>47 MB</Text>
            <Text style={styles.statLabel}>Storage Used</Text>
          </View>
        </View>
      </View>

      {/* Audio Tracks */}
      <View style={styles.tracksSection}>
        <Text style={styles.sectionTitle}>
          {showDownloadsOnly ? 'Downloaded Tracks' : 'Audio Library'}
        </Text>
        
        {filteredTracks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons 
              name={showDownloadsOnly ? "cloud-download-outline" : "search-outline"} 
              size={64} 
              color={colors.textMuted} 
            />
            <Text style={styles.emptyTitle}>
              {showDownloadsOnly ? 'No downloaded tracks' : 'No tracks found'}
            </Text>
            <Text style={styles.emptyDescription}>
              {showDownloadsOnly 
                ? 'Download tracks to listen offline' 
                : 'Try adjusting your search or category filter'
              }
            </Text>
          </View>
        ) : (
          <View style={styles.tracksList}>
            {filteredTracks.map((track) => (
              <View key={track.id} style={styles.trackCard}>
                <View style={styles.trackHeader}>
                  <View style={[styles.trackIcon, { backgroundColor: getKindColor(track.kind) + '20' }]}>
                    <Ionicons 
                      name={getKindIcon(track.kind) as any} 
                      size={24} 
                      color={getKindColor(track.kind)} 
                    />
                  </View>
                  
                  <View style={styles.trackInfo}>
                    <View style={styles.trackTitleRow}>
                      <Text style={styles.trackTitle}>{track.title}</Text>
                      {track.isPremium && (
                        <Ionicons name="star" size={16} color={colors.warning} />
                      )}
                    </View>
                    
                    {track.reciter && (
                      <Text style={styles.trackReciter}>by {track.reciter}</Text>
                    )}
                    
                    <Text style={styles.trackDescription} numberOfLines={2}>
                      {track.description}
                    </Text>
                    
                    <View style={styles.trackMeta}>
                      <Text style={styles.trackDuration}>
                        {formatDuration(track.duration)}
                      </Text>
                      {track.fileSize && (
                        <>
                          <Text style={styles.metaSeparator}>•</Text>
                          <Text style={styles.trackSize}>{track.fileSize}</Text>
                        </>
                      )}
                      <Text style={styles.metaSeparator}>•</Text>
                      <Text style={styles.trackKind}>
                        {track.kind.charAt(0).toUpperCase() + track.kind.slice(1)}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.trackActions}>
                  <Pressable style={styles.playButton}>
                    <Ionicons 
                      name={track.isPlaying ? "pause" : "play"} 
                      size={20} 
                      color={colors.textInverse} 
                    />
                  </Pressable>
                  
                  <Pressable style={styles.downloadButton}>
                    <Ionicons 
                      name={track.isDownloaded ? "cloud-done" : "cloud-download-outline"} 
                      size={20} 
                      color={track.isDownloaded ? colors.success : colors.primary} 
                    />
                  </Pressable>
                  
                  <Pressable style={styles.moreButton}>
                    <Ionicons name="ellipsis-horizontal" size={20} color={colors.textMuted} />
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Download Manager */}
      <View style={styles.downloadSection}>
        <Text style={styles.sectionTitle}>Download Manager</Text>
        <Pressable style={styles.downloadAllCard}>
          <View style={styles.downloadAllInfo}>
            <Ionicons name="cloud-download" size={24} color={colors.primary} />
            <View style={styles.downloadAllText}>
              <Text style={styles.downloadAllTitle}>Download All Free Content</Text>
              <Text style={styles.downloadAllDescription}>
                Get 3 tracks for offline listening (50.5 MB)
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        </Pressable>
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
    flexDirection: 'row',
    padding: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  searchBar: {
    flex: 1,
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: spacing.xs,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.sm,
    fontWeight: '500',
    color: colors.primary,
  },
  filterTextActive: {
    color: colors.textInverse,
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
  statsSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  statsCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.lg,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.xs,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  tracksSection: {
    padding: spacing.lg,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
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
  tracksList: {
    gap: spacing.md,
  },
  trackCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
  },
  trackHeader: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  trackIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 2,
  },
  trackTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  trackReciter: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  trackDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: fontSize.sm * 1.3,
    marginBottom: spacing.xs,
  },
  trackMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  trackDuration: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    fontWeight: '500',
  },
  trackSize: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  trackKind: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: 'capitalize',
  },
  metaSeparator: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
  },
  trackActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadSection: {
    padding: spacing.lg,
    paddingTop: 0,
    paddingBottom: spacing.xl,
  },
  downloadAllCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.backgroundSecondary,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  downloadAllInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  downloadAllText: {
    marginLeft: spacing.md,
    flex: 1,
  },
  downloadAllTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  downloadAllDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
