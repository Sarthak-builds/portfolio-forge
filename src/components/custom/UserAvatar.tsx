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

  // Generate a consistent default avatar based on the name
  const defaultAvatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(name)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <div className={cn("relative group", className)}>
      {glow && (
        <div className="absolute inset-0 bg-accent/30 blur-md rounded-full scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      <Avatar className={cn(sizeClasses[size], "border border-border ring-2 ring-transparent group-hover:ring-accent/20 transition-all duration-300")}>
        <AvatarImage src={image || defaultAvatar} alt={name} className="object-cover" />
        <AvatarFallback className="bg-accent text-accent-foreground font-black tracking-tighter">
          {initials}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
