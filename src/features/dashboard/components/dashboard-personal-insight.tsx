import { Lightbulb, TrendingUp, ArrowRight } from "lucide-react"
import { DUMMY_WORK_PATTERN } from "../constants/dummy";

export function DashboardPersonalInsight() {
  const { pattern, collaboration, highlights, recommendations } = DUMMY_WORK_PATTERN;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-4 h-4 text-[#00b853]" />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900">Personal Insight</h2>
          <p className="text-xs text-gray-400">Pola kerja kontribusimu saat ini</p>
        </div>
      </div>

      {/* Pattern badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
          ✦ {pattern}
        </span>
        <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-blue-200">
          ✦ {collaboration}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Highlights */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-[#00b853]" />
            Highlights
          </p>
          <div className="space-y-2">
            {highlights.map((h) => (
              <div key={h} className="flex items-center gap-2 text-xs text-gray-600">
                <span className="w-1.5 h-1.5 bg-[#00d964] rounded-full flex-shrink-0" />
                {h}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div>
          <p className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
            <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
            Rekomendasi
          </p>
          <div className="space-y-2">
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