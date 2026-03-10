"use client";

import { useState } from "react";
import { TeamMyTeams } from "./team-my-teams";
import { TeamCreate }  from "./team-create";
import { TeamJoin }    from "./team-join";
import { Users, Plus, QrCode } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const TABS = [
  { id: "my-teams", label: "My Teams",     icon: Users   },
  { id: "create",   label: "Buat Tim",     icon: Plus    },
  { id: "join",     label: "Gabung Tim",   icon: QrCode  },
] as const;

type TabId = typeof TABS[number]["id"];

export function TeamTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("my-teams");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
              activeTab === id
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "my-teams" && <TeamMyTeams />}
      {activeTab === "create"   && <TeamCreate  />}
      {activeTab === "join"     && <TeamJoin    />}
    </div>
  );
}