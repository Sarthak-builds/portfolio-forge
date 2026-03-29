"use client";

import { motion, MotionValue } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Portfolio } from "@/app/explore/lib/types";
import { getHostname } from "@/app/explore/lib/utils";

interface PortfolioCardProps {
    card: Portfolio & { color: string };
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
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isUnder ? 0.9 + index * 0.05 : 1, opacity: 1 - index * 0.15 }}
            exit={{ x: x.get() > 0 ? 500 : -500, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 rounded-3xl border-2 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-xl cursor-grab active:cursor-grabbing transform-gpu ${card.color}`}
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border dark:border-zinc-700">
                            <AvatarFallback className="bg-white dark:bg-zinc-800 dark:text-zinc-300">{card.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{card.user.name}</p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">Published on Forge</p>
                        </div>
                    </div>
                    <a
                        href={card.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-white/50 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                    </a>
                </div>

                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">{card.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-4">{card.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {card.tech_stack.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-white/50 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 border-none">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-700/50">
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">Platform</span>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{getHostname(card.url)}</span>
                </div>
                {card.github_url && (
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">Source</span>
                        <a 
                            href={card.github_url} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Open GitHub
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
