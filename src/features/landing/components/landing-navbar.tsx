import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Github } from "lucide-react";

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-16 bg-white/85 backdrop-blur-md border-b border-green-100">
      <div className="flex items-center gap-2 font-bold text-xl">
        <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6" stroke="#00d964" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>
        Git<span className="text-[#00b853]">Pulse</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-gray-500">
        {[
          { label: "Fitur",      href: "#features"     },
          { label: "Cara Kerja", href: "#how-it-works"  },
          { label: "Role",       href: "#roles"         },
          { label: "Tech Stack", href: "#tech"          },
        ].map(({ label, href }) => (
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
    </nav>
  );
}