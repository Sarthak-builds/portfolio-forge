"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInForm } from "./components/sign-in-form";
import { SignUpForm } from "./components/sign-up-form";
import { GlowBackground } from "@/components/custom/GlowBackground";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <GlowBackground />
      
      <div className="w-full max-w-[440px] z-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/" className="flex items-center gap-2.5 group mb-4">
            <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl">
              <span className="text-black font-black text-sm">PF</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">Portfolio Forge</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome to the forge</h1>
          <p className="text-zinc-500 font-medium tracking-tight">Discover, rank, and showcase amazing work.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 border border-white/5 p-1 rounded-xl mb-6">
            <TabsTrigger 
              value="login" 
              className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-black transition-all"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="rounded-lg font-bold data-[state=active]:bg-white data-[state=active]:text-black transition-all"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <SignInForm />
          </TabsContent>
          
          <TabsContent value="register">
            <SignUpForm />
          </TabsContent>
        </Tabs>

        <p className="text-center text-xs text-zinc-600 font-medium px-8 leading-relaxed">
          By continuing, you agree to our <span className="text-zinc-400 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-zinc-400 hover:underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
