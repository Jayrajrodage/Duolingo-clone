import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { neobrutalism } from "@clerk/themes";
import { ClerkProvider } from "@clerk/clerk-react";
// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: neobrutalism,
        variables: { colorPrimary: "green" },
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
