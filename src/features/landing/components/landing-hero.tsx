"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { Github } from "lucide-react";
import { fadeUp, fadeIn, staggerContainer } from "../contants/landing-animations";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.4,
        vy:    (Math.random() - 0.5) * 0.4,
        r:     Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 100, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 217, 100, ${0.1 * (1 - dist / 100)})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

export function LandingHero() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-[5%] bg-[#f4fdf7] flex items-center relative overflow-hidden">
      <ParticleCanvas />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-radial-[at_70%_30%] from-[#00d96420] to-transparent pointer-events-none" />

      <motion.div
        className="max-w-2xl relative z-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 bg-white border border-green-200 px-3 py-1.5 rounded-full text-xs font-semibold text-green-700 mb-6">
          <span className="w-1.5 h-1.5 bg-[#00d964] rounded-full animate-pulse" />
          Powered by Machine Learning
        </motion.div>

        <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl font-bold leading-tight mb-5">
          Analisis Kontribusi<br />GitHub Tim Kamu<br />
          <span className="text-[#00b853]">dengan Cerdas.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg font-light">
          GitPulse membantu evaluator dan tim developer memantau produktivitas, health score, dan pola kontribusi repository secara otomatis.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
          <Button asChild className="bg-gray-900 hover:bg-[#0f3d23] text-white px-6 py-6 rounded-xl gap-2">
            <Link href="/login">
              <Github className="w-5 h-5" />
              Login with GitHub
            </Link>
          </Button>
          <Button asChild variant="outline" className="px-6 py-6 rounded-xl border-2 hover:border-gray-900">
            <a href="#how-it-works">Lihat Cara Kerja →</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}