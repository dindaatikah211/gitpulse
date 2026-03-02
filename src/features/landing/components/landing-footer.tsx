const NAV_LINKS = [
  { label: "Fitur",      href: "#features"    },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Role",       href: "#roles"        },
];

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 border-t border-white/5 px-[5%] py-8 flex flex-wrap items-center justify-between gap-4">
      <div className="font-bold text-white">
        Git<span className="text-[#00d964]">Pulse</span>
      </div>
      <p className="text-gray-500 text-xs">
        Tugas Akhir · Teknik Informatika · Politeknik Negeri Semarang · 2026
      </p>
      <div className="flex gap-6">
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}