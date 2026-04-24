"use client";

import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";

export default function AuthPage() {
  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 scale-90 sm:scale-100">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 border border-white/5 items-center rounded-xl mb-8">
          <TabsTrigger 
            value="login" 
            className="rounded-lg font-bold data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="register"
            className="rounded-lg font-bold data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="mt-0 outline-none">
          <SignInForm />
        </TabsContent>
        
        <TabsContent value="register" className="mt-0 outline-none">
          <SignUpForm />
        </TabsContent>
      </Tabs>

      <p className="mt-8 text-center text-xs text-zinc-600 font-medium leading-relaxed">
        By continuing, you agree to our <Link href="/terms" className="text-zinc-400 hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-zinc-400 hover:underline">Privacy Policy</Link>.
      </p>
    </div>
  );
}
