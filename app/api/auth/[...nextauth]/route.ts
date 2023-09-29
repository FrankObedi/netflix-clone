import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prismadb from "@/lib/prismadb";

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { PrismaAdapter } from "@next-auth/prisma-adapter";

// catch all handler
const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),

    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "passord",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        // get user by email
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // check if user exists
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        // verify user password
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        // throw error if password is incorrect
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        // return user upon successful login
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/auth",
    error: "/auth"
  },
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export {handler as GET, handler as POST};
