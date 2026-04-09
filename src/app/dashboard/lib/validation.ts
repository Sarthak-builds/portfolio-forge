import * as z from "zod";

export const portfolioSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters").max(500),
  tagline: z.string().max(100).optional(),
  url: z.string().url("Please enter a valid URL"),
  github_url: z.string().url("Please enter a valid GitHub URL").regex(/github\.com/, "Must be a GitHub URL").optional().or(z.literal("")),
  preview_url: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  tech_stack: z.array(z.string()).min(1, "Please add at least one tech stack item"),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
