"use client";

import { motion } from "framer-motion";
import { LANDING_TECHS } from "../contants/techs";
import { fadeUp, staggerContainer } from "../contants/landing-animations";

export function LandingTechStack() {
  return (
    <section id="tech" className="py-24 px-[5%] bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="text-[#00d964] text-xs font-semibold tracking-widest uppercase mb-3">
            Tech Stack
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-3">
            Dibangun dengan teknologi modern
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-400 font-light mb-14">
            Kombinasi framework terkini dan layanan cloud untuk performa terbaik.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {LANDING_TECHS.map(({ icon, name, desc }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-[#00d96415] hover:border-[#00d96430] transition-colors"
            >
              <div className="text-3xl mb-3">{icon}</div>
              <div className="font-bold mb-1">{name}</div>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}