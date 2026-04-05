"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "../contants/landing-animations";

const NAV_LINKS = [
  { label: "Fitur",      href: "#features"    },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Role",       href: "#roles"        },
  { label: "Tech Stack", href: "#tech"         },
  { label: "About",      href: "#about"        },
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
          <Image src="/logo.png" alt="GitPulse" width={24} height={24} className="rounded-sm" />
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