import { auth } from "@/shared/lib/auth";
import { AccountProfileCard } from "./account-profile-card";
import { AccountTeamsCard }   from "./account-teams-card";
import { AccountLogoutCard }  from "./account-logout-card";

export async function AccountLayout() {
  const session = await auth();
  const user    = session?.user;

  const createdAt = new Date().toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Akun</h1>
        <p className="text-gray-500 text-sm mt-1">Informasi profil GitHub kamu</p>
      </div>

      {/* 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

        {/* Kolom kiri */}
        <div className="space-y-4">
          <AccountProfileCard
            name      ={user?.name     ?? ""}
            username  ={user?.username ?? ""}
            email     ={user?.email    ?? ""}
            avatar    ={user?.image    ?? ""}
            createdAt ={createdAt}
          />
          <AccountLogoutCard />
        </div>

        {/* Kolom kanan */}
        <div className="space-y-4">
          <AccountTeamsCard />
        </div>

      </div>
    </div>
  );
}