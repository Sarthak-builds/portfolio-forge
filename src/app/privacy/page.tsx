import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Simple Header for standalone page if needed, but AppShell might cover it */}
      {/* Since AppShell is used for non-landing pages, and this is a non-landing page, 
          it will have the sidebar/header from AppShell. 
          Actually, Privacy/Terms should probably be accessible without being logged in. 
          AppShell handles this. */}
      
      <main className="container mx-auto px-6 py-12 md:py-24 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>

        <div className="space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter">Privacy Policy</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Privacy Policy for Portfolio Forge</h2>
            
            <div className="space-y-6 text-muted-foreground font-medium leading-relaxed">
              <p>
                We collect your email and profile information via Google OAuth solely for authentication purposes.
              </p>
              
              <p>
                We do not share your data with third parties.
              </p>

              <div className="pt-8 border-t border-border">
                <p className="text-foreground font-bold uppercase tracking-widest text-xs">Contact</p>
                <p className="mt-2">
                  <a href="mailto:sarthakshiroty20@gmail.com" className="text-accent hover:underline">
                    sarthakshiroty20@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
