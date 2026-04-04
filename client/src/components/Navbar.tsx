import { Link } from "react-router";
import { useAuth } from "@/context/auth/useAuth";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <nav className="bg-zinc-800 text-white px-6 py-4">
        <div className="grid grid-cols-3 items-center">
          {/* Left */}
          <div className="flex gap-6">
            <Link to="/" className="hover:text-zinc-300 transition-colors">
              Home
            </Link>
            <Link to="/lessons" className="hover:text-zinc-300 transition-colors">
              Lessons
            </Link>
          </div>

          {/* Center */}
          <h1 className="text-xl font-bold text-center">Physical Chemistry I: CM-UY 3113 </h1>

          {/* Right */}
          <div className="flex gap-4 justify-end items-center">
            {isAuthenticated ? (
              <>
                <span className=" text-zinc-400">
                  Welcome back,{" "}
                  <Link to="/dashboard" className="font-semibold text-white bg-blue-400/10 px-2 py-0.5 rounded-md border border-blue-400/20 ml-2">
                    {user?.username}
                  </Link>
                </span>
                <div className="">|</div>
                <button onClick={handleLogout} className="px-4 py-1 hover:text-zinc-300 transition-colors">
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
