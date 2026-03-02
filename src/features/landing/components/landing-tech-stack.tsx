import { LANDING_TECHS } from "../contants/techs";

export function LandingTechStack() {
  return (
    <section id="tech" className="py-24 px-[5%] bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#00d964] text-xs font-semibold tracking-widest uppercase mb-3">
          Tech Stack
        </p>
        <h2 className="text-4xl font-bold mb-3">Dibangun dengan teknologi modern</h2>
        <p className="text-gray-400 font-light mb-14">
          Kombinasi framework terkini dan layanan cloud untuk performa terbaik.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {LANDING_TECHS.map(({ icon, name, desc }) => (
            <div key={name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-[#00d96415] hover:border-[#00d96430] hover:-translate-y-1 transition-all">
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-bold mb-1">{name}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}