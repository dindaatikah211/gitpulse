import Link from "next/link";
import { signIn } from "@/shared/lib/auth";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Github, Check, X } from "lucide-react";
import { LOGIN_ROLES } from "../constants/roles";
import { LOGIN_PERMISSIONS } from "../constants/permissions";

export function LoginRightPanel() {
  return (
    <div className="flex items-center justify-center p-8 md:p-12 bg-white">
      <div className="w-full max-w-sm space-y-6">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Kembali ke beranda
        </Link>

        {/* Heading */}
        <div>
          <p className="text-[#00b853] text-xs font-semibold tracking-widest uppercase mb-2">
            Selamat datang
          </p>
          <h2 className="text-3xl font-bold leading-tight">
            Masuk ke<br />GitPulse
          </h2>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Role ditentukan otomatis — buat tim jadi Evaluator, gabung tim jadi Contributor.
          </p>
        </div>

        {/* Role info */}
        <div className="grid grid-cols-3 gap-2">
          {LOGIN_ROLES.map(({ icon, name, how, badge, className }) => (
            <div key={name} className={`${className} border rounded-xl p-3 text-center`}>
              <div className="text-xl mb-1">{icon}</div>
              <div className="font-bold text-xs">{name}</div>
              <div className="text-muted-foreground text-[10px] mt-1">{how}</div>
              <Badge variant="secondary" className="mt-2 text-[10px] px-1">{badge}</Badge>
            </div>
          ))}
        </div>

        {/* Permissions */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold text-green-700">
            🔒 Akses yang diminta GitPulse:
          </p>
          {LOGIN_PERMISSIONS.map(({ allowed, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
              {allowed
                ? <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                : <X className="w-3 h-3 text-red-400 flex-shrink-0" />
              }
              {text}
            </div>
          ))}
        </div>

        {/* Login button */}
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
        >
          <Button
            type="submit"
            className="w-full bg-gray-900 hover:bg-[#0f3d23] text-white py-6 rounded-xl gap-3"
          >
            <Github className="w-5 h-5" />
            Lanjutkan dengan GitHub
          </Button>
        </form>

        {/* Terms */}
        <p className="text-center text-xs text-muted-foreground">
          Dengan melanjutkan, kamu menyetujui{" "}
          <Link href="#" className="underline hover:text-foreground">
            Ketentuan Penggunaan
          </Link>
          {" "}dan{" "}
          <Link href="#" className="underline hover:text-foreground">
            Kebijakan Privasi
          </Link>
        </p>

      </div>
    </div>
  );
}