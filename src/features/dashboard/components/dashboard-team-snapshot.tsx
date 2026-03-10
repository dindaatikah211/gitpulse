import Link from "next/link";
import { Badge }  from "@/shared/components/ui/badge";
import { Users, ArrowRight } from "lucide-react";
import { ROLE_CONFIG } from "../constants/config";
import { DUMMY_TEAM_SNAPSHOT } from "../constants/dummy";

type RoleKey = keyof typeof ROLE_CONFIG;

export function DashboardTeamSnapshot() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Team Snapshot</h2>
            <p className="text-xs text-gray-400">Tim yang kamu ikuti</p>
          </div>
        </div>
        <Link
          href="/team"
          className="flex items-center gap-1 text-xs text-[#00b853] hover:text-[#009944] font-medium transition-colors"
        >
          Lihat semua <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {DUMMY_TEAM_SNAPSHOT.map(({ id, name, role, memberCount, activeMembers }) => {
          const roleConfig = ROLE_CONFIG[role as RoleKey];
          return (
            <div key={id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:border-purple-100 hover:bg-purple-50/30 transition-all">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-3.5 h-3.5 text-[#00d964]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-400">{activeMembers}/{memberCount} member aktif</p>
              </div>
              <Badge className={roleConfig.className + " border-0 text-xs flex-shrink-0"}>
                {roleConfig.icon} {roleConfig.label}
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}