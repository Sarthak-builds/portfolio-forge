"use client";

import React, { useState, KeyboardEvent } from "react";
import { X, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export function TagInput({ value = [], onChange, placeholder = "Type and press Enter...", maxTags = 10 }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue) && value.length < maxTags) {
      onChange([...value, trimmedValue]);
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2 p-3 min-h-[48px] bg-muted/30 border border-border rounded-xl focus-within:ring-1 focus-within:ring-accent/50 transition-all">
        {value.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            variant="secondary"
            className="flex items-center gap-1.5 bg-accent/10 border-accent/20 text-accent hover:bg-accent/20 py-1 pl-2.5 pr-1 font-semibold tracking-tight rounded-lg group transition-all"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="p-0.5 rounded-md hover:bg-red-500/10 text-red-500 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground min-w-[120px]"
          disabled={value.length >= maxTags}
        />
      </div>
      
      {value.length >= maxTags ? (
        <p className="text-[10px] text-muted-foreground font-medium">Maximum {maxTags} tags reached.</p>
      ) : (
        <p className="text-[10px] text-muted-foreground font-medium tracking-tight">
          Press <span className="text-foreground/60">Enter</span> or <span className="text-foreground/60">Comma</span> to add a tech stack item.
        </p>
      )}
    </div>
  );
}
