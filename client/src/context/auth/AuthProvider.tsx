import { useState, useEffect } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // prevents flash of wrong UI

  // check if user is already logged in on mount
  useEffect(() => {
    const checkIfAlreadyLoggedIn = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include", // sends cookie automatically
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkIfAlreadyLoggedIn();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // receives httpOnly cookies from server
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error); // bubble up to the login page to display
    }

    setUser(data.user);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include", // sends cookie so server can clear it
      });
    } finally {
      setUser(null); // always clear local state even if request fails
    }
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>{children}</AuthContext.Provider>
  );
};
