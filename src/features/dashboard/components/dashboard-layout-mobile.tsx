"use client";

import Link from "next/link";
import { GitBranch, Users, Zap, Heart, TrendingUp, Lightbulb, ArrowRight } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { PRODUCTIVITY_CONFIG, HEALTH_GRADE_CONFIG, ROLE_CONFIG } from "../constants/config";
import { DUMMY_ACCOUNT_SNAPSHOT, DUMMY_ACTIVITY_TREND, DUMMY_REPO_SNAPSHOT, DUMMY_TEAM_SNAPSHOT, DUMMY_WORK_PATTERN } from "../constants/dummy";

type ProductivityKey = keyof typeof PRODUCTIVITY_CONFIG;
type HealthGradeKey  = keyof typeof HEALTH_GRADE_CONFIG;
type RoleKey         = keyof typeof ROLE_CONFIG;

const STATS = (data: typeof DUMMY_ACCOUNT_SNAPSHOT) => [
  { icon: GitBranch, label: "Repos",        value: data.connectedRepos,          color: "bg-blue-50 text-blue-600"   },
  { icon: Users,     label: "Teams",         value: data.activeTeams,             color: "bg-purple-50 text-purple-600" },
  { icon: Zap,       label: "Productivity",  value: data.avgProductivity,         color: "bg-yellow-50 text-yellow-600" },
  { icon: Heart,     label: "Health",        value: data.overallHealth + "/100",  color: "bg-green-50 text-green-600"  },
];

interface DashboardLayoutMobileProps {
  name: string;
}

export function DashboardLayoutMobile({ name }: DashboardLayoutMobileProps) {
  const maxCommits = Math.max(...DUMMY_ACTIVITY_TREND.map((d) => d.commits));
  const { pattern, collaboration, highlights, recommendations } = DUMMY_WORK_PATTERN;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-5 pt-10 pb-8 rounded-b-3xl">
        <p className="text-gray-400 text-sm mb-1">Selamat datang 👋</p>
        <h1 className="text-white text-2xl font-bold mb-5">Halo, {name}!</h1>

        <div className="grid grid-cols-2 gap-3">
          {STATS(DUMMY_ACCOUNT_SNAPSHOT).map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="bg-white/10 rounded-2xl p-4">
              <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4" />
              </div>
              <p className="text-white text-lg font-bold">{value}</p>
              <p className="text-gray-400 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-5 space-y-4 pb-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-[#00b853]" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Activity Trend</h2>
              <p className="text-xs text-gray-400">7 hari terakhir · {DUMMY_ACTIVITY_TREND.reduce((s, d) => s + d.commits, 0)} commits</p>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-20">
            {DUMMY_ACTIVITY_TREND.map(({ day, commits }, i) => {
              const height  = (commits / maxCommits) * 100;
              const isToday = i === DUMMY_ACTIVITY_TREND.length - 1;
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end" style={{ height: "60px" }}>
                    <div
                      className={`w-full rounded-t-md ${isToday ? "bg-[#00d964]" : "bg-[#00d964]/20"}`}
                      style={{ height: height + "%" }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-400">{day}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center">
                <GitBranch className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Repository</h2>
            </div>
            <Link href="/repository" className="flex items-center gap-1 text-xs text-[#00b853] font-medium">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {DUMMY_REPO_SNAPSHOT.slice(0, 3).map(({ id, name, healthScore, healthGrade, productivityState, language }) => {
              const productivity = PRODUCTIVITY_CONFIG[productivityState as ProductivityKey];
              const grade        = HEALTH_GRADE_CONFIG[healthGrade as HealthGradeKey];
              return (
                <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50">
                  <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GitBranch className="w-3 h-3 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                    <p className="text-xs text-gray-400">{language}</p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Badge className={productivity.className + " border-0 text-[10px] px-1.5 py-0.5"}>
                      {productivity.label}
                    </Badge>
                    <div className="text-right">
                      <p className={"text-sm font-bold " + grade.color}>{healthGrade}</p>
                      <p className="text-[10px] text-gray-400">{healthScore}/100</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <h2 className="text-sm font-semibold text-gray-900">Team Space</h2>
            </div>
            <Link href="/team" className="flex items-center gap-1 text-xs text-[#00b853] font-medium">
              Lihat semua <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {DUMMY_TEAM_SNAPSHOT.slice(0, 3).map(({ id, name, role, memberCount, activeMembers }) => {
              const roleConfig = ROLE_CONFIG[role as RoleKey];
              return (
                <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50">
                  <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-3 h-3 text-[#00d964]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                    <p className="text-xs text-gray-400">{activeMembers}/{memberCount} aktif</p>
                  </div>
                  <Badge className={roleConfig.className + " border-0 text-[10px] px-1.5 py-0.5"}>
                    {roleConfig.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-green-50 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-3.5 h-3.5 text-[#00b853]" />
            </div>
            <h2 className="text-sm font-semibold text-gray-900">Personal Insight</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-200">
              ✦ {pattern}
            </span>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-200">
              ✦ {collaboration}
            </span>
          </div>
          <div className="space-y-1.5">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 bg-[#00d964] rounded-full flex-shrink-0" />
                {h}
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {recommendations.map((r) => (
              <div key={r} className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
                <ArrowRight className="w-3 h-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{r}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}