"use client";

import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PortfolioCardProps {
    card: any;
    index: number;
    isTop: boolean;
    x: any;
    rotate: any;
    opacity: any;
    onDragEnd?: (event: any, info: any) => void;
}

export function PortfolioCard({ card, index, isTop, x, rotate, opacity, onDragEnd }: PortfolioCardProps) {
    return (
        <motion.div
            key={card.id || index}
            style={{
                x: isTop ? x : 0,
                rotate: isTop ? rotate : 0,
                opacity: isTop ? opacity : 1,
                scale: isTop ? 1 : 1 - index * 0.05,
                zIndex: 100 - index,
                transformOrigin: "bottom",
            }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={isTop ? onDragEnd : undefined}
            className="absolute inset-0 w-full rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-zinc-200 bg-white"
        >
            {/* Visual Region */}
            <div className={`w-full h-[60%] ${card.color} relative overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                <a
                    href={card.url}
                    target="_blank"
                    rel="noreferrer"
                    className="z-10 bg-white/90 hover:bg-white backdrop-blur-sm px-6 py-3 rounded-xl font-mono text-zinc-800 shadow-sm flex items-center gap-2 transition-colors cursor-pointer"
                >
                    {card.url ? new URL(card.url.startsWith('http') ? card.url : `https://${card.url}`).hostname : "Link"}
                    <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                </a>
            </div>

            {/* Details Region */}
            <div className="h-[40%] bg-white p-5 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border border-zinc-100">
                                <AvatarFallback>{(card.title || "P").charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-bold text-lg leading-none text-zinc-900">{card.title || "Untitled Portfolio"}</h3>
                                <p className="text-sm text-zinc-500 mt-1">Creator</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-zinc-600 line-clamp-2 mt-3">{card.description || "No description provided."}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                    {(card.tech_stack || []).map((tech: string, i: number) => (
                        <Badge key={i} variant="secondary" className="bg-zinc-100 text-zinc-600 font-normal hover:bg-zinc-200">{tech}</Badge>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
