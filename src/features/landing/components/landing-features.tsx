import { Badge } from "@/shared/components/ui/badge";
import { LANDING_FEATURES } from "../contants/features";

export function LandingFeatures() {
  return (
    <section id="features" className="py-24 px-[5%]">
      <div className="text-center max-w-xl mx-auto mb-14">
        <p className="text-[#00b853] text-xs font-semibold tracking-widest uppercase mb-3">
          Fitur Utama
        </p>
        <h2 className="text-4xl font-bold mb-4">
          Semua yang kamu butuhkan<br />untuk evaluasi tim
        </h2>
        <p className="text-gray-500 font-light leading-relaxed">
          Dari login hingga laporan ML — GitPulse menangani semuanya dalam satu platform.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {LANDING_FEATURES.map(({ icon, title, desc, tags }) => (
          <div key={title} className="border border-gray-100 rounded-2xl p-8 hover:border-green-300 hover:-translate-y-1 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors">
              {icon}
            </div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-light mb-4">{desc}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <Badge key={tag} variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}