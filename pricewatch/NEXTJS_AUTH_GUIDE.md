# PriceWatch AI - Next.js 14 Secure Authentication Implementation Guide

This guide provides the complete setup for a secure login system using Next.js 14 (App Router), NextAuth.js, Prisma, and PostgreSQL.

## 1. Project Setup & Dependencies

First, initialize a new Next.js project or update your existing one.

```bash
npx create-next-app@latest pricewatch-next --typescript --tailwind --eslint
cd pricewatch-next
npm install next-auth @prisma/client bcryptjs react-hook-form zod font-awesome framer-motion lucide-react clsx tailwind-merge
npm install -D prisma @types/bcryptjs
npx prisma init
```

## 2. Environment Variables (.env)

Create a `.env` file in the root directory:

```env
# Database connection string (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/pricewatch?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secure-random-secret-key-at-least-32-chars"
```

## 3. Database Schema (prisma/schema.prisma)

Define your User model and Auth tables.

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  name      String?
  email     String   @unique
  password  String   // Hashed password
  role      String   @default("user") // admin, user, etc.
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Run migration:
```bash
npx prisma migrate dev --name init
```

## 4. Prisma Client Singleton (lib/prisma.ts)

Prevent multiple Prisma instances in development.

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## 5. NextAuth Configuration (app/api/auth/[...nextauth]/route.ts)

Configure credentials provider with bcrypt hashing.

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

## 6. Type Definitions (types/next-auth.d.ts)

Extend the default session types.

```typescript
// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    role: string
  }
  interface Session {
    user: User & {
      role: string
    }
  }
}
```

## 7. Login Page (app/login/page.tsx)

The secure, styled login UI.

```typescript
// app/login/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Navbar (Simplified for Login Page) */}
      <nav className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#020617]" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">PriceWatch<span className="text-teal-400">.AI</span></span>
        </div>
      </nav>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 relative z-10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-teal-500/30">
            <Sparkles className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input
                type="email"
                required
                className="w-full bg-[#0f172a]/50 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-teal-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full bg-[#0f172a]/50 border border-slate-700 rounded-xl py-3 pl-10 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 text-[#020617] font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] disabled:opacity-70 disabled:cursor-wait"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Authenticating...
              </>
            ) : (
              <>
                Sign In <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
```

## 8. Middleware Protection (middleware.ts)

Protect your routes.

```typescript
// middleware.ts
export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*"] }
```

## 9. Protected Dashboard (app/dashboard/page.tsx)

Example of accessing the session.

```typescript
// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome back, {session.user?.name}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  )
}
```
