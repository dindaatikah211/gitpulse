import { Badge } from "@/shared/components/ui/badge";
import { Check } from "lucide-react";
import { LANDING_ROLES, LANDING_TEAM_PREVIEW } from "../contants/roles";

export function LandingRoles() {
  return (
    <section id="roles" className="py-24 px-[5%]">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-[#00b853] text-xs font-semibold tracking-widest uppercase mb-3">
            Sistem Role
          </p>
          <h2 className="text-4xl font-bold mb-4">Dua peran,<br />satu ekosistem</h2>
          <p className="text-gray-500 font-light leading-relaxed mb-8">
            GitPulse dirancang untuk dua tipe pengguna dengan akses berbeda. Role ditentukan otomatis dari aksi yang kamu lakukan.
          </p>
          <div className="space-y-3">
            {LANDING_ROLES.map(({ icon, name, badge, badgeColor, perms }) => (
              <div key={name} className="border border-gray-100 rounded-xl p-6 hover:border-green-300 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{icon}</span>
                  <span className="font-bold">{name}</span>
                  <Badge className={`${badgeColor} ml-auto border-0`}>{badge}</Badge>
                </div>
                <div className="space-y-1.5">
                  {perms.map(p => (
                    <div key={p} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-3.5 h-3.5 text-[#00b853] flex-shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team preview */}
        <div className="bg-[#f4fdf7] border border-green-100 rounded-2xl p-6">
          <p className="font-bold text-sm mb-4">🏠 Team: Proyek Tugas Akhir</p>
          <div className="space-y-3">
            {LANDING_TEAM_PREVIEW.map(({ initials, name, role, score, bg }) => (
              <div key={name} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100">
                <div className={`${bg} w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {initials}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">{name}</div>
                  <div className="text-xs text-gray-500">{role}</div>
                </div>
                <div className="font-bold text-green-600">{score}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Rata-rata Health Score Tim</p>
            <p className="text-3xl font-bold text-green-600">85.5</p>
            <div className="h-2 bg-gray-100 rounded-full mt-2">
              <div className="h-full w-[85%] bg-[#00d964] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}