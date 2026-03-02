import { LANDING_STEPS } from "../contants/steps";

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-[5%] bg-[#f4fdf7]">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#00b853] text-xs font-semibold tracking-widest uppercase mb-3">
          Cara Kerja
        </p>
        <h2 className="text-4xl font-bold mb-3">Mulai dalam 4 langkah mudah</h2>
        <p className="text-gray-500 font-light mb-14">
          Dari login hingga analisis tim, dirancang sesederhana mungkin.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LANDING_STEPS.map(({ num, icon, title, desc }) => (
            <div key={num} className="text-center group">
              <div className="w-14 h-14 bg-white border-2 border-[#00d964] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 group-hover:bg-gray-900 group-hover:text-[#00d964] transition-all">
                {num}
              </div>
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-bold text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-light">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}