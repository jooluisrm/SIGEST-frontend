"use client";

import { PageType, usePageType } from "@/context/pageTypeContext";
import { useEffect } from "react";

type Props = {
    type: PageType;
}

export const SetPageType = ({ type }: Props) => {
  const { setType } = usePageType();

  useEffect(() => {
    setType(type);
  }, [type, setType]);

  return null;
}