import { useEffect, useState } from "react";
import { updates, type Update } from "@/data/updates";
import { fetchNoticesFromSupabase, hasSupabaseConfig } from "@/lib/supabase";

export function useNotices() {
  const [notices, setNotices] = useState<Update[]>(hasSupabaseConfig() ? [] : updates);
  const [source, setSource] = useState<"local" | "supabase">(
    hasSupabaseConfig() ? "supabase" : "local",
  );
  const [loading, setLoading] = useState(hasSupabaseConfig());

  useEffect(() => {
    let active = true;

    fetchNoticesFromSupabase().then((items) => {
      if (!active) return;
      setNotices(items);
      setSource(hasSupabaseConfig() ? "supabase" : "local");
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { notices, source, loading };
}
