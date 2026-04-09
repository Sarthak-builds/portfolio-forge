"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, MessageSquareIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  user: {
    name: string;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
}

interface CommentDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  portfolioId: string;
  comments: Comment[];
  onAddComment: (content: string) => void;
  isSubmitting?: boolean;
}

export function CommentDrawer({
  isOpen,
  onOpenChange,
  portfolioId,
  comments,
  onAddComment,
  isSubmitting = false,
}: CommentDrawerProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md bg-[#0a0a0a] border-white/5 p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-white/5">
          <SheetTitle className="flex items-center gap-2 text-xl font-bold tracking-tight">
            <MessageSquareIcon className="w-5 h-5 text-indigo-500" />
            Comments
          </SheetTitle>
          <SheetDescription className="text-zinc-500 font-medium">
            {comments.length} thoughts from the community
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MessageSquareIcon className="w-10 h-10 text-zinc-800 mb-4" />
                <p className="text-zinc-500 text-sm font-medium">No comments yet. Be the first to share your thoughts!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="w-8 h-8 border border-white/5">
                    <AvatarImage src={comment.user.avatarUrl} />
                    <AvatarFallback className="text-[10px] bg-zinc-900 text-zinc-400 font-bold">
                      {comment.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-zinc-200">{comment.user.name}</p>
                      <p className="text-[10px] text-zinc-600 font-medium">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed bg-zinc-900/50 p-3 rounded-xl border border-white/5">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/5 bg-zinc-950/50">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              placeholder="What do you think of this portfolio?"
              className="min-h-[100px] bg-zinc-900 border-white/10 focus-visible:ring-indigo-500/50 rounded-xl resize-none text-zinc-200"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button
              type="submit"
              disabled={isSubmitting || !newComment.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl h-11 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              {isSubmitting ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Post Comment
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
