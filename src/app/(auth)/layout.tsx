import { redirect } from "next/navigation";
import { auth } from "@/shared/lib/auth";
import { Sidebar } from "@/shared/components/layout/sidebar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-16 flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}