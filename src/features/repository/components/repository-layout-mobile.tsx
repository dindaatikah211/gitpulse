"use client";

import { useState } from "react";
import { GitBranch, Search, Star, GitFork, Lock, Globe, ChevronDown, ChevronUp, ArrowRight } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { PRODUCTIVITY_CONFIG, HEALTH_GRADE_CONFIG, LANGUAGE_COLORS, FILTER_OPTIONS } from "../constants/config";
import { RepositoryBreakdown } from "./repository-breakdown";
import { DUMMY_REPOSITORIES } from "../constants/dummy-repo";
import { Repo } from "../types";

type ProductivityKey = keyof typeof PRODUCTIVITY_CONFIG;
type HealthGradeKey  = keyof typeof HEALTH_GRADE_CONFIG;

function RepositoryCardMobile({ repo, expanded, onToggle }: { repo: Repo; expanded: boolean; onToggle: () => void }) {
  const productivity = PRODUCTIVITY_CONFIG[repo.productivityState as ProductivityKey];
  const grade        = HEALTH_GRADE_CONFIG[repo.healthGrade as HealthGradeKey];
  const langColor    = LANGUAGE_COLORS[repo.language] ?? "bg-gray-400";

  return (
    <div className={`bg-white border rounded-2xl transition-all duration-200 ${
      expanded ? "border-[#00d964] shadow-sm shadow-green-100" : "border-gray-100"
    }`}>
      <div className="p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-0.5">
              {repo.visibility === "private"
                ? <Lock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                : <Globe className="w-3 h-3 text-gray-400 flex-shrink-0" />
              }
              <h3 className="font-bold text-gray-900 text-sm truncate">{repo.name}</h3>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{repo.description}</p>
          </div>
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
            expanded ? "bg-[#00d964]" : "bg-gray-100"
          }`}>
            {expanded
              ? <ChevronUp className="w-3.5 h-3.5 text-gray-900" />
              : <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            }
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-2">
          <Badge className={productivity.className + " border-0 text-[10px] px-1.5 py-0.5"}>
            {productivity.label}
          </Badge>
          <Badge variant="secondary" className="text-[10px] gap-1 px-1.5 py-0.5">
            Health: <span className={"font-bold " + grade.color}>{repo.healthGrade}</span>
            <span className="text-gray-400">·</span>{repo.healthScore}/100
          </Badge>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-gray-400">
          <div className="flex items-center gap-1">
            <span className={"w-2 h-2 rounded-full flex-shrink-0 " + langColor} />
            {repo.language}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-2.5 h-2.5" />{repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-2.5 h-2.5" />{repo.forks}
          </div>
          <span className="ml-auto">Updated {repo.updatedAt}</span>
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-gray-100">
          <div className="pt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-900">Health Score Breakdown</p>
                <span className={`text-xl font-bold ${grade.color}`}>
                  {repo.healthScore}<span className="text-xs font-normal text-gray-400">/100</span>
                </span>
              </div>
              <RepositoryBreakdown breakdown={repo.breakdown} />
            </div>

            <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">Grade</p>
              <div className="text-right">
                <p className={"text-2xl font-bold " + grade.color}>{repo.healthGrade}</p>
                <p className={"text-[10px] font-medium " + grade.color}>{grade.label}</p>
              </div>
            </div>

            {repo.recommendations.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-gray-900 mb-2">Rekomendasi</p>
                <div className="space-y-1.5">
                  {repo.recommendations.map((rec) => (
                    <div key={rec} className="flex items-start gap-2 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                      <ArrowRight className="w-3 h-3 text-[#00b853] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function RepositoryLayoutMobile() {
  const [search,     setSearch]     = useState("");
  const [filter,     setFilter]     = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = DUMMY_REPOSITORIES.filter(({ name, description, productivityState }) => {
    const matchSearch = name.toLowerCase().includes(search.toLowerCase()) ||
                        description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || productivityState === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-5 pt-10 pb-8 rounded-b-3xl">
        <p className="text-gray-400 text-sm mb-1">GitHub Analytics</p>
        <h1 className="text-white text-2xl font-bold mb-5">Repository</h1>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari repository..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:bg-white/15"
          />
        </div>
      </div>

      <div className="px-4 pt-4 pb-6 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {FILTER_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`flex-shrink-0 text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                filter === value
                  ? "bg-gray-900 text-white border-gray-900"
                  : "bg-white text-gray-500 border-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Menampilkan <span className="font-semibold text-gray-900">{filtered.length}</span> repository
        </p>

        {filtered.length > 0 ? (
          <div className="flex flex-col gap-3">
            {filtered.map((repo) => (
              <RepositoryCardMobile
                key={repo.id}
                repo={repo}
                expanded={expandedId === repo.id}
                onToggle={() => setExpandedId((prev) => prev === repo.id ? null : repo.id)}
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
    </div>
  );
}