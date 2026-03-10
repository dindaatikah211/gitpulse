"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LayoutDashboard, GitBranch, Users, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "Repository", href: "/repository", icon: GitBranch       },
  { label: "Team Space", href: "/team",       icon: Users           },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle:  () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
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
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-gray-900 flex flex-col py-5 px-3 z-40 transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}>

        {/* Logo + toggle */}
        <div className={cn("flex items-center mb-8 px-1", collapsed ? "justify-center" : "justify-between")}>
          <Link
            href="/dashboard"
            className={cn("flex items-center gap-2.5", collapsed && "justify-center")}
          >
            <div className="w-8 h-8 bg-[#00d964] rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                <path d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6" stroke="#0a2e1a" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
            {!collapsed && (
              <span className="text-white font-bold text-base tracking-tight">GitPulse</span>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={onToggle}
              className="w-6 h-6 rounded-md flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            const navItem = (
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl text-sm font-medium transition-colors",
                  collapsed ? "w-10 h-10 justify-center mx-auto" : "px-3 py-2.5",
                  isActive
                    ? "bg-[#00d964] text-gray-900"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!collapsed && label}
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>{navItem}</TooltipTrigger>
                  <TooltipContent side="right"><p>{label}</p></TooltipContent>
                </Tooltip>
              );
            }

            return <div key={label}>{navItem}</div>;
          })}
        </nav>

        {/* Bottom */}
        <div className="flex flex-col gap-1">

          {/* Expand button — hanya saat collapsed */}
          {collapsed && (
            <button
              onClick={onToggle}
              className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto text-gray-400 hover:bg-white/10 hover:text-white transition-colors mb-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Avatar */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account"
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center mx-auto transition-all ring-2",
                    pathname === "/account" ? "ring-[#00d964]" : "ring-transparent hover:ring-[#00d964]"
                  )}
                >
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
                    <AvatarFallback className="bg-gray-700 text-white text-xs">{initials}</AvatarFallback>
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold">{user?.name ?? "Akun"}</p>
                <p className="text-muted-foreground text-xs">Lihat profil</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              href="/account"
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
                pathname === "/account" ? "bg-white/10" : "hover:bg-white/10"
              )}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
                <AvatarFallback className="bg-gray-700 text-white text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name ?? "Akun"}</p>
                <p className="text-xs text-gray-500 truncate">@{(user as { username?: string })?.username ?? "github"}</p>
              </div>
            </Link>
          )}

          {/* Logout */}
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Logout</p></TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              Logout
            </button>
          )}

        </div>
      </aside>
    </TooltipProvider>
  );
}