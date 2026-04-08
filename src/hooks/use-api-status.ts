import { useEffect, useState } from "react";
import { getApiStatus } from "@/api/status/statusServices";
import { ApiStatus } from "@/types/status";

export const useApiStatus = () => {
  const [status, setStatus] = useState<ApiStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadStatus = async () => {
      try {
        const response = await getApiStatus();
        if (active) {
          setStatus(response);
        }
      } catch {
        if (active) {
          setStatus(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadStatus();

    return () => {
      active = false;
    };
  }, []);

  return { status, loading };
};
