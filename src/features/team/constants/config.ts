export const ROLE_CONFIG = {
  owner:       { label: "Owner",       className: "bg-yellow-100 text-yellow-700", icon: "👑" },
  evaluator:   { label: "Evaluator",   className: "bg-blue-100 text-blue-700",     icon: "🎓" },
  contributor: { label: "Contributor", className: "bg-green-100 text-green-700",   icon: "💻" },
} as const;

export const MEMBER_STATUS_CONFIG = {
  Active:   { className: "bg-green-100 text-green-700",  dot: "bg-green-500"  },
  Passive:  { className: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  Inactive: { className: "bg-red-100 text-red-700",      dot: "bg-red-500"    },
} as const;