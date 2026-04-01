import { auth } from "@/shared/lib/auth";
import { DashboardLayoutSwitcher } from "./dashboard-layout-switcher";

export async function DashboardLayout() {
  const session = await auth();
  const name    = session?.user?.name?.split(" ")[0] ?? "there";

  return <DashboardLayoutSwitcher name={name} />;
}