"use client";

import { useIsMobile } from "@/shared/hooks/use-mobile";
import { AccountLayoutMobile } from "./account-layout-mobile";
import { AccountProfileCard } from "./account-profile-card";
import { AccountTeamsCard }   from "./account-teams-card";
import { AccountLogoutCard }  from "./account-logout-card";

interface AccountLayoutSwitcherProps {
  name:      string;
  username:  string;
  email:     string;
  avatar:    string;
  createdAt: string;
}

export function AccountLayoutSwitcher(props: AccountLayoutSwitcherProps) {
  const isMobile = useIsMobile();

  if (isMobile) return <AccountLayoutMobile {...props} />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Akun</h1>
        <p className="text-gray-500 text-sm mt-1">Informasi profil GitHub kamu</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
        <div className="space-y-4">
          <AccountProfileCard {...props} />
          <AccountLogoutCard />
        </div>
        <div className="space-y-4">
          <AccountTeamsCard />
        </div>
      </div>
    </div>
  );
}