"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Github } from "lucide-react";
import { fadeUp, staggerContainer } from "../contants/landing-animations";

export function LandingCTA() {
  return (
    <section className="py-24 px-[5%] bg-gradient-to-br from-[#0f3d23] to-gray-900 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="w-[500px] h-[500px] bg-[#00d964] rounded-full blur-3xl"
        />
      </div>

      <motion.div
        className="relative max-w-xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.p variants={fadeUp} className="text-[#00d964] text-xs font-semibold tracking-widest uppercase mb-3">
          Mulai Sekarang
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-4xl font-bold mb-4">
          Pantau tim kamu<br />mulai hari ini
        </motion.h2>
        <motion.p variants={fadeUp} className="text-white/60 font-light mb-10 leading-relaxed">
          Gratis. Cukup login dengan akun GitHub dan mulai analisis kontribusi tim dalam hitungan menit.
        </motion.p>
        <motion.div variants={fadeUp} className="flex gap-3 justify-center flex-wrap">
          <Button asChild className="bg-[#00d964] hover:bg-[#00f070] text-gray-900 px-8 py-6 rounded-xl font-semibold gap-2">
            <Link href="/login">
              <Github className="w-5 h-5" />
              Login with GitHub
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 hover:border-white/50 text-white bg-transparent hover:bg-white px-8 py-6 rounded-xl">
            <a href="#features">Pelajari Fitur →</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}