import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { TamaguiProvider } from '@tamagui/core';
import { I18nProvider } from '@lingui/react';
import { i18n } from '@sakina/i18n';
import { useAuthStore, useSettingsStore } from '../src/store';
import { supabase } from '../src/utils/supabase';
import tamaguiConfig from '../tamagui.config';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setUser, setSession, setLoading } = useAuthStore();
  const { locale, theme } = useSettingsStore();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    // Initialize auth state
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Set locale for i18n
    i18n.activate(locale);
  }, [locale]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
      <I18nProvider i18n={i18n}>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: 'transparent' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="panic" options={{ 
            headerShown: false,
            presentation: 'fullScreenModal',
            gestureEnabled: false,
          }} />
          <Stack.Screen name="crisis" options={{ 
            headerShown: true,
            title: 'Crisis Resources',
            presentation: 'modal',
          }} />
        </Stack>
      </I18nProvider>
    </TamaguiProvider>
  );
}
