import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import type { JSX } from "react";

export default function PageLayout(): JSX.Element {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div
      className="min-h-screen grid grid-rows-[auto_minmax(0,1fr)_auto]
                [grid-template-areas:'header_header''sidebar_main''footer_footer']
                transition-[grid-template-columns] duration-300 ease-in-out"
      style={{
        gridTemplateColumns: isSidebarOpen ? "430px 1fr" : "52px 1fr",
      }}
    >
      <header className="[grid-area:header]" id="siteHeader">
        <Navbar />
      </header>
      <aside className="[grid-area:sidebar] min-h-0 flex flex-col">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      </aside>
      <main className="[grid-area:main] min-h-0 flex flex-col overflow-auto border-t">
        <Outlet />
      </main>
      <Footer className="[grid-area:footer]" />
    </div>
  );
}
