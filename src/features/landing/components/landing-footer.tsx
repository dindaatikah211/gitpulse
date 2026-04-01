"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../contants/landing-animations";

const NAV_LINKS = [
  { label: "Fitur",      href: "#features"    },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Role",       href: "#roles"        },
  { label: "Tech Stack", href: "#tech"         },
];

export function LandingFooter() {
  return (
    <motion.footer
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-black border-t border-white/5 px-[5%] py-8"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-base text-white">
          <div className="w-6 h-6 bg-[#00d964] rounded-md flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5">
              <path d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6" stroke="#0a2e1a" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          Git<span className="text-[#00d964]">Pulse</span>
        </Link>

        <p className="text-white/25 text-xs">
          Analyze smarter. Collaborate better. Ship faster.
        </p>

        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="text-white/30 hover:text-white/60 text-xs transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}