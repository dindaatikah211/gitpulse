"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LayoutDashboard, GitBranch, Users, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";
import { Separator } from "@/shared/components/ui/separator";
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
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen flex flex-col py-5 px-3 z-40 transition-all duration-300 border-r border-white/8",
          collapsed ? "w-16" : "w-56",
        )}
        style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className={cn("flex items-center mb-8 px-1", collapsed ? "justify-center" : "justify-between")}>
          <Link href="/dashboard" className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
            <Image src="/logo.png" alt="GitPulse" width={32} height={32} className="rounded-md flex-shrink-0" />
            {!collapsed && (
              <span className="text-white font-bold text-base tracking-tight">GitPulse</span>
            )}
          </Link>

          {!collapsed && (
            <button
              onClick={onToggle}
              className="w-6 h-6 rounded-md flex items-center justify-center text-white/30 hover:bg-white/8 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            const navItem = (
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-md text-sm font-medium transition-all duration-200",
                  collapsed ? "w-10 h-10 justify-center mx-auto" : "px-3 py-2.5",
                  isActive
                    ? "bg-[#00d964] text-gray-900"
                    : "text-white/40 hover:bg-white/8 hover:text-white"
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

        <div className="flex flex-col gap-1">
          {collapsed && (
            <button
              onClick={onToggle}
              className="w-10 h-10 rounded-md flex items-center justify-center mx-auto text-white/30 hover:bg-white/8 hover:text-white transition-colors mb-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <Separator className="bg-white/8 mb-2" />

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account"
                  className={cn(
                    "w-10 h-10 rounded-md flex items-center justify-center mx-auto transition-all ring-2",
                    pathname === "/account" ? "ring-[#00d964]" : "ring-transparent hover:ring-[#00d964]/50"
                  )}
                >
                  <Avatar className="w-7 h-7">
                    <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
                    <AvatarFallback className="bg-white/10 text-white text-xs">{initials}</AvatarFallback>
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
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-all",
                pathname === "/account" ? "bg-white/8 border border-white/10" : "hover:bg-white/8"
              )}
            >
              <Avatar className="w-7 h-7 flex-shrink-0">
                <AvatarImage src={user?.image ?? ""} alt={user?.name ?? "User"} />
                <AvatarFallback className="bg-white/10 text-white text-xs">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name ?? "Akun"}</p>
                <p className="text-xs text-white/35 truncate">@{(user as { username?: string })?.username ?? "github"}</p>
              </div>
            </Link>
          )}

          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-10 h-10 rounded-md flex items-center justify-center mx-auto text-white/30 hover:bg-red-500/10 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right"><p>Logout</p></TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/35 hover:bg-red-500/10 hover:text-red-400 transition-colors"
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