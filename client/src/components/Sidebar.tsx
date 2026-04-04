import { useEffect, useState } from "react";
import MinimizeSidebarButton from "./buttons/MinimizeSidebarButton";
import ExpandSidebarButton from "./buttons/ExpandSidebarButton";
import SidebarSections from "./SidebarSections";

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById("siteHeader");
    if (!(header instanceof HTMLElement)) return;

    const intersectionObserver = new IntersectionObserver(([entry]) => setHeaderVisible(entry.isIntersecting), {
      threshold: 0,
    });
    const resizeObserver = new ResizeObserver(([entry]) => {
      setHeaderHeight(entry.contentRect.height);
    });

    intersectionObserver.observe(header);
    resizeObserver.observe(header);

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  if (!isOpen) {
    return (
      <div className="bg-zinc-100 h-full flex items-center border border-black">
        <ExpandSidebarButton onClick={onToggle} className="h-full" />
      </div>
    );
  }

  return (
    <div className="bg-zinc-100 flex-1 border-x border-t border-black relative opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards]">
      <div
        className="sticky p-4 transition-[top] duration-500 ease-in-out"
        style={{ top: headerVisible ? headerHeight : 0 }}
      >
        <MinimizeSidebarButton onClick={onToggle} className="absolute right-2 top-2 z-10" />
        <header className="text-2xl p-2 mb-5 relative flex items-center justify-center font-semibold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="absolute left-3 shrink-0"
            style={{ height: "2em", width: "2em" }}
            fill="none"
          >
            <defs>
              <radialGradient id="protonGradient" cx="38%" cy="32%" r="60%">
                <stop offset="0%" stopColor="#fca5a5" />
                <stop offset="40%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </radialGradient>
            </defs>
            <defs>
              <radialGradient id="electronGradient" gradientUnits="userSpaceOnUse" cx="83" cy="43" r="14">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="40%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </radialGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="42" ry="42" stroke="#94a3b8" strokeWidth="2.5" />
            <circle cx="50" cy="50" r="12" fill="url(#protonGradient)" />
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="3s"
                repeatCount="indefinite"
              />
              <circle cx="90" cy="50" r="9" fill="url(#electronGradient)">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 90 50"
                  to="-360 90 50"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </svg>
          Physical Chemistry I
        </header>

        <div className="bg-neutral-200 rounded-2xl border border-black py-5">
          <SidebarSections />
        </div>
      </div>
    </div>
  );
}
