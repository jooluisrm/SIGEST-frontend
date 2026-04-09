import { useStatusQuery } from "@/hooks/queries/status";

export const useApiStatus = () => {
  const { data, isLoading } = useStatusQuery();

  return {
    status: data ?? null,
    loading: isLoading,
  };
};
