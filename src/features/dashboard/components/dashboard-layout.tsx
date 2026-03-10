import { auth } from "@/shared/lib/auth";
import { DashboardAccountSnapshot } from "./dashboard-account-snapshot";
import { DashboardPersonalInsight } from "./dashboard-personal-insight";
import { DashboardRepoSnapshot }    from "./dashboard-repo-snapshot";
import { DashboardTeamSnapshot }    from "./dashboard-team-snapshot";
import { DashboardActivityTrend }   from "./dashboard-activity-trend";

export async function DashboardLayout() {
  const session = await auth();
  const name    = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="max-w-5xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Halo, {name} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Berikut ringkasan aktivitas dan analisis repository GitHub kamu.
        </p>
      </div>

      <DashboardAccountSnapshot />

      <DashboardPersonalInsight />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <DashboardRepoSnapshot />
        <DashboardTeamSnapshot />
      </div>

      <DashboardActivityTrend />
    </div>
  );
}