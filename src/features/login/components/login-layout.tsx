"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Github, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { LOGIN_ROLES } from "../constants/roles";

const VIDEO_URL = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260315_073750_51473149-4350-4920-ae24-c8214286f323.mp4";

export function LoginLayout() {
  const handleLogin = () => {
    signIn("github", { callbackUrl: "/dashboard" }, { prompt: "select_account" });
  };

  return (
    <main className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-black">
      <video
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-[1]" />

      <div className="relative z-10 w-full max-w-[360px] px-4 py-6 flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm font-medium transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </Link>

        <Card
          className="border-0 shadow-2xl"
          style={{
            background:           "rgba(255,255,255,0.04)",
            backdropFilter:       "blur(50px)",
            WebkitBackdropFilter: "blur(50px)",
            boxShadow:            "4px 4px 4px rgba(0,0,0,0.1), inset 0 1px 1px rgba(255,255,255,0.12)",
            outline:              "0.5px solid rgba(255,255,255,0.12)",
          }}
        >
          <CardHeader className="pt-2 px-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-[#00d964] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
                  <path d="M2 14 C4 10 8 6 10 10 C12 14 16 6 18 6" stroke="#0a2e1a" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-bold text-white text-sm">Git<span className="text-[#00d964]">Pulse</span></span>
            </div>
            <h2 className="text-lg font-medium text-white leading-tight">Masuk ke GitPulse</h2>
            <p className="text-white/45 text-xs leading-relaxed mt-1">
              Role ditentukan otomatis — buat tim jadi Owner, gabung tim jadi Contributor.
            </p>
          </CardHeader>

          <CardContent className="space-y-2">
            <div className="grid grid-cols-3 gap-1.5">
              {LOGIN_ROLES.map(({ icon: Icon, name, how, badge }) => (
                <div
                  key={name}
                  className="text-center p-2.5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/15 transition-colors"
                >
                  <div className="w-6 h-6 rounded-md bg-white/8 border border-white/10 flex items-center justify-center mx-auto mb-1.5">
                    <Icon className="w-3 h-3 text-white/60" />
                  </div>
                  <p className="text-white text-[10px] font-medium mb-0.5">{name}</p>
                  <p className="text-white/35 text-[9px] leading-tight mb-1.5">{how}</p>
                  <Badge variant="secondary" className="text-[8px] px-1.5 py-0 bg-white/8 text-white/40 border-0">
                    {badge}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="px-5 pt-2 pb-2 flex flex-col gap-3">
            <Button
              onClick={handleLogin}
              className="relative w-full overflow-hidden gap-2 text-sm font-medium text-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-transform border-0"
              style={{
                background: "#00d964",
                boxShadow:  "0 0 20px rgba(0,217,100,0.3), inset 0 1px 1px rgba(255,255,255,0.3)",
              }}
            >
              <span
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px blur-sm"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)" }}
              />
              <Github className="w-4 h-4" />
              Lanjutkan dengan GitHub
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}