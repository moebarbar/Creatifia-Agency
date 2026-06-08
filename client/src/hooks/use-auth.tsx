import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient, getQueryFn } from "@/lib/queryClient";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: "client" | "staff" | "admin";
  stripeCustomerId: string | null;
  createdAt: string;
}

interface MeResponse {
  user: AuthUser;
}

/** Current session. Returns null when logged out (401). */
export function useAuth() {
  const { data, isLoading } = useQuery<MeResponse | null>({
    queryKey: ["/api/auth/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const user = data?.user ?? null;

  const login = useMutation({
    mutationFn: async (vars: { email: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", vars);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const register = useMutation({
    mutationFn: async (vars: {
      email: string;
      password: string;
      name?: string;
      businessName?: string;
    }) => {
      const res = await apiRequest("POST", "/api/auth/register", vars);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isStaff: user?.role === "staff" || user?.role === "admin",
    login,
    register,
    logout,
  };
}
