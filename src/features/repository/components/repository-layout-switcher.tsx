"use client";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { RepositoryLayoutMobile } from "./repository-layout-mobile";
import { RepositoryGrid } from "./repository-grid";

export function RepositoryLayoutSwitcher() {
  const isMobile = useIsMobile();

  if (isMobile) return <RepositoryLayoutMobile />;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Repository</h1>
        <p className="text-gray-500 text-sm mt-1">
          Analisis produktivitas dan health score repository GitHub kamu
        </p>
      </div>
      <RepositoryGrid />
    </div>
  );
}