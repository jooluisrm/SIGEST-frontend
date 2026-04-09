import { useIBGEQueries } from "@/hooks/queries/ibge";

export const useIBGE = (selectedStateUF: string | undefined) =>
  useIBGEQueries(selectedStateUF);
