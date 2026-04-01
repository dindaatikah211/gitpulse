"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Menu, X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const NAV_LINKS = [
  { label: "Fitur",      href: "#features"    },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Role",       href: "#roles"        },
  { label: "Tech Stack", href: "#tech"         },
];

function PillButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative inline-flex rounded-full p-[0.6px] border border-white/20 hover:border-white/40 transition-colors">
      <span
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px rounded-full blur-sm"
        style={{ background: "linear-gradient(90deg, transparent, #00d96460, transparent)" }}
      />
      <span className="relative inline-flex items-center gap-2 bg-black text-white rounded-full px-5 py-2 text-sm font-medium">
        {children}
      </span>
    </Link>
  );
}

export function LandingNavbar() {
  const [open,     setOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-md border-b border-white/8 shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      )}>
        <Link href="/" className="flex items-center gap-2 font-bold text-base text-white">
          <div className="w-7 h-7 bg-[#00d964] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
              <path d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6" stroke="#0a2e1a" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          Git<span className="text-[#00d964]">Pulse</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="flex items-center gap-1 text-white/50 hover:text-white text-sm font-medium transition-colors">
              {label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <PillButton href="/login">
            <Github className="w-3.5 h-3.5" />
            Login with GitHub
          </PillButton>
        </div>

        <button
          className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 left-4 right-4 z-50 md:hidden bg-black/95 border border-white/10 rounded-2xl px-4 py-4"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="py-2.5 px-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </a>
                ))}
                <div className="mt-2 pt-2 border-t border-white/10">
                  <PillButton href="/login">
                    <Github className="w-3.5 h-3.5" />
                    Login with GitHub
                  </PillButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}