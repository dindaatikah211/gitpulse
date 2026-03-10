import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge }    from "@/shared/components/ui/badge";
import { Button }   from "@/shared/components/ui/button";
import { ArrowUp, UserMinus } from "lucide-react";
import { ROLE_CONFIG, MEMBER_STATUS_CONFIG } from "../constants/config";
import { TeamMember, TeamRole } from "../types";

interface TeamMemberCardProps {
  member:    TeamMember;
  myRole:    TeamRole;
  isMyself?: boolean;
}

export function TeamMemberCard({ member, myRole, isMyself = false }: TeamMemberCardProps) {
  const role         = ROLE_CONFIG[member.role];
  const status       = MEMBER_STATUS_CONFIG[member.memberStatus];
  const canPromote   = (myRole === "owner" || myRole === "evaluator") && member.role === "contributor";
  const canKick      = (myRole === "owner" || myRole === "evaluator") && !isMyself && member.role !== "owner";
  const initials     = member.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className={`bg-white border rounded-2xl p-5 transition-all ${isMyself ? "border-[#00d964] shadow-sm" : "border-gray-100"}`}>

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-gray-900 text-white text-sm font-bold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-gray-900 text-sm truncate">{member.name}</p>
            {isMyself && <span className="text-xs text-[#00b853] font-medium">(Kamu)</span>}
          </div>
          <p className="text-xs text-gray-500">@{member.username}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className={status.className + " border-0 text-xs gap-1"}>
            <span className={"w-1.5 h-1.5 rounded-full " + status.dot} />
            {member.memberStatus}
          </Badge>
          <Badge className={role.className + " border-0 text-xs"}>
            {role.icon} {role.label}
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Commit Velocity",    value: member.commitVelocity + "/hari"          },
          { label: "Contribution Share", value: (member.contributionShare * 100).toFixed(0) + "%"  },
          { label: "Consistency",        value: member.activityConsistency.toFixed(1) + " std"     },
          { label: "Active Weeks",       value: (member.activeWeeksRatio * 100).toFixed(0) + "%"   },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 mb-4">
        <p className="text-xs text-gray-600">
          <span className="text-[#00b853] font-semibold">→ </span>
          {member.recommendation}
        </p>
      </div>

      {/* Actions */}
      {(canPromote || canKick) && (
        <div className="flex gap-2">
          {canPromote && (
            <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
              <ArrowUp className="w-3.5 h-3.5" />
              Promote ke Evaluator
            </Button>
          )}
          {canKick && (
            <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-xs border-red-200 text-red-600 hover:bg-red-50">
              <UserMinus className="w-3.5 h-3.5" />
              Kick Member
            </Button>
          )}
        </div>
      )}
    </div>
  );
}