import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'IonicClipboardManager',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      androidSplashResourceName: 'splash'
    },
  },
};

export default config;
