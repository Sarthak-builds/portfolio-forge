"use client";

import { useSignIn } from "../../../app/auth/hooks/use-sign-in";
import { useEffect } from "react";
import { useAuthStore } from "../../../app/auth/lib/useAuthstore";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Mail, Lock } from "lucide-react";
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
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function SignInForm() {
  const { signIn, isLoading, error } = useSignIn();
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await signIn(values);
  };

  return (
    <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 shadow-xl bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl rounded-3xl overflow-hidden transition-all">
      <CardHeader className="space-y-1 text-center pb-8 pt-8">
        <CardTitle className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
          Please enter your details to sign in
        </CardDescription>
      </CardHeader>
      <CardContent className="px-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <div className="p-3 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl animate-in fade-in slide-in-from-top-1">
                {error}
              </div>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-zinc-700 dark:text-zinc-300 font-semibold text-xs uppercase tracking-wider">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-950 dark:group-focus-within:text-zinc-50 transition-colors" />
                      <Input 
                        placeholder="name@example.com" 
                        {...field} 
                        disabled={isLoading}
                        className="pl-10 h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 transition-all font-medium"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-zinc-700 dark:text-zinc-300 font-semibold text-xs uppercase tracking-wider">Password</FormLabel>
                  </div>
                  <FormControl>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-950 dark:group-focus-within:text-zinc-50 transition-colors" />
                      <Input 
                        type="password" 
                        placeholder="••••••••"
                        {...field} 
                        disabled={isLoading}
                        className="pl-10 h-12 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-xl focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300 transition-all font-medium"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-2 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Log In <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-500 font-medium tracking-wider">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full h-12 rounded-xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 font-semibold transition-all group"
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'}/api/auth/github`}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="px-8 pb-8 pt-4 flex justify-center border-t border-zinc-100 dark:border-zinc-900 mt-6 mt-0">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-zinc-950 dark:text-zinc-50 hover:underline font-bold transition-colors">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
