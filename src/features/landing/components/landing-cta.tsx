import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Github } from "lucide-react";

export function LandingCTA() {
  return (
    <section className="py-24 px-[5%] bg-gradient-to-br from-[#0f3d23] to-gray-900 text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-radial-[at_50%_50%] from-[#00d96420] to-transparent" />
      </div>
      <div className="relative max-w-xl mx-auto">
        <p className="text-[#00d964] text-xs font-semibold tracking-widest uppercase mb-3">
          Mulai Sekarang
        </p>
        <h2 className="text-4xl font-bold mb-4">Pantau tim kamu<br />mulai hari ini</h2>
        <p className="text-white/60 font-light mb-10 leading-relaxed">
          Gratis. Cukup login dengan akun GitHub dan mulai analisis kontribusi tim dalam hitungan menit.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Button asChild className="bg-[#00d964] hover:bg-[#00f070] text-gray-900 px-8 py-6 rounded-xl font-semibold gap-2">
            <Link href="/login">
              <Github className="w-5 h-5" />
              Login with GitHub
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 hover:border-white/50 text-white bg-transparent hover:bg-transparent px-8 py-6 rounded-xl">
            <a href="#features">Pelajari Fitur →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}