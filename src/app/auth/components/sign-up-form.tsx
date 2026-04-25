"use client";

import { useSignUp } from "../../../app/auth/hooks/use-sign-up";
import { useEffect } from "react";
import { useAuthStore } from "../../../app/auth/lib/useAuthstore";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function SignUpForm() {
  const { signUp, isLoading, error } = useSignUp();
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router, hasHydrated]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signUp(values);
  };

  return (
    <div className="w-full transition-all animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
          Create Account
        </h1>
        <p className="text-zinc-400 font-medium text-sm">
          Join us to start forging portfolios that stand out
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="p-4 text-sm font-medium text-red-400 bg-red-900/10 border border-red-900/20 rounded-xl">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">Full Name</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                    <Input 
                      placeholder="John Doe" 
                      {...field} 
                      disabled={isLoading}
                      className="pl-10 h-11 bg-zinc-900/50 border-zinc-800 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all font-medium text-zinc-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">Email Address</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                    <Input 
                      placeholder="name@example.com" 
                      {...field} 
                      disabled={isLoading}
                      className="pl-10 h-11 bg-zinc-900/50 border-zinc-800 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all font-medium text-zinc-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">Password</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      {...field} 
                      disabled={isLoading}
                      className="pl-10 h-11 bg-zinc-900/50 border-zinc-800 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all font-medium text-zinc-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-zinc-400 font-semibold text-xs uppercase tracking-wider">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 group-focus-within:text-emerald-400 transition-colors" />
                    <Input 
                      type="password" 
                      placeholder="••••••••"
                      {...field} 
                      disabled={isLoading}
                      className="pl-10 h-11 bg-zinc-900/50 border-zinc-800 rounded-xl focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all font-medium text-zinc-200"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs font-medium text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98] disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-950 px-2 text-zinc-500 font-medium tracking-wider">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full h-12 rounded-xl border-zinc-800 bg-transparent hover:bg-zinc-900 text-zinc-300 font-semibold transition-all group"
          onClick={() => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
            }}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-3.3 3.28-8.19 3.28-13.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.11c-.22-.67-.35-1.39-.35-2.11s.13-1.44.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.51 6.16-4.51z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center">
        <p className="text-sm font-medium text-zinc-500">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-emerald-400 hover:text-emerald-300 font-bold transition-colors underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
