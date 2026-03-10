import { redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import { AuthShell } from "@/shared/components/layout/auto-shell";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return <AuthShell>{children}</AuthShell>;
}