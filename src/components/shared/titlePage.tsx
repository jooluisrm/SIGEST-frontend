"use client";

import { MODULES_BY_SLUG } from "@/config/modules";
import { usePageType } from "@/context/pageTypeContext";
import { ButtonBackPage } from "./buttonBackPage";

type Props = {
  title: string;
};

export const TitlePage = ({ title }: Props) => {
  const { type } = usePageType();
  const moduleLabel = type ? MODULES_BY_SLUG[type]?.pluralLabel ?? type : "";

  return (
    <div className="flex items-center justify-start gap-5">
      <ButtonBackPage />
      <h1 className="text-xl sm:text-3xl md:text-4xl py-10">
        {title} <span className="font-bold">{moduleLabel}</span>
      </h1>
    </div>
  );
};
