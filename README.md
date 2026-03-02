# GitPulse

Platform analisis kinerja dan pola kontribusi repository GitHub menggunakan metadata dan Machine Learning.

## 📌 Deskripsi

GitPulse adalah aplikasi web yang membantu evaluator dan tim developer memantau produktivitas, health score, dan pola kontribusi repository GitHub secara otomatis menggunakan Machine Learning.

---

## ✨ Fitur Utama

- 🔐 **GitHub OAuth Login** — autentikasi aman via akun GitHub
- 👥 **Team Space** — buat tim dengan QR Code invite
- 📡 **Analisis Repository** — fetch commit, issue, dan metadata dari GitHub API
- 🤖 **ML Scoring Otomatis** — 3 model ML untuk analisis kinerja tim

---

## 🛠️ Tech Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS + shadcn/ui
- **Auth** — NextAuth.js v5 (GitHub OAuth)
- **Database** — Cloud Firestore (Firebase)
- **ML Service** — Python (FastAPI)
- **Package Manager** — pnpm
- **Icons** — Lucide React

---

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js v20+
- pnpm
- Akun GitHub (untuk OAuth)
- Project Firebase

### Installation

1. Clone repository
```bash
git clone https://github.com/USERNAME/gitpulse.git
cd gitpulse
```

2. Install dependencies
```bash
pnpm install
```

3. Buat file `.env` di root folder
```env
# GitHub OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

4. Jalankan development server
```bash
pnpm dev
```

5. Buka browser di `http://localhost:3000`

---
