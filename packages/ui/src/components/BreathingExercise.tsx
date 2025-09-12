import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Pressable } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

interface BreathingExerciseProps {
  type: 'box' | '4-7-8';
  withDhikr?: boolean;
  dhikrText?: string;
  onComplete?: () => void;
  duration?: number; // in minutes
}

const breathingPatterns = {
  box: {
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
  },
  '4-7-8': {
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
  },
};

const dhikrOptions = [
  'سُبْحَانَ اللَّهِ', // Subhan Allah
  'الْحَمْدُ لِلَّهِ', // Alhamdulillah
  'اللَّهُ أَكْبَرُ', // Allahu Akbar
  'يَا سَلَامُ', // Ya Salam
];

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({
  type,
  withDhikr = false,
  dhikrText,
  onComplete,
  duration = 5,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [currentDhikr, setCurrentDhikr] = useState(dhikrText || dhikrOptions[0]);
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  
  const pattern = breathingPatterns[type];
  const totalCycleTime = (pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2) * 1000;

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsActive(false);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, onComplete]);

  useEffect(() => {
    if (!isActive) return;

    const runBreathingCycle = () => {
      // Inhale phase
      setCurrentPhase('inhale');
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: pattern.inhale * 1000,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        // Hold phase 1
        setCurrentPhase('hold1');
        setTimeout(() => {
          // Exhale phase
          setCurrentPhase('exhale');
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: pattern.exhale * 1000,
            useNativeDriver: true,
          }).start();

          setTimeout(() => {
            // Hold phase 2
            if (pattern.hold2 > 0) {
              setCurrentPhase('hold2');
              setTimeout(() => {
                setCycleCount(prev => prev + 1);
                if (withDhikr) {
                  setCurrentDhikr(dhikrOptions[Math.floor(Math.random() * dhikrOptions.length)]);
                }
              }, pattern.hold2 * 1000);
            } else {
              setCycleCount(prev => prev + 1);
              if (withDhikr) {
                setCurrentDhikr(dhikrOptions[Math.floor(Math.random() * dhikrOptions.length)]);
              }
            }
          }, pattern.exhale * 1000);
        }, pattern.hold1 * 1000);
      }, pattern.inhale * 1000);
    };

    const interval = setInterval(runBreathingCycle, totalCycleTime);
    runBreathingCycle(); // Start immediately

    return () => clearInterval(interval);
  }, [isActive, pattern, totalCycleTime, withDhikr]);

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale':
        return 'Breathe In';
      case 'hold1':
        return 'Hold';
      case 'exhale':
        return 'Breathe Out';
      case 'hold2':
        return 'Hold';
      default:
        return 'Ready';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {type === 'box' ? 'Box Breathing' : '4-7-8 Breathing'}
        </Text>
        <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>
      </View>

      <View style={styles.breathingArea}>
        <Animated.View
          style={[
            styles.breathingCircle,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <Text style={styles.phaseText}>{getPhaseText()}</Text>
          <Text style={styles.cycleCount}>Cycle {cycleCount}</Text>
        </Animated.View>

        {withDhikr && (
          <View style={styles.dhikrContainer}>
            <Text style={styles.dhikrText}>{currentDhikr}</Text>
            <Text style={styles.dhikrSubtext}>Repeat with your breath</Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <Pressable
          style={[styles.button, isActive ? styles.stopButton : styles.startButton]}
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={styles.buttonText}>
            {isActive ? 'Pause' : 'Start'}
          </Text>
        </Pressable>
      </View>
    </View>
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
  },
  timer: {
    fontSize: fontSize.lg,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  breathingArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  phaseText: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.textInverse,
    marginBottom: spacing.sm,
  },
  cycleCount: {
    fontSize: fontSize.md,
    color: colors.textInverse,
    opacity: 0.8,
  },
  dhikrContainer: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.accent,
    borderRadius: 16,
    marginTop: spacing.lg,
  },
  dhikrText: {
    fontSize: fontSize.xl,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  dhikrSubtext: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  controls: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  button: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: colors.primary,
  },
  stopButton: {
    backgroundColor: colors.error,
  },
  buttonText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textInverse,
  },
});
