import { Database } from "@/types/supabase";
import { createServerClient } from "@supabase/ssr";

export const createSupabaseServerClient = (token: string | null = null) => {
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
