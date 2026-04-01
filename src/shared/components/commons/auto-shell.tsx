"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { useIsMobile } from "@/shared/hooks/use-mobile";

export function AuthShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const [manualCollapsed, setManualCollapsed] = useState<boolean | undefined>(undefined);

  const collapsed = manualCollapsed ?? false;

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-1 overflow-auto pb-20">
          {children}
        </main>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setManualCollapsed((prev) => !(prev ?? false))}
      />
      <main
        className="flex-1 p-6 overflow-auto transition-all duration-300"
        style={{ marginLeft: collapsed ? "4rem" : "14rem" }}
      >
        {children}
      </main>
    </div>
  );
}