import { Database } from "@/types/supabase";
import { useAuth } from "@clerk/nextjs";
import { createServerClient } from "@supabase/ssr";

const useSupabaseWithAuth = async () => {
  const { getToken } = useAuth();

  const token = await getToken({ template: "supabase" });
  const authToken = token ? { Authorization: `Bearer ${token}` } : null;

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { "Cache-Control": "no-store", ...authToken } },
      cookies: {},
    }
  );
};

export default useSupabaseWithAuth;
