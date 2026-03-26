import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Notification } from "@/components/Notification";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLogoutNotif, setShowLogoutNotif] = useState(false);

  useEffect(() => {
    const checkIfAlreadyLoggedIn = async () => {
      try {
        let res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.status === 401) {
          const refreshRes = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (!refreshRes.ok) {
            setIsLoading(false);
            return;
          }

          res = await fetch("/api/auth/me", { credentials: "include" });
        }

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
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    setUser(data.user);
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setShowLogoutNotif(true);
    } finally {
      setUser(null);
    }
  };

  if (isLoading) return null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {showLogoutNotif && (
        <Notification
          message="Logged out"
          description="You have been successfully logged out."
          type="success"
          timeout={4000}
          theme="light"
          onClose={() => setShowLogoutNotif(false)}
        />
      )}
      {children}
    </AuthContext.Provider>
  );
};
