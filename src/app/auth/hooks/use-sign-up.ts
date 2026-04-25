import { useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import { SignUpFormData, signUpSchema } from "../lib/validation";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";
import { setCookie } from "@/utils/cookies";
import { useRouter } from "next/navigation";

export function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCredentials } = useAuthStore();
  const router = useRouter();

  const signUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate inputs
      const validatedData = signUpSchema.parse(data);

      // We don't send confirmPassword to backend
      const payload = {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password
      };

      // Perform API call
      const res = await apiClient.post("auth/register", payload);

      const { user, token, redirectUrl } = res.data;

      // Store in Zustand
      setCredentials(user, token);
      // Store in Cookies for Middleware
      setCookie('token', token);

      toast.success("Account forged successfully!");
      router.push(redirectUrl || "/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to sign up";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signUp,
    isLoading,
    error,
  };
}
