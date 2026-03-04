"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { Star, GitFork, ChevronDown, ChevronUp, Lock, Globe, ArrowRight } from "lucide-react";
import { PRODUCTIVITY_CONFIG, HEALTH_GRADE_CONFIG, LANGUAGE_COLORS } from "../constants/config";
import { RepositoryBreakdown } from "./repository-breakdown";
import { Repo } from "../types";

interface RepositoryCardProps {
  repo:      Repo;
  expanded:  boolean;
  onToggle:  () => void;
}

type ProductivityKey = keyof typeof PRODUCTIVITY_CONFIG;
type HealthGradeKey  = keyof typeof HEALTH_GRADE_CONFIG;

export function RepositoryCard({ repo, expanded, onToggle }: RepositoryCardProps) {
  const productivity = PRODUCTIVITY_CONFIG[repo.productivityState as ProductivityKey];
  const grade        = HEALTH_GRADE_CONFIG[repo.healthGrade as HealthGradeKey];
  const langColor    = LANGUAGE_COLORS[repo.language] ?? "bg-gray-400";

  return (
    <div className={`bg-white border rounded-2xl transition-all duration-200 ${
      expanded ? "border-[#00d964] shadow-lg shadow-green-100" : "border-gray-100 hover:border-green-200 hover:shadow-sm"
    }`}>

      {/* Card header */}
      <div className="p-5 cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {repo.visibility === "private"
                ? <Lock className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                : <Globe className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              }
              <h3 className="font-bold text-gray-900 truncate">{repo.name}</h3>
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{repo.description}</p>
          </div>
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
            expanded ? "bg-[#00d964]" : "bg-gray-100"
          }`}>
            {expanded
              ? <ChevronUp className="w-4 h-4 text-gray-900" />
              : <ChevronDown className="w-4 h-4 text-gray-500" />
            }
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <Badge className={productivity.className + " border-0 text-xs"}>
            {productivity.label}
          </Badge>
          <Badge variant="secondary" className="text-xs gap-1">
            Health:
            <span className={"font-bold " + grade.color}>{repo.healthGrade}</span>
            <span className="text-gray-400">·</span>
            {repo.healthScore}/100
          </Badge>
        </div>

        {/* Bottom row */}
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <span className={"w-2.5 h-2.5 rounded-full flex-shrink-0 " + langColor} />
            {repo.language}
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3" />{repo.stars}
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />{repo.forks}
          </div>
          <span className="ml-auto">Updated {repo.updatedAt}</span>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="px-5 pb-5">
          <Separator className="mb-5" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Kiri: Health Score Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-900">Health Score Breakdown</p>
                <div className={`text-2xl font-bold ${grade.color}`}>
                  {repo.healthScore}
                  <span className="text-sm font-normal text-gray-400">/100</span>
                </div>
              </div>
              <RepositoryBreakdown breakdown={repo.breakdown} />
            </div>

            {/* Kanan: Rekomendasi + summary */}
            <div className="space-y-4">
              {/* Grade card */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 mb-1">Grade</p>
                <p className={"text-5xl font-bold " + grade.color}>{repo.healthGrade}</p>
                <p className={"text-xs font-medium mt-1 " + grade.color}>{grade.label}</p>
              </div>

              {/* Rekomendasi */}
              {repo.recommendations.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-2">Rekomendasi</p>
                  <div className="space-y-2">
                    {repo.recommendations.map((rec) => (
                      <div key={rec} className="flex items-start gap-2.5 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                        <ArrowRight className="w-3.5 h-3.5 text-[#00b853] flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-700">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}