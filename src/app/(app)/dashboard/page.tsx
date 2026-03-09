"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Eye, Star, TrendingUp, Github, Link as LinkIcon } from "lucide-react";

export default function DashboardPage() {
    const { user } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock Form Submit Handler
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            // We would have a toast here usually
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-zinc-950">
                    Welcome back, {user?.firstName || "Creator"}
                </h1>
                <p className="text-zinc-500 mt-2">
                    Manage your portfolio pipeline and view your latest engagement stats.
                </p>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-zinc-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12,234</div>
                        <p className="text-xs text-zinc-500">+19% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Star className="h-4 w-4 text-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.8</div>
                        <p className="text-xs text-zinc-500">Based on 142 reviews</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Global Rank</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">#42</div>
                        <p className="text-xs text-emerald-600 font-medium">▲ +5 this week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Edit Portfolio Section */}
            <Card className="border-zinc-200 shadow-sm">
                <CardHeader>
                    <CardTitle>Portfolio Settings</CardTitle>
                    <CardDescription>
                        Update your portfolio details to stand out in the discovery feed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Project/Portfolio Name</Label>
                                <Input id="title" placeholder="e.g. Jane Doe - Senior Frontend Engineer" defaultValue="My Awesome Portfolio" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="url">Portfolio URL</Label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input id="url" type="url" placeholder="https://..." className="pl-9" defaultValue="https://myportfolio.dev" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="github">GitHub Profile / Repo</Label>
                                <div className="relative">
                                    <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                    <Input id="github" type="url" placeholder="https://github.com/..." className="pl-9" defaultValue="https://github.com/username" />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="stack">Tech Stack (comma separated)</Label>
                                <Input id="stack" placeholder="React, Next.js, Tailwind CSS..." defaultValue="Next.js, TypeScript, Tailwind CSS, Framer Motion" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Short Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your portfolio in a few words..."
                                    className="min-h-[100px]"
                                    defaultValue="A minimalist, performance-focused portfolio showcasing my full-stack web development projects."
                                />
                            </div>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-zinc-950 text-white hover:bg-zinc-800">
                            {isSubmitting ? "Saving changes..." : "Save Portfolio Settings"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
