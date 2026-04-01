"use client";

import { useState } from "react";
import { Users, Plus, QrCode, ChevronRight, ArrowLeft, GitBranch, Copy, Check, Search, AlertCircle, CheckCircle2, Trash2, ArrowUp, UserMinus, X } from "lucide-react";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { cn } from "@/shared/lib/utils";
import { ROLE_CONFIG, MEMBER_STATUS_CONFIG } from "../constants/config";
import { DUMMY_TEAMS, DUMMY_MEMBERS } from "../constants/dummy-team";
import { Team, TeamMember, TeamRole } from "../types";

const DUMMY_REPOS = ["gitpulse", "ml-service", "portofolio-web", "data-scraper"];
const CURRENT_USER_ID = "1";

type JoinState = "idle" | "not-found" | "already-joined" | "success";
type TabId = "my-teams" | "create" | "join";

const TABS = [
  { id: "my-teams" as TabId, label: "My Teams",   icon: Users  },
  { id: "create"   as TabId, label: "Buat Tim",   icon: Plus   },
  { id: "join"     as TabId, label: "Gabung Tim",  icon: QrCode },
];

function MemberCardMobile({ member, myRole, isMyself = false }: { member: TeamMember; myRole: TeamRole; isMyself?: boolean }) {
  const role       = ROLE_CONFIG[member.role];
  const status     = MEMBER_STATUS_CONFIG[member.memberStatus];
  const canPromote = (myRole === "owner" || myRole === "evaluator") && member.role === "contributor";
  const canKick    = (myRole === "owner" || myRole === "evaluator") && !isMyself && member.role !== "owner";
  const initials   = member.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className={`bg-white border rounded-2xl p-4 ${isMyself ? "border-[#00d964]" : "border-gray-100"}`}>
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="w-9 h-9">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback className="bg-gray-900 text-white text-xs font-bold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-bold text-gray-900 text-sm truncate">{member.name}</p>
            {isMyself && <span className="text-xs text-[#00b853] font-medium">(Kamu)</span>}
          </div>
          <p className="text-xs text-gray-500">@{member.username}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge className={role.className + " border-0 text-[10px] px-1.5 py-0.5"}>{role.icon} {role.label}</Badge>
          <Badge className={status.className + " border-0 text-[10px] px-1.5 py-0.5 gap-1"}>
            <span className={"w-1.5 h-1.5 rounded-full " + status.dot} />{member.memberStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        {[
          { label: "Commit Velocity",    value: member.commitVelocity + "/hari" },
          { label: "Contribution Share", value: (member.contributionShare * 100).toFixed(0) + "%" },
          { label: "Consistency",        value: member.activityConsistency.toFixed(1) + " std" },
          { label: "Active Weeks",       value: (member.activeWeeksRatio * 100).toFixed(0) + "%" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-gray-50 rounded-xl p-2.5">
            <p className="text-[10px] text-gray-400 mb-0.5">{label}</p>
            <p className="text-xs font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-100 rounded-xl px-3 py-2 mb-3">
        <p className="text-xs text-gray-600">
          <span className="text-[#00b853] font-semibold">→ </span>{member.recommendation}
        </p>
      </div>

      {(canPromote || canKick) && (
        <div className="flex gap-2">
          {canPromote && (
            <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs border-blue-200 text-blue-700 hover:bg-blue-50">
              <ArrowUp className="w-3 h-3" />Promote
            </Button>
          )}
          {canKick && (
            <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs border-red-200 text-red-600 hover:bg-red-50">
              <UserMinus className="w-3 h-3" />Kick
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

function TeamDetailMobile({ team, onBack }: { team: Team; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const myRole    = team.myRole;
  const role      = ROLE_CONFIG[myRole];
  const canSeeAll = myRole === "owner" || myRole === "evaluator";
  const members   = canSeeAll ? DUMMY_MEMBERS : DUMMY_MEMBERS.filter((m) => m.id === CURRENT_USER_ID);

  const handleCopy = () => {
    navigator.clipboard.writeText(team.inviteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-5 pt-10 pb-8 rounded-b-3xl">
        <button onClick={onBack} className="flex items-center gap-1.5 text-gray-400 text-sm mb-4">
          <ArrowLeft className="w-4 h-4" />Kembali
        </button>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-white text-xl font-bold mb-1">{team.name}</h1>
            <p className="text-gray-400 text-xs mb-3">{team.description}</p>
            <div className="flex items-center gap-2">
              <Badge className={role.className + " border-0 text-xs"}>{role.icon} {role.label}</Badge>
              <span className="text-gray-500 text-xs">· Dibuat {team.createdAt}</span>
            </div>
          </div>
          {myRole === "owner" && (
            <Button size="sm" variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-500/10 gap-1 flex-shrink-0">
              <Trash2 className="w-3.5 h-3.5" />Hapus
            </Button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mt-5">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-gray-400 text-[10px] mb-0.5">Member</p>
            <p className="text-white font-bold">{team.memberCount}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3 col-span-2">
            <p className="text-gray-400 text-[10px] mb-0.5">Repository</p>
            <div className="flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-gray-400" />
              <p className="text-white text-xs font-bold truncate">{team.repos.join(", ")}</p>
            </div>
          </div>
        </div>

        {canSeeAll && (
          <div className="bg-white/10 rounded-xl p-3 mt-2 flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-[10px] mb-0.5">Invite Code</p>
              <p className="text-white font-mono font-bold text-sm">{team.inviteCode}</p>
            </div>
            <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors">
              {copied ? <Check className="w-4 h-4 text-[#00d964]" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      <div className="px-4 pt-5 pb-6 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900">{canSeeAll ? "Semua Member" : "Data Kamu"}</h3>
        {members.map((member) => (
          <MemberCardMobile
            key={member.id}
            member={member}
            myRole={myRole}
            isMyself={member.id === CURRENT_USER_ID}
          />
        ))}
      </div>
    </div>
  );
}

function MyTeamsMobile({ onSelect }: { onSelect: (team: Team) => void }) {
  return (
    <div className="px-4 pt-5 pb-6 space-y-3">
      {DUMMY_TEAMS.map((team) => {
        const role = ROLE_CONFIG[team.myRole];
        return (
          <div
            key={team.id}
            onClick={() => onSelect(team)}
            className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 active:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-[#00d964]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-bold text-gray-900 text-sm truncate">{team.name}</h3>
                <Badge className={role.className + " border-0 text-[10px] px-1.5 py-0.5"}>{role.icon} {role.label}</Badge>
              </div>
              <p className="text-xs text-gray-500 truncate">{team.description}</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
          </div>
        );
      })}
    </div>
  );
}

function CreateTeamMobile() {
  const [name,         setName]         = useState("");
  const [description,  setDescription]  = useState("");
  const [selectedRepos, setSelectedRepos] = useState<string[]>([]);
  const [repoSearch,   setRepoSearch]   = useState("");
  const [generated,    setGenerated]    = useState(false);
  const [inviteCode,   setInviteCode]   = useState("");
  const [copied,       setCopied]       = useState(false);

  const filteredRepos = DUMMY_REPOS.filter((r) => r.includes(repoSearch.toLowerCase()) && !selectedRepos.includes(r));
  const toggleRepo    = (repo: string) => setSelectedRepos((prev) => prev.includes(repo) ? prev.filter((r) => r !== repo) : [...prev, repo]);
  const isValid       = name.trim() && selectedRepos.length > 0;

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

  if (generated) {
    return (
      <div className="px-4 pt-5 pb-6">
        <div className="bg-white border border-[#00d964] rounded-2xl p-6 text-center">
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <QrCode className="w-7 h-7 text-[#00b853]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Tim Berhasil Dibuat!</h3>
          <p className="text-xs text-gray-500 mb-5">Bagikan invite code kepada anggota tim.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-xs text-gray-400 mb-2">Invite Code</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-bold font-mono text-gray-900 tracking-widest">{inviteCode}</p>
              <button onClick={handleCopy} className="text-gray-400 hover:text-gray-700">
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 mb-5 border-2 border-dashed border-gray-200">
            <QrCode className="w-20 h-20 text-gray-300 mx-auto" />
            <p className="text-xs text-gray-400 mt-2">QR Code akan digenerate di sini</p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => { setGenerated(false); setName(""); setDescription(""); setSelectedRepos([]); }}>
            Buat Tim Baru
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-5 pb-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="font-bold text-gray-900 mb-0.5">Buat Team Space</h3>
          <p className="text-xs text-gray-500">Kamu akan otomatis menjadi <span className="font-semibold text-yellow-600">👑 Owner</span>.</p>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Nama Tim</label>
          <Input placeholder="contoh: Proyek Tugas Akhir" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Deskripsi <span className="text-gray-400 font-normal">(opsional)</span></label>
          <Input placeholder="Deskripsi singkat tim" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Pilih Repository</label>
          <Input placeholder="Cari repository..." value={repoSearch} onChange={(e) => setRepoSearch(e.target.value)} />
          {selectedRepos.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedRepos.map((repo) => (
                <Badge key={repo} variant="secondary" className="gap-1 pr-1">
                  <GitBranch className="w-3 h-3" />{repo}
                  <button onClick={() => toggleRepo(repo)} className="ml-0.5 hover:text-red-500"><X className="w-3 h-3" /></button>
                </Badge>
              ))}
            </div>
          )}
          {filteredRepos.length > 0 && (
            <div className="border border-gray-100 rounded-xl overflow-hidden mt-1">
              {filteredRepos.map((repo) => (
                <button key={repo} onClick={() => toggleRepo(repo)} className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-green-50 transition-colors border-b border-gray-50 last:border-0">
                  <GitBranch className="w-3.5 h-3.5 text-gray-400" />{repo}
                </button>
              ))}
            </div>
          )}
        </div>
        <Button className="w-full bg-gray-900 hover:bg-[#0f3d23] text-white" disabled={!isValid} onClick={handleCreate}>
          Buat Tim & Generate QR Code
        </Button>
      </div>
    </div>
  );
}

function JoinTeamMobile() {
  const [code,  setCode]  = useState("");
  const [state, setState] = useState<JoinState>("idle");

  const handleJoin = () => {
    if (!code.trim()) return;
    if (code === "TA2026-ABC") { setState("already-joined"); return; }
    if (code === "VALID-CODE") { setState("success"); return; }
    setState("not-found");
  };

  return (
    <div className="px-4 pt-5 pb-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="font-bold text-gray-900 mb-0.5">Gabung Team Space</h3>
          <p className="text-xs text-gray-500">Masukkan invite code untuk bergabung sebagai <span className="font-semibold text-green-700">💻 Contributor</span>.</p>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700">Invite Code</label>
          <div className="flex gap-2">
            <Input placeholder="contoh: TA2026-ABC" value={code} onChange={(e) => { setCode(e.target.value); setState("idle"); }} className="font-mono" />
            <Button onClick={handleJoin} disabled={!code.trim()} className="bg-gray-900 hover:bg-[#0f3d23] text-white flex-shrink-0">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {state === "not-found" && (
          <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl p-3">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">Kode tidak valid atau tim tidak ditemukan.</p>
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
            <p className="text-xs text-green-700">Berhasil bergabung! Kamu sekarang menjadi Contributor.</p>
          </div>
        )}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-xs text-gray-400">atau</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
        <Button variant="outline" className="w-full gap-2" disabled>
          <QrCode className="w-4 h-4" />Scan QR Code
          <span className="text-xs text-gray-400 ml-auto">(Coming soon)</span>
        </Button>
        {state !== "idle" && (
          <button onClick={() => { setCode(""); setState("idle"); }} className="text-xs text-gray-400 hover:text-gray-700 w-full text-center">
            Coba kode lain
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400 text-center mt-4">Minta invite code kepada Owner atau Evaluator tim kamu.</p>
    </div>
  );
}

export function TeamLayoutMobile() {
  const [activeTab,    setActiveTab]    = useState<TabId>("my-teams");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  if (selectedTeam) {
    return <TeamDetailMobile team={selectedTeam} onBack={() => setSelectedTeam(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 px-5 pt-10 pb-6 rounded-b-3xl">
        <p className="text-gray-400 text-sm mb-1">Kolaborasi Tim</p>
        <h1 className="text-white text-2xl font-bold mb-5">Team Space</h1>
        <div className="flex gap-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all flex-1 justify-center",
                activeTab === id ? "bg-[#00d964] text-gray-900" : "bg-white/10 text-gray-400"
              )}
            >
              <Icon className="w-3.5 h-3.5" />{label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "my-teams" && <MyTeamsMobile onSelect={setSelectedTeam} />}
      {activeTab === "create"   && <CreateTeamMobile />}
      {activeTab === "join"     && <JoinTeamMobile />}
    </div>
  );
}