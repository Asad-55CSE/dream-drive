import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({

  baseURL: typeof window !== "undefined"
    ? window.location.origin
    : (import.meta.env.VITE_CLIENT_URL || "http://localhost:5173"),
  fetchOptions: {
    credentials: "include",
  },
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;