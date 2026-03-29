"use client";

import { useAuthStore } from "../lib/useAuthstore";
import Link from "next/link";
import { LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthButton() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-zinc-700">{user.name}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/auth/sign-in"
        className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
      >
        Sign in
      </Link>
      <Link
        href="/auth/sign-up"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 transition-colors"
      >
        Sign up
      </Link>
    </div>
  );
}
