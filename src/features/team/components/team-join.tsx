"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input }  from "@/shared/components/ui/input";
import { QrCode, Search, AlertCircle, CheckCircle2 } from "lucide-react";

type JoinState = "idle" | "not-found" | "already-joined" | "success";

export function TeamJoin() {
  const [code,  setCode]  = useState("");
  const [state, setState] = useState<JoinState>("idle");

  const handleJoin = () => {
    if (!code.trim()) return;
    // Simulasi cek kode
    if (code === "TA2026-ABC") { setState("already-joined"); return; }
    if (code === "VALID-CODE") { setState("success"); return; }
    setState("not-found");
  };

  const handleReset = () => { setCode(""); setState("idle"); };

  return (
    <div className="max-w-md space-y-4">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Gabung Team Space</h3>
          <p className="text-xs text-gray-500">Masukkan invite code atau scan QR Code untuk bergabung sebagai <span className="font-semibold text-green-700">💻 Contributor</span>.</p>
        </div>

        {/* Input code */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Invite Code</label>
          <div className="flex gap-2">
            <Input
              placeholder="contoh: TA2026-ABC"
              value={code}
              onChange={(e) => { setCode(e.target.value); setState("idle"); }}
              className="font-mono"
            />
            <Button
              onClick={handleJoin}
              disabled={!code.trim()}
              className="bg-gray-900 hover:bg-[#0f3d23] text-white flex-shrink-0"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Status feedback */}
        {state === "not-found" && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">Kode tidak valid atau tim tidak ditemukan. Pastikan kode sudah benar.</p>
          </div>
        )}
        {state === "already-joined" && (
          <div className="flex items-start gap-2.5 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700">Kamu sudah terdaftar di tim ini.</p>
          </div>
        )}
        {state === "success" && (
          <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-xl p-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-700">Berhasil bergabung! Kamu sekarang menjadi Contributor tim ini.</p>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>

        {/* Scan QR */}
        <Button variant="outline" className="w-full gap-2" disabled>
          <QrCode className="w-4 h-4" />
          Scan QR Code
          <span className="text-xs text-gray-400 ml-auto">(Coming soon)</span>
        </Button>

        {state !== "idle" && (
          <button onClick={handleReset} className="text-xs text-gray-400 hover:text-gray-700 transition-colors w-full text-center">
            Coba kode lain
          </button>
        )}
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-400 text-center">
        Minta invite code atau QR Code kepada Owner atau Evaluator tim kamu.
      </p>
    </div>
  );
}