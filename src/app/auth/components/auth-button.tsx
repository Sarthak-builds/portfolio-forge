"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthButton() {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-24" />; // Match approximate button area size

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 md:flex">
          <Avatar className="h-9 w-9 border-2 border-border/50 transition-transform hover:scale-105">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
            <AvatarFallback className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-none text-zinc-950 dark:text-zinc-50">{user?.name || user?.email?.split('@')[0] || 'User'}</span>
            <span className="text-[10px] text-zinc-500 font-medium">Verified Creator</span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleLogout}
          className="h-9 gap-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold transition-all"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link href="/auth/sign-in">
        <Button variant="ghost" size="sm" className="rounded-xl px-4 font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50">
          Log in
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button size="sm" className="rounded-xl bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-bold px-5 shadow-sm">
          Join
        </Button>
      </Link>
    </div>
  );
}
