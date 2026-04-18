"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in-95 duration-500">
      <div className="w-20 h-20 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-6 relative group">
        <div className="absolute inset-0 bg-accent/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        <Icon className="w-10 h-10 text-muted-foreground group-hover:text-accent transition-colors relative z-10" />
      </div>
      
      <h3 className="text-xl font-bold text-foreground tracking-tight mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground font-medium max-w-sm mb-8 leading-relaxed">
        {description}
      </p>
      
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-accent text-accent-foreground hover:opacity-90 font-black rounded-xl px-10 h-12 shadow-lg shadow-accent/20 active:scale-95 transition-all text-xs uppercase tracking-widest"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
