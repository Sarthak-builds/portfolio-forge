"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/useAuthstore";
import { apiClient } from "@/lib/api-client";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AuthSuccessPage() {
  const router = useRouter();
  const { setCredentials } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("auth/me");
        const user = res.data;
        // Token is in cookie, so we just need user info
        setCredentials(user, "cookie-based");
        toast.success("Welcome back!");
        router.push("/dashboard");
      } catch (err: any) {
        console.error("Auth Success Fetch Error:", err);
        router.push("/auth/sign-in?error=fetch_failed");
      }
    };

    fetchUser();
  }, [router, setCredentials]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
        <CheckCircle2 className="w-16 h-16 text-emerald-500 relative z-10 animate-in zoom-in duration-500" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tighter text-white">Authentication Verified</h1>
        <p className="text-zinc-500 font-medium">Synchronizing your profile with the Forge...</p>
      </div>
      <Loader2 className="w-8 h-8 animate-spin text-zinc-800 mt-4" />
    </div>
  );
}
