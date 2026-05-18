import { createContext, useContext } from "react";
import { useSession } from "../lib/auth-client.js";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: session, isPending } = useSession();

  const user = session?.user || null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isPending, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
