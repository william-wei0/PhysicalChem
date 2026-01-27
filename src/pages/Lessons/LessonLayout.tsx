import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import type { JSX } from "react";

export default function LessonLayout(): JSX.Element {
  return (
    <div
      className="min-h-screen grid grid-cols-[auto_auto] grid-rows-[auto_minmax(0,1fr)_auto]
                [grid-template-areas:'header_header''sidebar_main''footer_footer'] "
    >
      <header className="[grid-area:header]">
        <Navbar />
      </header>
      <aside className="[grid-area:sidebar] min-h-0 flex flex-col overflow-auto">
        <Sidebar/>
      </aside>
      <main className="[grid-area:main] min-h-0 flex flex-col overflow-auto border-t bg-zinc-50">
        <Outlet />
      </main>
      <footer className="[grid-area:footer] bg-zinc-900 text-white p-4 rounded">
        Footer
      </footer>
    </div>
  );
}
