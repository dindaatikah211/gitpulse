"use client";

import { useState } from "react";
import { Badge }     from "@/shared/components/ui/badge";
import { Users, ChevronRight } from "lucide-react";
import { DUMMY_TEAMS } from "../constants/dummy-team";
import { Team } from "../types";
import { TeamDetail } from "./team-detail";
import { ROLE_CONFIG } from "../constants/config";

export function TeamMyTeams() {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  if (selectedTeam) {
    return <TeamDetail team={selectedTeam} onBack={() => setSelectedTeam(null)} />;
  }

  return (
    <div className="space-y-3 max-w-3xl">
      {DUMMY_TEAMS.map((team) => {
        const role = ROLE_CONFIG[team.myRole];
        return (
          <div
            key={team.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-green-200 hover:shadow-sm transition-all cursor-pointer"
            onClick={() => setSelectedTeam(team)}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#00d964]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-bold text-gray-900 truncate">{team.name}</h3>
                  <Badge className={role.className + " border-0 text-xs"}>
                    {role.icon} {role.label}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 truncate">{team.description}</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-center hidden sm:block">
                  <p className="text-sm font-bold text-gray-900">{team.memberCount}</p>
                  <p className="text-xs text-gray-400">member</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}