import { Outlet } from "react-router-dom";
import type { JSX } from "react";
import Navbar from "@/components/Navbar";


export default function AuthLayout(): JSX.Element {
  return (
    <>
      <div className="max-h-screen">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
}
