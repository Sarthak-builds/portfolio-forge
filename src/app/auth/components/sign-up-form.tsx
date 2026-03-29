"use client";

import { useState } from "react";
import { useSignUp } from "../../../app/auth/hooks/use-sign-up";
import { Mail, Lock, Loader2, ArrowRight, User } from "lucide-react";
import Link from "next/link";

export function SignUpForm() {
  const { signUp, isLoading, error } = useSignUp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp({ name, email, password, confirmPassword });
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white/50 backdrop-blur-xl border border-zinc-200 rounded-3xl shadow-xl shadow-zinc-200/50">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Create Account</h2>
        <p className="text-sm text-zinc-500 font-medium">Join us to start forging portfolios.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder:text-zinc-400 placeholder:font-normal"
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder:text-zinc-400 placeholder:font-normal"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder:text-zinc-400 placeholder:font-normal"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-zinc-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium placeholder:text-zinc-400 placeholder:font-normal"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl font-semibold transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Sign Up <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm font-medium text-zinc-500">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-indigo-600 hover:text-indigo-500 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
