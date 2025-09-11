"use client";

import { usePageType } from "@/context/pageTypeContext";
import { PageTypeCentral } from "@/types/routerType";
import { useEffect } from "react";

type Props = {
    type: PageTypeCentral;
}

export const SetPageType = ({ type }: Props) => {
  const { setType } = usePageType();

  useEffect(() => {
    setType(type);
  }, [type, setType]);

  return null;
}