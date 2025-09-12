import React from 'react';
import { Pressable, Text, View, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

interface PanicButtonProps {
  onPress: () => void;
  isActive?: boolean;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const { width: screenWidth } = Dimensions.get('window');

export const PanicButton: React.FC<PanicButtonProps> = ({
  onPress,
  isActive = false,
  size = 'large',
  disabled = false,
}) => {
  const buttonSize = {
    small: 80,
    medium: 120,
    large: Math.min(screenWidth * 0.6, 200),
  }[size];

  const fontSize = {
    small: 14,
    medium: 18,
    large: 24,
  }[size];

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          {
            width: buttonSize,
            height: buttonSize,
            backgroundColor: isActive
              ? colors.calm
              : pressed
              ? colors.panicHover
              : colors.panic,
            opacity: disabled ? 0.6 : 1,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={isActive ? 'Exit calm mode' : 'Start panic relief'}
        accessibilityHint="Tap to begin guided panic relief exercises"
      >
        <Text
          style={[
            styles.buttonText,
            {
              fontSize,
              color: colors.textInverse,
            },
          ]}
        >
          {isActive ? 'سَكِينَة' : 'Sakīna'}
        </Text>
        <Text
          style={[
            styles.buttonSubtext,
            {
              fontSize: fontSize * 0.6,
              color: colors.textInverse,
            },
          ]}
        >
          {isActive ? 'Active' : 'Tap for calm'}
        </Text>
      </Pressable>
      
      {/* Ripple effect for visual feedback */}
      <View style={[styles.ripple, { width: buttonSize * 1.5, height: buttonSize * 1.5 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  button: {
    borderRadius: 9999, // Full circle
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonText: {
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  buttonSubtext: {
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.9,
  },
  ripple: {
    position: 'absolute',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: colors.primary,
    opacity: 0.3,
    zIndex: -1,
  },
});
