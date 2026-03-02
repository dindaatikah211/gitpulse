import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Github } from "lucide-react";

export function LandingHero() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-[5%] bg-[#f4fdf7] flex items-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial-[at_70%_30%] from-[#00d96420] to-transparent pointer-events-none" />
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-white border border-green-200 px-3 py-1.5 rounded-full text-xs font-semibold text-green-700 mb-6">
          <span className="w-1.5 h-1.5 bg-[#00d964] rounded-full animate-pulse" />
          Powered by Machine Learning
        </div>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5">
          Analisis Kontribusi<br />GitHub Tim Kamu<br />
          <span className="text-[#00b853]">dengan Cerdas.</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg font-light">
          GitPulse membantu evaluator dan tim developer memantau produktivitas, health score, dan pola kontribusi repository secara otomatis.
        </p>
        <div className="flex gap-3 flex-wrap">
          <Button asChild className="bg-gray-900 hover:bg-[#0f3d23] text-white px-6 py-6 rounded-xl gap-2">
            <Link href="/login">
              <Github className="w-5 h-5" />
              Login with GitHub
            </Link>
          </Button>
          <Button asChild variant="outline" className="px-6 py-6 rounded-xl border-2 hover:border-gray-900">
            <a href="#how-it-works">Lihat Cara Kerja →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}