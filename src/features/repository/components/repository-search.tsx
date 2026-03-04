"use client";

import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";

interface RepositorySearchProps {
  value:    string;
  onChange: (val: string) => void;
}

export function RepositorySearch({ value, onChange }: RepositorySearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <Input
        placeholder="Cari repository..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  );
}