"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, GitBranch, Users, UserCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "Repository", href: "/repository", icon: GitBranch       },
  { label: "Team",       href: "/team",       icon: Users           },
  { label: "Akun",       href: "/account",    icon: UserCircle      },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 md:hidden">
      <div className="flex items-center justify-around px-2 pt-2 pb-4">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-1.5 rounded-xl transition-colors",
                isActive ? "text-[#00b853]" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}