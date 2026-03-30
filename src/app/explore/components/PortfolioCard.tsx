"use client";

import { motion, MotionValue } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Portfolio } from "@/app/explore/lib/types";
import { getHostname } from "@/app/explore/lib/utils";

interface PortfolioCardProps {
    card: Portfolio & { color?: string };
    index: number;
    isTop: boolean;
    x: MotionValue<number>;
    rotate: MotionValue<number>;
    opacity: MotionValue<number>;
    onDragEnd: (event: any, info: any) => void;
}

export function PortfolioCard({ card, index, isTop, x, rotate, opacity, onDragEnd }: PortfolioCardProps) {
    const isUnder = index > 0;

    return (
        <motion.div
            style={isTop ? { x, rotate, opacity, zIndex: 10 - index } : { zIndex: 10 - index }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            dragListener={false} // We will manually attach the drag listener to the header
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: isUnder ? 1 - index * 0.05 : 1, opacity: 1, y: isUnder ? index * 12 : 0 }}
            exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 sm:inset-4 md:inset-8 lg:mx-auto max-w-5xl rounded-t-3xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col shadow-2xl bg-white dark:bg-zinc-950 overflow-hidden transform-gpu pointer-events-auto`}
        >
            {/* Draggable Header */}
            <div 
                className="flex-none p-4 sm:p-6 flex flex-col gap-3 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md z-10 shrink-0 border-b border-zinc-100 dark:border-zinc-800/50 cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => {
                    // Start dragging from the header area
                    if (isTop) {
                        (x as any).start(e);
                    }
                }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border dark:border-zinc-700">
                            <AvatarFallback className="bg-white dark:bg-zinc-800 dark:text-zinc-300 text-xs sm:text-sm">
                                {card.user.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">{card.user.name}</p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold hidden sm:inline-block">Platform</span>
                                <span className="text-xs text-zinc-500 dark:text-zinc-400">{getHostname(card.url)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {card.github_url && (
                            <a
                                href={card.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Github className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 hidden sm:inline-block">Source code</span>
                            </a>
                        )}
                        <a
                            href={card.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 sm:px-3 sm:py-1.5 rounded-full sm:rounded-lg bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors shadow-sm flex items-center gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400 hidden sm:inline-block">View Website</span>
                        </a>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight line-clamp-1 flex-1 pr-4">{card.title}</h3>
                    
                    <div className="flex flex-wrap gap-1 mt-1 shrink-0 justify-end">
                        {(card.tech_stack || []).slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-300 border-none text-[10px] px-1.5 h-5 font-medium whitespace-nowrap">
                                {tag}
                            </Badge>
                        ))}
                        {(card.tech_stack || []).length > 3 && (
                            <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-400 border-none text-[10px] px-1.5 h-5 font-medium whitespace-nowrap">
                                +{(card.tech_stack || []).length - 3}
                            </Badge>
                        )}
                    </div>
                </div>
                
                {/* Drag Hint */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 pointer-events-none opacity-50 block md:hidden" />
            </div>

            {/* Iframe content */}
            <div className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900 relative pointer-events-auto">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-400 animate-spin" />
                </div>
                <iframe 
                    src={card.url} 
                    className="w-full h-full border-0 absolute inset-0 bg-white dark:bg-zinc-950" 
                    title={card.title} 
                    sandbox="allow-scripts allow-same-origin"
                />
            </div>
        </motion.div>
    );
}
