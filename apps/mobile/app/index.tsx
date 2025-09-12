import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, Text } from 'react-native';
import { useAuthStore, useSettingsStore } from '../src/store';

export default function IndexScreen() {
  const { user, isLoading } = useAuthStore();
  const { onboardingCompleted } = useSettingsStore();

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Redirect based on auth and onboarding status
  if (!user) {
    return <Redirect href="/auth" />;
  }

  if (!onboardingCompleted) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
