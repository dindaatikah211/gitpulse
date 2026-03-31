"use client";

import { motion } from "framer-motion";
import { LANDING_STEPS } from "../contants/steps";
import { fadeUp, staggerContainer } from "../contants/landing-animations";

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-[5%] bg-[#f4fdf7]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className="text-[#00b853] text-xs font-semibold tracking-widest uppercase mb-3">
            Cara Kerja
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-3">
            Mulai dalam 4 langkah mudah
          </motion.h2>
          <motion.p variants={fadeUp} className="text-gray-500 font-light mb-14">
            Dari login hingga analisis tim, dirancang sesederhana mungkin.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {LANDING_STEPS.map(({ num, icon, title, desc }) => (
            <motion.div key={num} variants={fadeUp} className="text-center group">
              <div className="w-14 h-14 bg-white border-2 border-[#00d964] rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 group-hover:bg-gray-900 group-hover:text-[#00d964] transition-all">
                {num}
              </div>
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="font-bold text-sm mb-2">{title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}