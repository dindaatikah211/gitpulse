import Link from "next/link";
import { Badge }     from "@/shared/components/ui/badge";
import { GitBranch, ArrowRight } from "lucide-react";
import { HEALTH_GRADE_CONFIG, PRODUCTIVITY_CONFIG } from "../constants/config";
import { DUMMY_REPO_SNAPSHOT } from "../constants/dummy";

type ProductivityKey = keyof typeof PRODUCTIVITY_CONFIG;
type HealthGradeKey  = keyof typeof HEALTH_GRADE_CONFIG;

export function DashboardRepoSnapshot() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <GitBranch className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Repository Snapshot</h2>
            <p className="text-xs text-gray-400">Top repository kamu</p>
          </div>
        </div>
        <Link
          href="/repository"
          className="flex items-center gap-1 text-xs text-[#00b853] hover:text-[#009944] font-medium transition-colors"
        >
          Lihat semua <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {DUMMY_REPO_SNAPSHOT.map(({ id, name, healthScore, healthGrade, productivityState, language, updatedAt }) => {
          const productivity = PRODUCTIVITY_CONFIG[productivityState as ProductivityKey];
          const grade        = HEALTH_GRADE_CONFIG[healthGrade as HealthGradeKey];
          return (
            <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:border-green-100 hover:bg-green-50/30 transition-all">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <GitBranch className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-400">{language} · {updatedAt}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge className={productivity.className + " border-0 text-xs"}>
                  {productivity.label}
                </Badge>
                <div className="text-right">
                  <p className={"text-sm font-bold " + grade.color}>{healthGrade}</p>
                  <p className="text-xs text-gray-400">{healthScore}/100</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}