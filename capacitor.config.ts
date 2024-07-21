import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.lingo",
  appName: "Lingo",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
