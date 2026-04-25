import { useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import { SignInFormData, signInSchema } from "../lib/validation";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCredentials } = useAuthStore();
  const router = useRouter();

  const signIn = async (data: SignInFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      const validatedData = signInSchema.parse(data);

      // Perform API call
      const res = await apiClient.post("auth/login", validatedData);

      const { user, token, redirectUrl } = res.data;
      setCredentials(user, token);

      toast.success("Welcome back!");
      router.push(redirectUrl || "/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to sign in";
      setError(errorMessage);
      toast.error(errorMessage);

    } finally {
      setIsLoading(false);
    }
  };

  return {
    signIn,
    isLoading,
    error,
  };
}
