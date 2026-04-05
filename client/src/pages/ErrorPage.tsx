import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div
        className="flex flex-col items-center justify-center text-center px-4"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        <p className="text-[120px] font-medium leading-none mb-4 text-outline-variant">404</p>
        <h1 className="text-2xl font-medium text-on-surface mb-2">Page not found</h1>
        <p className="text-on-surface-variant text-base max-w-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 text-sm font-medium rounded-lg border
            bg-on-surface text-surface border-on-surface hover:border-black
            hover:bg-zinc-200 active:scale-[0.97] transition-all duration-150"
          >
            Go home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 text-sm font-medium rounded-lg border
            bg-transparent text-on-surface-variant border-outline-variant
            hover:bg-zinc-200 hover:text-on-surface hover:border-outline hover:border-black
            active:scale-[0.97] transition-all duration-150"
          >
            Go back
          </button>
        </div>
      </div>
    </>
  );
}
