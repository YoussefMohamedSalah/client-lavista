import { authService } from "@/services/auth.service";
import type { AuthOptions, Awaitable, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials)
        const response = await authService.login(
          credentials?.email,
          credentials?.password
        );
        const { access, userInfo, companyInfo } = response;
        if (userInfo) {
          return { ...userInfo, ...companyInfo, access } as unknown as Awaitable<User>;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      const sanitizedToken = Object.keys(token).reduce((p, c) => {
        // strip unnecessary properties
        if (c !== "iat" && c !== "exp" && c !== "jti") {
          return { ...p, [c]: token[c] };
        } else {
          return p;
        }
      }, {});

      return { ...session, user: sanitizedToken };
    },
    async jwt({ token, user }) {
      if (typeof user !== "undefined") {
        // user has just signed in so the user object is populated
        return user as unknown as JWT;
      }

      return token;
    },
  },
  pages: {
    signIn: "/",
  },
};
