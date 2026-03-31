"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Github, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Fitur",      href: "#features"    },
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Role",       href: "#roles"        },
  { label: "Tech Stack", href: "#tech"         },
];

export function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16 bg-white/85 backdrop-blur-md border-b border-green-100">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6" stroke="#00d964" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          Git<span className="text-[#00b853]">Pulse</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-gray-900 transition-colors">
              {label}
            </a>
          ))}
          <Button asChild size="sm" className="bg-gray-900 hover:bg-[#0f3d23] text-white gap-2">
            <Link href="/login">
              <Github className="w-4 h-4" />
              Login with GitHub
            </Link>
          </Button>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-16 left-0 right-0 z-50 md:hidden bg-white border-b border-green-100 shadow-lg px-[5%] py-4"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="py-3 px-4 rounded-xl text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-[#00b853] transition-colors"
                  >
                    {label}
                  </a>
                ))}

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <Button asChild className="w-full bg-gray-900 hover:bg-[#0f3d23] text-white gap-2 rounded-xl py-5">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Github className="w-4 h-4" />
                      Login with GitHub
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}