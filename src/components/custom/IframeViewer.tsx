"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Globe, RotateCcw, ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface IframeViewerProps {
  url: string | null;
  title?: string;
  simple?: boolean;
}

export function IframeViewer({ url, title, simple = false }: IframeViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={cn("flex flex-col h-full w-full overflow-hidden", !simple && "rounded-xl border border-border bg-card shadow-2xl")}>
      {/* Browser Toolbar / Chrome */}
      {!simple && (
        <div className="flex items-center gap-4 px-4 py-2 bg-muted/30 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
          </div>
          
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4 text-muted-foreground/50" />
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            <RotateCcw className="w-4 h-4 text-muted-foreground/50" />
          </div>

          <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-background/50 border border-border rounded-md">
            <Globe className="w-3 h-3 text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground font-medium truncate max-w-md">
              {(url || "").replace(/https?:\/\//, "") || "No live preview available"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Share2 className="w-4 h-4 text-muted-foreground hover:text-accent cursor-pointer transition-colors" />
            <a href={url || undefined} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      )}

      {/* Iframe Container */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {!url ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background text-center px-4">
            <Globe className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
            <h3 className="text-foreground font-bold mb-1">No Live Preview</h3>
            <p className="text-xs text-muted-foreground max-w-[200px]">This project hasn't been deployed or the link is private.</p>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 text-accent animate-spin mb-4" />
                <div className="space-y-2 w-64">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground font-medium tracking-tight">Initializing secure preview...</p>
              </div>
            )}
            
            <iframe
              src={url}
              title={title || "Portfolio Preview"}
              className="w-full h-full border-none bg-white"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </>
        )}
      </div>
    </div>
  );
}
