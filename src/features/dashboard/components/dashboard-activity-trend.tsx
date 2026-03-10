import { TrendingUp } from "lucide-react";
import { DUMMY_ACTIVITY_TREND } from "../constants/dummy";

export function DashboardActivityTrend() {
  const maxCommits = Math.max(...DUMMY_ACTIVITY_TREND.map((d) => d.commits));

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[#00b853]" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Activity Trend</h2>
            <p className="text-xs text-gray-400">Aktivitas commit 7 hari terakhir</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            {DUMMY_ACTIVITY_TREND.reduce((sum, d) => sum + d.commits, 0)}
          </p>
          <p className="text-xs text-gray-400">total commits</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-28">
        {DUMMY_ACTIVITY_TREND.map(({ day, commits }, i) => {
          const height     = (commits / maxCommits) * 100;
          const isToday    = i === DUMMY_ACTIVITY_TREND.length - 1;
          return (
            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
              <p className="text-xs text-gray-400 font-medium">{commits}</p>
              <div className="w-full flex items-end" style={{ height: "80px" }}>
                <div
                  className={`w-full rounded-t-lg transition-all ${isToday ? "bg-[#00d964]" : "bg-[#00d964]/20 hover:bg-[#00d964]/40"}`}
                  style={{ height: height + "%" }}
                />
              </div>
              <p className="text-xs text-gray-400">{day}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}