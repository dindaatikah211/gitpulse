"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  GitBranch,
  Users,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "Repository", href: "/repository", icon: GitBranch       },
  { label: "Team Space", href: "/team",       icon: Users           },
];

export function Sidebar() {
  const pathname          = usePathname();
  const { data: session } = useSession();

  const user     = session?.user;
  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "GP";

  return (
    <TooltipProvider delayDuration={0}>
      <aside className="fixed left-0 top-0 h-screen w-16 bg-gray-900 flex flex-col items-center py-4 gap-2 z-40">

        {/* Logo */}
        <Link
          href="/dashboard"
          className="w-9 h-9 bg-[#00d964] rounded-lg flex items-center justify-center mb-4 flex-shrink-0"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path
              d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6"
              stroke="#0a2e1a"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1 w-full px-2">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Tooltip key={label}>
                <TooltipTrigger asChild>
                  <Link
                    href={href}
                    className={cn(
                      "w-full h-10 rounded-lg flex items-center justify-center transition-colors",
                      isActive
                        ? "bg-[#00d964] text-gray-900"
                        : "text-gray-400 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="flex flex-col items-center gap-2 w-full px-2">

          {/* Logout */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="w-full h-10 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>

          {/* Avatar — klik ke /account */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/account"
                className={cn(
                  "flex-shrink-0 rounded-full ring-2 transition-all",
                  pathname === "/account"
                    ? "ring-[#00d964]"
                    : "ring-white/10 hover:ring-[#00d964]"
                )}
              >
                <Avatar className="w-9 h-9">
                  <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
                  <AvatarFallback className="bg-gray-700 text-white text-xs">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <div className="text-xs">
                <p className="font-semibold">{user?.name ?? "Akun"}</p>
                <p className="text-muted-foreground">Lihat profil</p>
              </div>
            </TooltipContent>
          </Tooltip>

        </div>
      </aside>
    </TooltipProvider>
  );
} 