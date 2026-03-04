"use client";

import { Badge } from "@/shared/components/ui/badge";
import { FILTER_OPTIONS } from "../constants/config";

interface RepositoryFilterProps {
  active:   string;
  onChange: (val: string) => void;
}

export function RepositoryFilter({ active, onChange }: RepositoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTER_OPTIONS.map(({ label, value }) => (
        <button key={value} onClick={() => onChange(value)}>
          <Badge
            variant={active === value ? "default" : "secondary"}
            className={active === value ? "bg-gray-900 hover:bg-gray-800" : "hover:bg-gray-200 cursor-pointer"}
          >
            {label}
          </Badge>
        </button>
      ))}
    </div>
  );
}