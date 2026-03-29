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
        <Card className="border-zinc-200 shadow-sm">
            <CardHeader>
                <CardTitle>{portfolio ? "Update Portfolio" : "Create Portfolio"}</CardTitle>
                <CardDescription>
                    {portfolio ? "Update your portfolio details below." : "Submit your portfolio to the discovery feed."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Project/Portfolio Name</Label>
                            <Input id="title" name="title" defaultValue={portfolio?.title} required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="url">Portfolio URL</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input id="url" name="url" type="url" placeholder="https://..." className="pl-9" defaultValue={portfolio?.url} required />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="github">GitHub Profile / Repo</Label>
                            <div className="relative">
                                <Github className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input id="github" name="github" type="url" placeholder="https://github.com/..." className="pl-9" defaultValue={portfolio?.github_url} />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="stack">Tech Stack (comma separated)</Label>
                            <Input id="stack" name="stack" placeholder="React, Next.js, Tailwind CSS..." defaultValue={portfolio?.tech_stack?.join(', ')} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Describe your portfolio in a few words..."
                                className="min-h-[100px]"
                                defaultValue={portfolio?.description}
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full sm:w-auto bg-zinc-950 text-white hover:bg-zinc-800">
                        {isPending ? "Saving changes..." : (portfolio ? "Create New / Update" : "Publish Portfolio")}
                    </Button>

                    {isSuccess && (
                        <p className="text-sm mt-3 text-emerald-600 font-medium tracking-tight">Changes saved successfully!</p>
                    )}
                    {isError && (
                        <p className="text-sm mt-3 text-red-600 font-medium tracking-tight">Failed to save changes. Ensure backend is running.</p>
                    )}
                </form>
            </CardContent>
        </Card>
    );
}
