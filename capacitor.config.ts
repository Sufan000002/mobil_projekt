import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'IonicBarcode',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      androidSplashResourceName: 'splash'
    },
  },
};

export default config;
