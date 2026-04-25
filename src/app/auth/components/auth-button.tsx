"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function AuthButton({ isMinimal = false }: { isMinimal?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-24" />;

  const handleLogout = async () => {
    try {
      await apiClient.get("auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    logout();
    router.push("/");
  };

  if (isAuthenticated && user) {
    return (
      <div className={cn(
        "flex items-center gap-4",
        isMinimal ? "" : "flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto"
      )}>
        {!isMinimal && (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 sm:h-9 sm:w-9 border border-border/50 transition-transform hover:scale-105 shadow-sm">
              <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
              <AvatarFallback className="bg-muted text-foreground font-bold text-[10px]">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm sm:text-xs font-bold leading-none dark:text-white text-black">{user?.name || 'Architect'}</span>
              <span className="text-[10px] sm:text-[9px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Active</span>
            </div>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className={cn(
            "rounded-xl border-border bg-card/50 backdrop-blur-sm hover:bg-muted text-muted-foreground hover:text-foreground font-bold transition-all",
            isMinimal ? "h-9 w-9 p-0 border-none bg-transparent hover:bg-accent/10" : "h-10 sm:h-9 w-full sm:w-auto mt-2 sm:mt-0"
          )}
        >
          <LogOut className={cn("h-4 w-4", isMinimal ? "text-foreground" : "h-3.5 w-3.5")} />
          {!isMinimal && <span className="ml-2 text-[10px] uppercase tracking-widest">Log out</span>}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex items-center gap-3",
      isMinimal ? "" : "flex-col sm:flex-row w-full sm:w-auto"
    )}>
      <Link href="/auth/sign-in" className={isMinimal ? "" : "w-full sm:w-auto"}>
        <Button variant="ghost" size="sm" className={cn(
          "rounded-xl px-4 text-[11px] sm:text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-foreground transition-all",
          isMinimal ? "h-9" : "w-full h-11 sm:h-9"
        )}>
          Login
        </Button>
      </Link>
      <Link href="/auth/sign-up" className={isMinimal ? "" : "w-full sm:w-auto"}>
        <Button size="sm" className={cn(
          "rounded-xl bg-accent text-white hover:bg-accent/90 font-black text-[11px] sm:text-[10px] uppercase tracking-widest shadow-lg shadow-accent/20 transition-all active:scale-95",
          isMinimal ? "h-9 px-4" : "w-full h-11 sm:h-9 px-8"
        )}>
          Join the forge
        </Button>
      </Link>
    </div>
  );
}
