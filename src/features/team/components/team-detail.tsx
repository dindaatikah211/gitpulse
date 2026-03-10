"use client";

import { Button }   from "@/shared/components/ui/button";
import { Badge }    from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";
import { ArrowLeft, Trash2, Users, GitBranch, Copy, Check } from "lucide-react";
import { DUMMY_MEMBERS } from "../constants/dummy-team";
import { Team } from "../types";
import { TeamMemberCard } from "./team-member-card";
import { useState } from "react";
import { ROLE_CONFIG } from "../constants/config";

interface TeamDetailProps {
  team:   Team;
  onBack: () => void;
}

// Simulasi current user id
const CURRENT_USER_ID = "1";

export function TeamDetail({ team, onBack }: TeamDetailProps) {
  const [copied, setCopied] = useState(false);
  const myRole  = team.myRole;
  const role    = ROLE_CONFIG[myRole];
  const canSeeAll = myRole === "owner" || myRole === "evaluator";

  const members = canSeeAll
    ? DUMMY_MEMBERS
    : DUMMY_MEMBERS.filter((m) => m.id === CURRENT_USER_ID);

  const handleCopy = () => {
    navigator.clipboard.writeText(team.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke daftar tim
      </button>

      {/* Team header */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-6 h-6 text-[#00d964]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{team.name}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{team.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={role.className + " border-0 text-xs"}>
                  {role.icon} {role.label}
                </Badge>
                <span className="text-xs text-gray-400">· Dibuat {team.createdAt}</span>
              </div>
            </div>
          </div>

          {/* Delete button — owner only */}
          {myRole === "owner" && (
            <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5 flex-shrink-0">
              <Trash2 className="w-3.5 h-3.5" />
              Hapus Tim
            </Button>
          )}
        </div>

        <Separator className="my-5" />

        {/* Team info row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-0.5">Total Member</p>
            <p className="text-lg font-bold text-gray-900">{team.memberCount}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-0.5">Repository</p>
            <div className="flex items-center gap-1 mt-0.5">
              <GitBranch className="w-3.5 h-3.5 text-gray-500" />
              <p className="text-sm font-bold text-gray-900">{team.repos.join(", ")}</p>
            </div>
          </div>

          {/* Invite code — owner & evaluator only */}
          {canSeeAll && (
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-0.5">Invite Code</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900 font-mono">{team.inviteCode}</p>
                <button onClick={handleCopy} className="text-gray-400 hover:text-gray-700 transition-colors">
                  {copied
                    ? <Check className="w-3.5 h-3.5 text-green-500" />
                    : <Copy className="w-3.5 h-3.5" />
                  }
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Members */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          {canSeeAll ? "Semua Member" : "Data Kamu"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {members.map((member) => (
            <TeamMemberCard
              key      ={member.id}
              member   ={member}
              myRole   ={myRole}
              isMyself ={member.id === CURRENT_USER_ID}
            />
          ))}
        </div>
      </div>
    </div>
  );
}