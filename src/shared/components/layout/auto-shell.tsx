"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((p) => !p)} />
      <main
        className="flex-1 p-6 overflow-auto transition-all duration-300"
        style={{ marginLeft: collapsed ? "4rem" : "14rem" }}
      >
        {children}
      </main>
    </div>
  );
}