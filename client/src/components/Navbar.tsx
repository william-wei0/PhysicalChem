import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/context/auth/useAuth";
import { Notification } from "./Notification";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showLogoutNotif, setShowLogoutNotif] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowLogoutNotif(true);
  };

  return (
    <>
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

      <nav className="bg-zinc-800 text-white px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left */}
          <div className="flex gap-6">
            <Link to="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <Link to="/lessons/chapter1/unit1" className="hover:text-zinc-300 transition-colors">
              Lessons
            </Link>
          </div>

          {/* Center */}
          <h1 className="text-xl font-bold text-center">CM-UY 3113: Physical Chemistry</h1>

          {/* Right */}
          <div className="flex gap-4 justify-end items-center">
            {isAuthenticated ? (
              <>
                <span className="text-zinc-300 text-sm">{user?.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1 hover:text-zinc-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-1 hover:text-zinc-300 transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}