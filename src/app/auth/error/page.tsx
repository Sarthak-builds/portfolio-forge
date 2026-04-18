"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 text-center px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
        <AlertCircle className="w-16 h-16 text-red-500 relative z-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tighter text-white">Forge Connection Failed</h1>
        <p className="text-zinc-500 font-medium max-w-sm">
          {error === "no_code" ? "GitHub didn't return an auth code." : 
           error ? decodeURIComponent(error) : "An unexpected error occurred during authentication."}
        </p>
      </div>
      <Link href="/auth/sign-in">
        <Button className="h-12 px-8 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </Button>
      </Link>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-500">
        Authenticating...
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
