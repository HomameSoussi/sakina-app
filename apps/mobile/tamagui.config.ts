import { config } from '@tamagui/config/v3';
import { createTamagui } from '@tamagui/core';
import { tamaguiConfig } from '@sakina/ui';

const appConfig = createTamagui({
  ...tamaguiConfig,
  // Override or extend config for mobile-specific needs
  themes: {
    ...tamaguiConfig.themes,
    // Add mobile-specific theme overrides if needed
  },
});

export type Conf = typeof appConfig;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default appConfig;
