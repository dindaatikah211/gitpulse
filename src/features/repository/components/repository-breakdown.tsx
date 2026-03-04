import { BREAKDOWN_LABELS } from "../constants/config";

interface RepositoryBreakdownProps {
  breakdown: Record<string, number>;
}

export function RepositoryBreakdown({ breakdown }: RepositoryBreakdownProps) {
  return (
    <div className="space-y-2 mt-4">
      {Object.entries(breakdown).map(([key, value]) => {
        const config = BREAKDOWN_LABELS[key];
        if (!config) return null;
        const percentage = (value / config.max) * 100;
        return (
          <div key={key}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{config.label}</span>
              <span className="font-medium text-gray-700">{value}/{config.max}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full">
              <div
                className="h-full bg-[#00d964] rounded-full transition-all"
                style={{ width: percentage + "%" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}