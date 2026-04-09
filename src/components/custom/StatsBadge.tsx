"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsBadgeProps {
  icon: LucideIcon;
  count: number | string;
  label?: string;
  className?: string;
  iconClassName?: string;
  variant?: "default" | "indigo" | "emerald" | "amber";
}

export function StatsBadge({ 
  icon: Icon, 
  count, 
  label, 
  className, 
  iconClassName,
  variant = "default" 
}: StatsBadgeProps) {
  const variants = {
    default: "bg-zinc-900 border-white/5 text-zinc-400 hover:text-zinc-200",
    indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold tracking-tight transition-all",
      variants[variant],
      className
    )}>
      <Icon className={cn("w-3.5 h-3.5", iconClassName)} />
      <span>{count}</span>
      {label && <span className="ml-0.5 opacity-60 font-medium">{label}</span>}
    </div>
  );
}
