"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../lib/useAuthstore";
import { apiClient } from "@/lib/api-client";
import { Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function AuthSuccessPage() {
  const router = useRouter();
  const { setCredentials } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      try {
        console.log("AuthSuccess: Verifying session...");
        
        // If token is in URL (Google OAuth), use it. 
        // Otherwise try to use existing session (Cookies)
        const headers: Record<string, string> = {};
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await apiClient.get("auth/me", { headers });
        const user = res.data;
        
        // Save the actual token if we have it, otherwise mark as cookie-based
        setCredentials(user, token || "cookie-based");
        
        toast.success(`Welcome back, ${user.name || "Architect"}!`);
        
        // Small delay to show success state
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);

      } catch (err: any) {
        console.error("Auth Success Verification Failed:", err);
        toast.error("Failed to synchronize profile. Please sign in again.");
        router.push("/auth/sign-in?error=verification_failed");
      }
    };

    fetchUser();
  }, [router, setCredentials, mounted]);

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
