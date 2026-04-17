"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Github, Globe, Image as ImageIcon, Sparkles, Hash, Trash2 } from "lucide-react";
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
    error: any;
    onDelete?: () => void;
    isDeletePending?: boolean;
}

export function PortfolioForm({ portfolio, onSubmit, onDelete, isPending, isDeletePending, isSuccess, isError, error }: PortfolioFormProps) {
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
        <Card className="bg-card border-border shadow-sm overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-xl">
            <CardHeader className="pb-6 pt-8 px-8">
                <CardTitle className="text-xl font-black tracking-tighter flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    
                </CardTitle>
                <CardDescription className="text-muted-foreground font-medium text-xs">
                    {portfolio 
                        ? "Fine-tune your presentation for the global forge." 
                        : "Initialize your project to start receiving community ratings."
                    }
                </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Portfolio Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="minimal portfolio design v1" {...field} className="bg-muted/30 border-border h-10 rounded-xl focus:ring-accent/50 text-xs focus:border-0 " />
                                        </FormControl>
                                        <FormMessage className="text-[9px] font-bold" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="tagline"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">One-liner</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                                <Input placeholder="The ultimate builder experience" {...field} className="pl-9 bg-muted/30 border-border h-10 rounded-xl focus:ring-accent/50 text-xs focus:border-0" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[9px] font-bold" />
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
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Portfolio Description </FormLabel>
                                        <span className={cn(
                                            "text-[9px] font-black",
                                            (field.value?.length || 0) > 450 ? "text-accent" : "text-muted-foreground"
                                        )}>
                                            {field.value?.length || 0}/500
                                        </span>
                                    </div>
                                    <FormControl>
                                        <Textarea 
                                            placeholder="Deep dive into the architecture, features, and vision..." 
                                            className="min-h-[100px] bg-muted/30 border-border rounded-xl focus:ring-accent/50 resize-none leading-relaxed text-xs  focus:border-0"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[9px] font-bold" />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-6 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Live Website URL</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                                <Input placeholder="https://myapp.com" {...field} className="pl-9 bg-muted/30 border-border h-10 rounded-xl focus:ring-accent/50 text-xs hover:border-0" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[9px] font-bold" />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="github_url"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">GitHub Repository URL</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                                <Input placeholder="https://github.com/user/repo" {...field} className="pl-9 bg-muted/30 border-border h-10 rounded-xl focus:ring-accent/50 text-xs hover:border-0" />
                                            </div>
                                        </FormControl>
                                        <FormMessage className="text-[9px] font-bold" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="preview_url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Preview Screenshot</FormLabel>
                                    <FormControl>
                                        <div className="space-y-4">
                                            <div className="relative">
                                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                                                <Input placeholder="https://res.cloudinary.com/..." {...field} className="pl-9 bg-muted/30 border-border h-10 rounded-xl focus:ring-accent/50 text-xs hover:border-0" />
                                            </div>
                                            
                                            {field.value && (
                                                <div className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden border border-border group">
                                                    <img 
                                                        src={field.value} 
                                                        alt="Preview" 
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <button 
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            field.onChange("");
                                                        }}
                                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-destructive hover:text-white transition-all opacity-0 group-hover:opacity-100"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-[9px] font-bold" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tech_stack"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Technology Stack</FormLabel>
                                    <FormControl>
                                        <TagInput 
                                            value={field.value} 
                                            onChange={field.onChange} 
                                            placeholder="Add tech (e.g. Next.js, Rust)..."
                                        />
                                    </FormControl>
                                    <FormMessage className="text-[9px] " />
                                </FormItem>
                            )}
                        />

                        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center gap-4">
                            <Button 
                                type="submit" 
                                disabled={isPending || isDeletePending} 
                                className="w-full sm:w-auto px-10 h-12 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                            >
                                {isPending ? "Syncing..." : (portfolio ? "Update" : "Forge Entry")}
                            </Button>

                            {portfolio && onDelete && (
                                <Button 
                                    type="button" 
                                    variant="outline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onDelete();
                                    }}
                                    disabled={isPending || isDeletePending} 
                                    className="w-full sm:w-auto px-8 h-12 bg-destructive/5 hover:bg-destructive/10 text-destructive border-destructive/20 font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
                                >
                                    <Trash2 className="w-3 h-3" />
                                    {isDeletePending ? "Deleting..." : "Delete"}
                                </Button>
                            )}
                            
                            {isSuccess && (
                                <div className="flex items-center gap-2 text-emerald-600 animate-in fade-in slide-in-from-left-2">
                                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Published</span>
                                </div>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
