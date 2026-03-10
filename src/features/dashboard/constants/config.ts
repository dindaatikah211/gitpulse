export const PRODUCTIVITY_CONFIG = {
  active:   { label: "Active",   className: "bg-green-100 text-green-700",  dot: "bg-green-500"  },
  moderate: { label: "Moderate", className: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  inactive: { label: "Inactive", className: "bg-red-100 text-red-700",      dot: "bg-red-500"    },
} as const;

export const HEALTH_GRADE_CONFIG = {
  A: { color: "text-green-600"  },
  B: { color: "text-blue-600"   },
  C: { color: "text-yellow-600" },
  D: { color: "text-orange-600" },
  E: { color: "text-red-600"    },
} as const;

export const ROLE_CONFIG = {
  owner:       { label: "Owner",       className: "bg-yellow-100 text-yellow-700", icon: "👑" },
  evaluator:   { label: "Evaluator",   className: "bg-blue-100 text-blue-700",     icon: "🎓" },
  contributor: { label: "Contributor", className: "bg-green-100 text-green-700",   icon: "💻" },
} as const;