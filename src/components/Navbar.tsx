import { Link } from "react-router";
export default function Navbar() {
  return (
    <nav className="bg-zinc-800 text-white px-6 py-4" >
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
        <div className="flex gap-4 justify-end">
          <Link to="/login" className="px-4 py-1 hover:text-zinc-300 transition-colors">
            Login
          </Link>
          <Link to="/signup" className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}