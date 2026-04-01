"use client";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { TeamLayoutMobile } from "./team-layout-mobile";
import { TeamTabs } from "./team-tabs";

export function TeamLayoutSwitcher() {
  const isMobile = useIsMobile();

  if (isMobile) return <TeamLayoutMobile />;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team Space</h1>
        <p className="text-gray-500 text-sm mt-1">
          Kelola tim, pantau kontribusi anggota, dan analisis produktivitas bersama.
        </p>
      </div>
      <TeamTabs />
    </div>
  );
}