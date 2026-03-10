export const DUMMY_ACCOUNT_SNAPSHOT = {
  connectedRepos:   4,
  activeTeams:      3,
  avgProductivity:  "Moderate",
  overallHealth:    81.5,
};

export const DUMMY_WORK_PATTERN = {
  pattern:      "Consistent Contributor",
  collaboration: "Moderate Collaboration",
  highlights: [
    "Commit konsisten setiap minggu",
    "Pola kerja aktif di hari kerja",
    "Kolaborasi moderat dengan tim",
  ],
  recommendations: [
    "Maintain commit consistency",
    "Increase pull request participation",
  ],
};

export const DUMMY_REPO_SNAPSHOT = [
  { id: "1", name: "gitpulse",    healthScore: 87, healthGrade: "B", productivityState: "active",   language: "TypeScript", updatedAt: "2 hari lalu"  },
  { id: "2", name: "ml-service",  healthScore: 72, healthGrade: "C", productivityState: "moderate", language: "Python",     updatedAt: "5 hari lalu"  },
  { id: "3", name: "data-scraper",healthScore: 91, healthGrade: "A", productivityState: "active",   language: "Python",     updatedAt: "3 hari lalu"  },
];

export const DUMMY_TEAM_SNAPSHOT = [
  { id: "1", name: "Proyek Tugas Akhir", role: "owner",       memberCount: 4, activeMembers: 3 },
  { id: "2", name: "Tim Capstone 2026",  role: "evaluator",   memberCount: 6, activeMembers: 5 },
  { id: "3", name: "Kelompok Praktikum", role: "contributor", memberCount: 3, activeMembers: 2 },
];

export const DUMMY_ACTIVITY_TREND = [
  { day: "Sen", commits: 8  },
  { day: "Sel", commits: 14 },
  { day: "Rab", commits: 6  },
  { day: "Kam", commits: 18 },
  { day: "Jum", commits: 11 },
  { day: "Sab", commits: 4  },
  { day: "Min", commits: 2  },
];