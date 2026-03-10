"use client";

import { useState } from "react";
import { Button }   from "@/shared/components/ui/button";
import { Input }    from "@/shared/components/ui/input";
import { Badge }    from "@/shared/components/ui/badge";
import { GitBranch, X, QrCode, Copy, Check } from "lucide-react";

const DUMMY_REPOS = ["gitpulse", "ml-service", "portofolio-web", "data-scraper"];

export function TeamCreate() {
  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [repoSearch,  setRepoSearch]  = useState("");
  const [generated,   setGenerated]   = useState(false);
  const [inviteCode,  setInviteCode]  = useState("");
  const [copied,      setCopied]      = useState(false);

  const filteredRepos = DUMMY_REPOS.filter(
    (r) => r.includes(repoSearch.toLowerCase()) && !selectedRepos.includes(r)
  );

  const toggleRepo = (repo: string) => {
    setSelectedRepos((prev) =>
      prev.includes(repo) ? prev.filter((r) => r !== repo) : [...prev, repo]
    );
  };

  const handleCreate = () => {
    const code = "TA-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
    setGenerated(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = name.trim() && selectedRepos.length > 0;

  if (generated) {
    return (
      <div className="max-w-md">
        <div className="bg-white border border-[#00d964] rounded-2xl p-8 text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-8 h-8 text-[#00b853]" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Tim Berhasil Dibuat!</h3>
          <p className="text-sm text-gray-500 mb-6">
            Bagikan invite code berikut kepada anggota tim untuk bergabung.
          </p>

          {/* Invite code */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-400 mb-2">Invite Code</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-bold font-mono text-gray-900 tracking-widest">{inviteCode}</p>
              <button onClick={handleCopy} className="text-gray-400 hover:text-gray-700">
                {copied
                  ? <Check className="w-5 h-5 text-green-500" />
                  : <Copy className="w-5 h-5" />
                }
              </button>
            </div>
          </div>

          {/* QR Code placeholder */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-dashed border-gray-200">
            <QrCode className="w-24 h-24 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-400 mt-2">QR Code akan digenerate di sini</p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => { setGenerated(false); setName(""); setDescription(""); setSelectedRepos([]); }}
          >
            Buat Tim Baru
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Buat Team Space</h3>
          <p className="text-xs text-gray-500">Kamu akan otomatis menjadi <span className="font-semibold text-yellow-600">👑 Owner</span> tim ini.</p>
        </div>

        {/* Nama */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Nama Tim</label>
          <Input
            placeholder="contoh: Proyek Tugas Akhir"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Deskripsi */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Deskripsi <span className="text-gray-400 font-normal">(opsional)</span></label>
          <Input
            placeholder="Deskripsi singkat tim"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Pilih repository */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Pilih Repository</label>
          <Input
            placeholder="Cari repository..."
            value={repoSearch}
            onChange={(e) => setRepoSearch(e.target.value)}
          />
          {/* Selected repos */}
          {selectedRepos.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedRepos.map((repo) => (
                <Badge key={repo} variant="secondary" className="gap-1 pr-1">
                  <GitBranch className="w-3 h-3" />
                  {repo}
                  <button onClick={() => toggleRepo(repo)} className="ml-0.5 hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          {/* Repo list */}
          {filteredRepos.length > 0 && (
            <div className="border border-gray-100 rounded-xl overflow-hidden mt-1">
              {filteredRepos.map((repo) => (
                <button
                  key={repo}
                  onClick={() => toggleRepo(repo)}
                  className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-green-50 transition-colors border-b border-gray-50 last:border-0"
                >
                  <GitBranch className="w-3.5 h-3.5 text-gray-400" />
                  {repo}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          className="w-full bg-gray-900 hover:bg-[#0f3d23] text-white"
          disabled={!isValid}
          onClick={handleCreate}
        >
          Buat Tim & Generate QR Code
        </Button>
      </div>
    </div>
  );
}