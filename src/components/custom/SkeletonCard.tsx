"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="absolute inset-4 md:inset-8 lg:mx-auto max-w-5xl rounded-3xl border border-white/5 bg-zinc-900 overflow-hidden shadow-2xl flex flex-col">
      {/* Header Skeleton */}
      <div className="p-6 border-b border-white/5 bg-zinc-900/50 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full bg-white/5" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 bg-white/5" />
              <Skeleton className="h-3 w-32 bg-white/5" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-24 rounded-lg bg-white/5" />
            <Skeleton className="h-8 w-24 rounded-lg bg-white/5" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-48 bg-white/5" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-12 rounded-md bg-white/5" />
            <Skeleton className="h-5 w-12 rounded-md bg-white/5" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="flex-1 p-12 flex flex-col items-center justify-center space-y-6 bg-zinc-950">
        <Skeleton className="h-12 w-12 rounded-full bg-white/5 animate-pulse" />
        <div className="space-y-3 w-64">
          <Skeleton className="h-4 w-full bg-white/5" />
          <Skeleton className="h-4 w-[80%] bg-white/5 mx-auto" />
        </div>
      </div>
    </div>
  );
}
