"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
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

  if (!mounted) return <div className="h-9 w-24" />;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-3 md:flex">
          <Avatar className="h-9 w-9 border border-border transition-transform hover:scale-105">
            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
            <AvatarFallback className="bg-muted text-foreground font-bold text-[10px]">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-bold leading-none">{user?.name || 'Architect'}</span>
            <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Active</span>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="h-9 rounded-xl border-border bg-card hover:bg-muted text-muted-foreground hover:text-foreground font-bold transition-all"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="hidden sm:inline ml-2 text-[10px] uppercase tracking-widest">Log out</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/auth/sign-in">
        <Button variant="ghost" size="sm" className="rounded-xl px-4 text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
          Login
        </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button size="sm" className="rounded-xl bg-accent text-white hover:bg-accent/90 font-black text-[10px] uppercase tracking-widest px-6 shadow-lg shadow-accent/20 transition-all active:scale-95">
          Join the forge
        </Button>
      </Link>
    </div>
  );
}
