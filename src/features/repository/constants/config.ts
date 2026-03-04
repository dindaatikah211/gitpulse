export const PRODUCTIVITY_CONFIG = {
  active:   { label: "Active",   className: "bg-green-100 text-green-700"  },
  moderate: { label: "Moderate", className: "bg-yellow-100 text-yellow-700" },
  inactive: { label: "Inactive", className: "bg-red-100 text-red-700"      },
} as const;

export const HEALTH_GRADE_CONFIG = {
  A: { label: "Excellent", color: "text-green-600"  },
  B: { label: "Good",      color: "text-blue-600"   },
  C: { label: "Fair",      color: "text-yellow-600" },
  D: { label: "Poor",      color: "text-orange-600" },
  E: { label: "Critical",  color: "text-red-600"    },
} as const;

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript:  "bg-blue-500",
  JavaScript:  "bg-yellow-400",
  Python:      "bg-green-500",
  Java:        "bg-orange-500",
  Go:          "bg-cyan-500",
  Rust:        "bg-orange-700",
};

export const BREAKDOWN_LABELS: Record<string, { label: string; max: number }> = {
  dokumentasi:     { label: "Dokumentasi",      max: 20 },
  issueManagement: { label: "Issue Management", max: 20 },
  commitQuality:   { label: "Commit Quality",   max: 25 },
  konsistensi:     { label: "Konsistensi",      max: 20 },
  kolaborasi:      { label: "Kolaborasi",       max: 15 },
  recency:         { label: "Recency",          max: 10 },
};

export const FILTER_OPTIONS = [
  { label: "Semua",    value: "all"      },
  { label: "Active",   value: "active"   },
  { label: "Moderate", value: "moderate" },
  { label: "Inactive", value: "inactive" },
] as const;