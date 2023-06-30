import { Navbar } from "@/components/components/navbar/Navbar";
import { Sidebar } from "@/components/components/sidebar/Sidebar";
import React from "react";
interface PropsHomeLayout {
  children: React.ReactNode;
}

export default function Homelayout({ children }: PropsHomeLayout) {
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className=" w-full">
        <Navbar />
        <div className="px-6">{children}</div>
      </div>
    </div>
  );
}
