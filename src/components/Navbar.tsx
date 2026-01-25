import { Link } from "react-router"
export default function Navbar() {
  return (
    <>
      <nav className={"mx-auto py-3.5 px-4.5 flex items-center justify-between gap-4"}>
        <Link to="/" className={"font-bold text-lg no-underline text-gray-900"}>
          {/* Replace text with an <img /> if you have a logo image */}
          Learn Physical Chemistry
        </Link>

        <div className={"flex gap-4.5 items-center"}>
          <Link to="/" className={"no-underline text-gray-700 font-medium"}>Home</Link>
          <Link to="/lessons/lesson1" className={"no-underline text-gray-700 font-medium"}>Lesson1</Link>
          <Link to="/lessons/lesson2" className={"no-underline text-gray-700 font-medium"}>Lesson2</Link>
        </div>

        <Link to="/" className="no-underline text-gray-900 flex items-center gap-2">
          <span className="text-xl leading-none" aria-hidden="true">👤</span>
          <span className="absolute left-[-9999px]">Account</span>
        </Link>
      </nav>
    </>
  );
}
