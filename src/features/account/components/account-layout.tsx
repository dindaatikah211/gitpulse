import { auth } from "@/shared/lib/auth";
import { AccountLayoutSwitcher } from "./account-layout-switcher";

export async function AccountLayout() {
  const session = await auth();
  const user    = session?.user;

  const createdAt = new Date().toLocaleDateString("id-ID", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });

  return (
    <AccountLayoutSwitcher
      name      ={user?.name     ?? ""}
      username  ={user?.username ?? ""}
      email     ={user?.email    ?? ""}
      avatar    ={user?.image    ?? ""}
      createdAt ={createdAt}
    />
  );
}