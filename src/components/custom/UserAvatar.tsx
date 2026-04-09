"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string;
  image?: string;
  className?: string;
  glow?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export function UserAvatar({ name = "User", image, className, glow = false, size = "md" }: UserAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8 text-[10px]",
    md: "h-10 w-10 text-xs",
    lg: "h-12 w-12 text-sm",
    xl: "h-16 w-16 text-base",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn("relative group", className)}>
      {glow && (
        <div className="absolute inset-0 bg-indigo-500/30 blur-md rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <Avatar className={cn(sizeClasses[size], "border border-white/10 ring-2 ring-transparent group-hover:ring-indigo-500/20 transition-all duration-300")}>
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold tracking-tighter">
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
