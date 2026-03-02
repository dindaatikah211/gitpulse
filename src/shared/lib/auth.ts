import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      clientId:     process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      const uid = profile?.id?.toString();
      if (!uid) return false;

      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);

      // Simpan user ke Firestore hanya jika belum ada
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid,
          name:      user.name,
          email:     user.email,
          avatar:    user.image,
          username:  profile?.login,
          createdAt: serverTimestamp(),
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id       = token.sub;
        session.user.username = token.username as string;
      }
      return session;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.sub      = profile.id?.toString();
        token.username = profile.login;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});