import { useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import { SignInFormData, signInSchema } from "../lib/validation";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";

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
      const res = await apiClient.post("/auth/login", validatedData);

      const { user, token } = res.data;
      setCredentials(user, token);

      router.push("/dashboard");
    } catch (err: any) {
      if (err.name === "ZodError") {
        setError(err.errors[0].message);
      } else {
        setError(err.response?.data?.message || err.message || "Failed to sign in");
      }
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
