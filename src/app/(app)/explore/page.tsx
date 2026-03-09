"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { X, Heart, MessageSquare, Star, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MOCK_PORTFOLIOS = [
    {
        id: 1,
        name: "Alex Designer",
        role: "UX/UI Designer",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        url: "alexdesign.dev",
        description: "Crafting digital experiences that bridge the gap between aesthetics and functionality.",
        stack: ["Figma", "Framer", "React", "Tailwind"],
        color: "bg-blue-500",
    },
    {
        id: 2,
        name: "Sam Coder",
        role: "Full Stack Developer",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        url: "samcode.io",
        description: "I build fast, accessible, and secure web applications.",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
        color: "bg-emerald-500",
    },
    {
        id: 3,
        name: "Jordan Arrays",
        role: "Creative Developer",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
        url: "arrays.creative",
        description: "WebGL and Three.js enthusiast making the web 3D.",
        stack: ["Three.js", "WebGL", "GSAP", "React Fiber"],
        color: "bg-purple-500",
    }
];

export default function ExplorePage() {
    const [cards, setCards] = useState(MOCK_PORTFOLIOS);
    const [activeTab, setActiveTab] = useState<"swipe" | "comments">("swipe");

    // Motion values for swipe animation (active top card)
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-18, 18]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x > 100) {
            handleSwipe("right");
        } else if (info.offset.x < -100) {
            handleSwipe("left");
        }
    };

    const handleSwipe = (direction: "left" | "right") => {
        // In a real app we'd dispatch a like/skip to the backend here
        setTimeout(() => {
            setCards((prev) => prev.slice(1));
        }, 200);
    };

    const currentCard = cards[0];

    if (cards.length === 0) {
        return (
            <div className="flex h-[calc(100vh-12rem)] flex-col items-center justify-center text-center">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-zinc-900">You're all caught up!</h2>
                <p className="text-zinc-500 max-w-sm mt-2">
                    Check back later for more amazing portfolios to discover and rate.
                </p>
                <Button onClick={() => setCards(MOCK_PORTFOLIOS)} variant="outline" className="mt-6">
                    Reset Feed
                </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center max-w-sm mx-auto w-full pt-4 md:pt-10">
            <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4] max-h-[600px]">
                <AnimatePresence>
                    {cards.map((card, index) => {
                        const isTop = index === 0;
                        return (
                            <motion.div
                                key={card.id}
                                style={{
                                    x: isTop ? x : 0,
                                    rotate: isTop ? rotate : 0,
                                    opacity: isTop ? opacity : 1,
                                    scale: isTop ? 1 : 1 - index * 0.05,
                                    zIndex: cards.length - index,
                                    transformOrigin: "bottom",
                                }}
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                onDragEnd={isTop ? handleDragEnd : undefined}
                                className="absolute inset-0 w-full rounded-3xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-zinc-200 bg-white"
                            >
                                {/* Mock Iframe Region / Visual */}
                                <div className={`w-full h-[60%] ${card.color} relative overflow-hidden flex items-center justify-center`}>
                                    {/* Pattern Overlay */}
                                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-xl font-mono text-zinc-800 shadow-sm flex items-center gap-2">
                                        {card.url} <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                                    </div>
                                </div>

                                {/* Details Region */}
                                <div className="h-[40%] bg-white p-5 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border border-zinc-100">
                                                    <AvatarImage src={card.avatar} />
                                                    <AvatarFallback>{card.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h3 className="font-bold text-lg leading-none text-zinc-900">{card.name}</h3>
                                                    <p className="text-sm text-zinc-500 mt-1">{card.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-zinc-600 line-clamp-2 mt-3">{card.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 mt-auto">
                                        {card.stack.map(tech => (
                                            <Badge key={tech} variant="secondary" className="bg-zinc-100 text-zinc-600 font-normal hover:bg-zinc-200">{tech}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-6 mt-8">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full border-2 border-red-500/20 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-500 transition-all shadow-sm"
                    onClick={() => handleSwipe("left")}
                >
                    <X className="h-6 w-6" />
                </Button>

                <div className="flex flex-col items-center -mt-4 gap-2">
                    {/* Mock Rating */}
                    <div className="flex gap-1.5 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-5 w-5 text-zinc-300 hover:text-amber-400 cursor-pointer transition-colors" />
                        ))}
                    </div>
                    <Button variant="ghost" size="sm" className="text-zinc-500 hover:text-zinc-900 rounded-full h-8 px-3">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment
                    </Button>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    className="h-14 w-14 rounded-full border-2 border-emerald-500/20 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-500 transition-all shadow-sm"
                    onClick={() => handleSwipe("right")}
                >
                    <Heart className="h-6 w-6" />
                </Button>
            </div>
        </div>
    );
}
