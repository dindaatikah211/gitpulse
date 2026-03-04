"use client";

import { useState } from "react";
import { RepositoryCard }   from "./repository-card";
import { RepositorySearch } from "./repository-search";
import { RepositoryFilter } from "./repository-filter";
import { DUMMY_REPOSITORIES } from "../constants/dummy-repo";
import { GitBranch } from "lucide-react";

export function RepositoryGrid() {
  const [search,      setSearch]      = useState("");
  const [filter,      setFilter]      = useState("all");
  const [expandedId,  setExpandedId]  = useState<string | null>(null);

  const filtered = DUMMY_REPOSITORIES.filter(({ name, description, productivityState }) => {
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) ||
                        description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || productivityState === filter;
    return matchSearch && matchFilter;
  });

  const handleToggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-5">
      {/* Search & filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <RepositorySearch value={search} onChange={setSearch} />
        <RepositoryFilter active={filter} onChange={setFilter} />
      </div>

      {/* Count */}
      <p className="text-sm text-gray-500">
        Menampilkan <span className="font-semibold text-gray-900">{filtered.length}</span> repository
      </p>

      {/* List — 1 kolom agar expand tidak ganggu card lain */}
      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((repo) => (
            <RepositoryCard
              key      ={repo.id}
              repo     ={repo}
              expanded ={expandedId === repo.id}
              onToggle ={() => handleToggle(repo.id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <GitBranch className="w-10 h-10 text-gray-300 mb-3" />
          <p className="font-medium text-gray-500">Tidak ada repository ditemukan</p>
          <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci atau filter</p>
        </div>
      )}
    </div>
  );
}