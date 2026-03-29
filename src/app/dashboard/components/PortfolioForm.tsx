"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Link as LinkIcon } from "lucide-react";

import { DashboardPortfolio } from "@/app/dashboard/lib/types";

interface PortfolioFormProps {
    portfolio: DashboardPortfolio | null;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export function PortfolioForm({ portfolio, onSubmit, isPending, isSuccess, isError }: PortfolioFormProps) {
    return (
        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
            <CardHeader>
                <CardTitle className="dark:text-zinc-50">{portfolio ? "Update Portfolio" : "Create Portfolio"}</CardTitle>
                <CardDescription className="dark:text-zinc-400">
                    {portfolio ? "Update your portfolio details below." : "Submit your portfolio to the discovery feed."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="dark:text-zinc-300">Project/Portfolio Name</Label>
                            <Input id="title" name="title" defaultValue={portfolio?.title} required className="dark:bg-zinc-900 dark:border-zinc-800" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="url" className="dark:text-zinc-300">Portfolio URL</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input id="url" name="url" type="url" placeholder="https://..." className="pl-9 dark:bg-zinc-900 dark:border-zinc-800" defaultValue={portfolio?.url} required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="github" className="dark:text-zinc-300">GitHub Profile / Repo</Label>
                            <div className="relative">
                                <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input id="github" name="github" type="url" placeholder="https://github.com/..." className="pl-9 dark:bg-zinc-900 dark:border-zinc-800" defaultValue={portfolio?.github_url} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stack" className="dark:text-zinc-300">Tech Stack (comma separated)</Label>
                            <Input id="stack" name="stack" placeholder="React, Next.js, Tailwind CSS..." className="dark:bg-zinc-900 dark:border-zinc-800" defaultValue={portfolio?.tech_stack?.join(', ')} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description" className="dark:text-zinc-300">Short Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe your portfolio in a few words..."
                                className="min-h-[100px] dark:bg-zinc-900 dark:border-zinc-800"
                                defaultValue={portfolio?.description}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all">
                        {isPending ? "Saving changes..." : (portfolio ? "Create New / Update" : "Publish Portfolio")}
                    </Button>

                    {isSuccess && (
                        <p className="text-sm mt-3 text-emerald-600 dark:text-emerald-400 font-medium tracking-tight">Changes saved successfully!</p>
                    )}
                    {isError && (
                        <p className="text-sm mt-3 text-red-600 dark:text-red-400 font-medium tracking-tight">Failed to save changes. Ensure backend is running.</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
