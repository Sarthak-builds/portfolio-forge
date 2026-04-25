import { useState } from "react";
import { useAuthStore } from "../lib/useAuthstore";
import { SignUpFormData, signUpSchema } from "../lib/validation";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

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

      const { user, token } = res.data;
      setCredentials(user, token);

      router.push("/dashboard");
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
