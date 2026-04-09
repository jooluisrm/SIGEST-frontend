import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/api/status/statusServices";
import { queryKeys } from "./query-keys";

export const useStatusQuery = () =>
  useQuery({
    queryKey: queryKeys.status,
    queryFn: getStatus,
    staleTime: 60_000,
  });
