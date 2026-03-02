export const LANDING_ROLES = [
  {
    icon: "🎓",
    name: "Evaluator",
    badge: "Create Team",
    badgeColor: "bg-blue-100 text-blue-700",
    perms: [
      "Lihat semua member & overview tim",
      "Buat Team Space & generate QR Code",
      "Akses laporan ML semua anggota",
    ],
  },
  {
    icon: "💻",
    name: "Contributor",
    badge: "Join Team",
    badgeColor: "bg-green-100 text-green-700",
    perms: [
      "Lihat analisis repository pribadi",
      "Bergabung tim via QR Code / invite",
      "Akses skor ML diri sendiri",
    ],
  },
];

export const LANDING_TEAM_PREVIEW = [
  { initials: "DA", name: "Dinda Atikah",    role: "🎓 Evaluator",   score: 94, bg: "bg-green-600" },
  { initials: "LS", name: "Latifa Salsabila", role: "💻 Contributor", score: 87, bg: "bg-blue-600" },
  { initials: "AR", name: "Ahmad R.",         role: "💻 Contributor", score: 79, bg: "bg-orange-500" },
  { initials: "FN", name: "Farah N.",         role: "💻 Contributor", score: 82, bg: "bg-purple-600" },
];