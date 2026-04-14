"use client";

import React, { useState } from "react";
import { Loader2, Globe, RotateCcw, ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface IframeViewerProps {
  url: string | null;
  title?: string;
}

export function IframeViewer({ url, title }: IframeViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col h-full w-full rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-2xl">
      {/* Browser Toolbar / Chrome */}
      <div className="flex items-center gap-4 px-4 py-2 bg-zinc-900/50 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/30" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/30" />
        </div>
        
        <div className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4 text-zinc-600" />
          <ChevronRight className="w-4 h-4 text-zinc-600" />
          <RotateCcw className="w-4 h-4 text-zinc-600" />
        </div>

        <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/5 rounded-md">
          <Globe className="w-3 h-3 text-zinc-500" />
          <span className="text-[11px] text-zinc-400 font-medium truncate max-w-md">
            {(url || "").replace(/https?:\/\//, "") || "No live preview available"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Share2 className="w-4 h-4 text-zinc-500 hover:text-indigo-400 cursor-pointer transition-colors" />
          <a href={url || undefined} target="_blank" rel="noreferrer">
            <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-white cursor-pointer transition-colors" />
          </a>
        </div>
      </div>

      {/* Iframe Container */}
      <div className="flex-1 relative bg-white overflow-hidden">
        {!url ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-center px-4">
            <Globe className="w-12 h-12 text-zinc-800 mb-4 opacity-20" />
            <h3 className="text-zinc-400 font-bold mb-1">No Live Preview</h3>
            <p className="text-xs text-zinc-600 max-w-[200px]">This project hasn't been deployed or the link is private.</p>
          </div>
        ) : (
          <>
            {isLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-zinc-950">
                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
                <div className="space-y-2 w-64">
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-4 w-[80%] bg-white/5" />
                </div>
                <p className="mt-4 text-xs text-zinc-500 font-medium tracking-tight">Initializing secure preview...</p>
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
