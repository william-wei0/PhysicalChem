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
  const header = document.getElementById("site-header") ?? document.querySelector("header");
  if (!(header instanceof HTMLElement)) return;

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      setHeaderVisible(entry.isIntersecting);
    },
    { threshold: 0 }
  );

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
    <div className="bg-zinc-50 flex-1 border border-black relative">
      <div
        className="fixed p-4 transition-[top] duration-500 ease-in-out"
        style={{ top: headerVisible ? headerHeight : 0 }}
      >
        <MinimizeSidebarButton onClick={onToggle} className="absolute right-2 top-2 z-10" />

        <header className="text-center font-bold text-xl p-2 mb-5">Lesson Overview</header>

        <div className="bg-zinc-200 rounded-2xl border border-black py-5">
          <SidebarSections />
        </div>
      </div>
    </div>
  );
}