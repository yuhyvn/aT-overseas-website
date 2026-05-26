import { useEffect, useState } from "react";
import { updates, type Update } from "@/data/updates";
import { fetchNotices, hasCmsConfig } from "@/lib/notices-cms";

export function useNotices() {
  const [notices, setNotices] = useState<Update[]>(updates);
  const [source, setSource] = useState<"local" | "cms">(hasCmsConfig() ? "cms" : "local");

  useEffect(() => {
    let active = true;

    fetchNotices().then((items) => {
      if (!active) return;
      setNotices(items);
      setSource(hasCmsConfig() ? "cms" : "local");
    });

    return () => {
      active = false;
    };
  }, []);

  return { notices, source };
}
