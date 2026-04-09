"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Github, Globe, Image as ImageIcon, Sparkles, Hash } from "lucide-react";
import { TagInput } from "@/components/custom/TagInput";
import { portfolioSchema, PortfolioFormData } from "../lib/validation";
import { DashboardPortfolio } from "../lib/types";
import { cn } from "@/lib/utils";

interface PortfolioFormProps {
    portfolio: DashboardPortfolio | null;
    onSubmit: (data: PortfolioFormData) => void;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export function PortfolioForm({ portfolio, onSubmit, isPending, isSuccess, isError }: PortfolioFormProps) {
    const form = useForm<PortfolioFormData>({
        resolver: zodResolver(portfolioSchema),
        defaultValues: {
            title: "",
            description: "",
            tagline: "",
            url: "",
            github_url: "",
            preview_url: "",
            tech_stack: [],
        },
    });

    useEffect(() => {
        if (portfolio) {
            form.reset({
                title: portfolio.title,
                description: portfolio.description || "",
                tagline: portfolio.tagline || "",
                url: portfolio.url,
                github_url: portfolio.github_url || "",
                preview_url: portfolio.preview_url || "",
                tech_stack: portfolio.tech_stack || [],
            });
        }
    }, [portfolio, form]);

    return (
        <Card className="bg-zinc-900 border-white/5 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
            <CardHeader className="pb-8 pt-10">
                <CardTitle className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    {portfolio ? "Polish Your Craft" : "Forge Your Portfolio"}
                </CardTitle>
                <CardDescription className="text-zinc-500 font-medium tracking-tight">
                    {portfolio 
                        ? "Fine-tune your presentation to climb the global leaderboard." 
                        : "Initialize your project in the forge to start receiving community ratings."
                    }
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Modern SaaS Platform" {...field} className="bg-black/40 border-white/5 h-12 rounded-xl focus:ring-indigo-500/50" />
                                        </FormControl>
                                        <FormMessage className="text-[10px] font-bold" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tagline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">One-liner</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                                                <Input placeholder="The ultimate builder experience" {...field} className="pl-9 bg-black/40 border-white/5 h-12 rounded-xl focus:ring-indigo-500/50" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] font-bold" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between">
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Project Description</FormLabel>
                                        <span className={cn(
                                            "text-[10px] font-bold",
                                            (field.value?.length || 0) > 450 ? "text-amber-500" : "text-zinc-600"
                                        )}>
                                            {field.value?.length || 0}/500
                                        </span>
                                    </div>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Deep dive into the architecture, features, and vision..." 
                                            className="min-h-[120px] bg-black/40 border-white/5 rounded-xl focus:ring-indigo-500/50 resize-none leading-relaxed text-zinc-300"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormDescription className="text-[10px] text-zinc-600 font-medium">Be descriptive. Rich metadata helps you rank higher.</FormDescription>
                                    <FormMessage className="text-[10px] font-bold" />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Live Website</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                                                <Input placeholder="https://myapp.com" {...field} className="pl-9 bg-black/40 border-white/5 h-12 rounded-xl focus:ring-indigo-500/50" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] font-bold" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="github_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">GitHub Repository</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                                                <Input placeholder="https://github.com/user/repo" {...field} className="pl-9 bg-black/40 border-white/5 h-12 rounded-xl focus:ring-indigo-500/50" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[10px] font-bold" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="preview_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Preview Screenshot URL</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600" />
                                            <Input placeholder="https://res.cloudinary.com/..." {...field} className="pl-9 bg-black/40 border-white/5 h-12 rounded-xl focus:ring-indigo-500/50" />
                                        </div>
                                    </FormControl>
                                    <FormDescription className="text-[10px] text-zinc-600 font-medium">Optional OG image or project screenshot.</FormDescription>
                                    <FormMessage className="text-[10px] font-bold" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tech_stack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-zinc-400">Technology Stack</FormLabel>
                                    <FormControl>
                                        <TagInput 
                                            value={field.value} 
                                            onChange={field.onChange} 
                                            placeholder="Add tech (e.g. Next.js, Rust)..."
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[10px] font-bold" />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                            <Button 
                                type="submit" 
                                disabled={isPending} 
                                className="w-full sm:w-auto px-10 h-14 bg-white text-black hover:bg-zinc-200 font-black text-sm rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
                            >
                                {isPending ? "Syncing with Database..." : (portfolio ? "Update Entry" : "Forging Portfolio")}
                            </Button>
                            
                            {isSuccess && (
                                <div className="flex items-center gap-2 text-emerald-400 animate-in fade-in slide-in-from-left-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Changes published successfully</span>
                                </div>
                            )}
                            
                            {isError && (
                                <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Operation failed. Retrying sync...</p>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
