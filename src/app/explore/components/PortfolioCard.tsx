"use client";

import { motion, MotionValue } from "motion/react";
import { ExternalLink, Github, Star, Heart, Bookmark } from "lucide-react";
import { UserAvatar } from "@/components/custom/UserAvatar";
import { StatsBadge } from "@/components/custom/StatsBadge";
import { IframeViewer } from "@/components/custom/IframeViewer";
import { Badge } from "@/components/ui/badge";
import { Portfolio } from "@/app/explore/lib/types";
import { getHostname } from "@/app/explore/lib/utils";
import { useBookmarkStore } from "@/store/useBookmarkStore";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
    const { isBookmarked } = useBookmarkStore();
    const bookmarked = isBookmarked(card.id);

    return (
        <motion.div
            style={isTop ? { x, rotate, opacity, zIndex: 10 - index } : { zIndex: 10 - index }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            dragListener={false}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: isUnder ? 1 - index * 0.05 : 1, opacity: 1, y: isUnder ? index * 12 : 0 }}
            exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "absolute inset-0 sm:inset-4 md:inset-8 lg:mx-auto max-w-5xl rounded-3xl border border-white/5 flex flex-col shadow-2xl bg-[#0a0a0a] overflow-hidden transform-gpu pointer-events-auto",
                !isTop && "pointer-events-none"
            )}
        >
            {/* Draggable Header Info Panel */}
            <div 
                className="flex-none p-6 flex flex-col gap-4 bg-[#0a0a0a] z-10 shrink-0 border-b border-white/5 cursor-grab active:cursor-grabbing group/header"
                onPointerDown={(e) => {
                    if (isTop) {
                        (x as any).start(e);
                    }
                }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <UserAvatar name={card.user?.name} image={card.user?.avatarUrl} size="md" glow={isTop} />
                        <div>
                            <p className="text-sm font-black text-white leading-tight tracking-tight">{card.user?.name || 'User'}</p>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Architect</span>
                                <div className="h-1 w-1 rounded-full bg-zinc-800" />
                                <span className="text-xs text-zinc-500 font-medium">{getHostname(card.url)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <StatsBadge icon={Star} count={card.score || "0.0"} variant="amber" />
                        
                        {bookmarked && (
                            <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                                <Bookmark className="w-4 h-4 text-amber-500 fill-current" />
                            </div>
                        )}

                        <div className="flex items-center gap-2 ml-2">
                            {card.github_url && (
                                <a
                                    href={card.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all active:scale-90"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Github className="h-4 w-4 text-zinc-300" />
                                </a>
                            )}
                            <a
                                href={card.url}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all active:scale-90"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ExternalLink className="h-4 w-4 text-indigo-400" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-between gap-6">
                    <div className="flex-1 space-y-1">
                        <Link href={`/portfolio/${card.id}`} className="block group/title">
                            <h3 className="text-2xl font-black text-white tracking-tighter line-clamp-1 group-hover/title:text-indigo-400 transition-colors">{card.title}</h3>
                        </Link>
                        <p className="text-sm text-zinc-500 font-medium line-clamp-1 max-w-2xl">{card.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 shrink-0">
                        {(card.tech_stack || []).slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-zinc-900 text-zinc-400 border-white/5 text-[10px] px-2 py-0.5 font-bold uppercase tracking-widest">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                
                {/* Visual drag indicator */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-zinc-800 opacity-50 group-hover/header:opacity-100 transition-opacity" />
            </div>

            {/* Iframe content using IframeViewer */}
            <div className="flex-1 w-full bg-black relative pointer-events-auto overflow-hidden">
                <IframeViewer url={card.url} title={card.title} />
            </div>
        </motion.div>
    );
}
