import { GitBranch, Users, Zap, Heart } from "lucide-react";
import { PRODUCTIVITY_CONFIG } from "../constants/config";
import { DUMMY_ACCOUNT_SNAPSHOT } from "../constants/dummy";

type ProductivityKey = keyof typeof PRODUCTIVITY_CONFIG;

export function DashboardAccountSnapshot() {
  const { connectedRepos, activeTeams, avgProductivity, overallHealth } = DUMMY_ACCOUNT_SNAPSHOT;
  const productivity = PRODUCTIVITY_CONFIG[avgProductivity.toLowerCase() as ProductivityKey];

  const STATS = [
    {
      icon:  GitBranch,
      label: "Connected Repos",
      value: connectedRepos,
      sub:   "repository terhubung",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon:  Users,
      label: "Active Teams",
      value: activeTeams,
      sub:   "tim aktif",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon:  Zap,
      label: "Avg Productivity",
      value: avgProductivity,
      sub:   "rata-rata produktivitas",
      color: "bg-yellow-50 text-yellow-600",
      badge: productivity.className,
    },
    {
      icon:  Heart,
      label: "Overall Health",
      value: overallHealth + "/100",
      sub:   "rata-rata health score",
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <div>
      <h2 className="text-sm font-semibold text-gray-700 mb-3">Account Snapshot</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({ icon: Icon, label, value, sub, color, badge }) => (
          <div key={label} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className={`text-xl font-bold text-gray-900 ${badge ?? ""}`}>{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}