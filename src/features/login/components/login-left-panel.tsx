import { COMMIT_DAYS, COMMIT_HEIGHTS, LOGIN_STATS } from "../constants/stats";

export function LoginLeftPanel() {
  return (
    <div className="hidden md:flex bg-[#0a2e1a] flex-col justify-between p-12 relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#00d964 1px, transparent 1px), linear-gradient(90deg, #00d964 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00d964] opacity-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[#00d964] opacity-5 rounded-full blur-3xl pointer-events-none" />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-2">
        <div className="w-8 h-8 bg-[#00d964] rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path
              d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6"
              stroke="#0a2e1a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="font-bold text-white text-xl">
          Git<span className="text-[#00d964]">Pulse</span>
        </span>
      </div>

      {/* Center content */}
      <div className="relative z-10 space-y-6">
        <p className="text-[#00d964] text-xs font-semibold tracking-widest uppercase">
          Platform Analisis GitHub
        </p>
        <h1 className="text-4xl font-bold text-white leading-tight">
          Selamat datang<br />kembali di<br />
          <span className="text-[#00d964]">GitPulse</span>
        </h1>
        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
          Pantau produktivitas, health score, dan pola kontribusi tim GitHub — dianalisis otomatis dengan Machine Learning.
        </p>

        {/* Stats */}
        <div className="flex gap-8 pt-2">
          {LOGIN_STATS.map(({ num, label }) => (
            <div key={label}>
              <div className="text-[#00d964] text-2xl font-bold">{num}</div>
              <div className="text-white/40 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Commit chart */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70 text-xs font-medium">
              Aktivitas Commit — 7 Hari Terakhir
            </span>
            <span className="flex items-center gap-1.5 text-[#00d964] text-xs">
              <span className="w-1.5 h-1.5 bg-[#00d964] rounded-full animate-pulse" />
              Live
            </span>
          </div>
          <div className="flex items-end gap-1.5 h-12">
            {COMMIT_HEIGHTS.map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t ${
                  i === COMMIT_HEIGHTS.length - 1
                    ? "bg-[#00d964]"
                    : "bg-[#00d964]/20"
                }`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {COMMIT_DAYS.map((d) => (
              <span key={d} className="text-white/30 text-[10px]">{d}</span>
            ))}
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-white/30 text-xs">7 hari terakhir</span>
            <span className="text-[#00d964] text-xs font-bold">+247 commits</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <p className="relative z-10 text-white/25 text-xs">
        Politeknik Negeri Semarang · Teknik Informatika · 2026
      </p>
    </div>
  );
}