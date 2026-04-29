"use client";

import { useMemo } from "react";
import { moduleRegistry, RelatedSection } from "@/config/module-registry";
import { usePageType } from "@/context/pageTypeContext";
import {
  useManagedModuleDetailQuery,
  useManagedRelatedQuery,
} from "@/hooks/queries/managed-modules";
import { Course } from "@/types/course";
import { Period } from "@/types/period";
import { Alert, AlertTitle } from "../ui/alert";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { CourseDetailsContent } from "./Course-Details-Content";


export const ItemView = ({ id }: { id: number }) => {
  const { type } = usePageType();
  const detailQuery = useManagedModuleDetailQuery(type ?? "aluno", id, !!type);
  const relatedQuery = useManagedRelatedQuery(type ?? "aluno", id, !!type);
  const relatedData = relatedQuery.data as { data: Array<any> } | undefined;

  const sections = useMemo(() => {
    if (!type || !detailQuery.data) {
      return [];
    }

    return moduleRegistry[type].detailSections(detailQuery.data);
  }, [detailQuery.data, type]);

  const relatedSections = useMemo<RelatedSection[]>(() => {
    if (!type || !relatedData) {
      return [];
    }

    if (type === "curso") {
      return relatedData.data.length
        ? [
          {
            title: "Períodos Vinculados",
            entries: relatedData.data.map((period) => ({
              title: period.name,
              description: `ID ${period.id}`,
            })),
          },
        ]
        : [];
    }

    if (type === "periodo") {
      return relatedData.data.length
        ? [
          {
            title: "Turmas Vinculadas",
            entries: relatedData.data.map((classroom) => ({
              title: classroom.name,
              description: `${classroom.shift} · ${classroom.max_students} vagas`,
            })),
          },
        ]
        : [];
    }

    return [];
  }, [relatedData, type]);

  if (detailQuery.isLoading || relatedQuery.isLoading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (detailQuery.isError || relatedQuery.isError) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Não foi possível carregar os detalhes.</AlertTitle>
      </Alert>
    );
  }

  if (type === "curso" && detailQuery.data) {
    return (
      <CourseDetailsContent
        course={detailQuery.data as Course}
        periods={(relatedData?.data ?? []) as Period[]}
      />
    );
  }

  return (
    <div className="grid gap-4">
      {sections.map((section) => (
        <Card key={section.title} className="p-4">
          <h2 className="text-lg font-semibold">{section.title}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {section.items.map((item) => (
              <div key={`${section.title}-${item.label}`} className="grid gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </span>
                <span className="break-words">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}
      {relatedSections.map((section) => (
        <Card key={section.title} className="p-4">
          <h2 className="text-lg font-semibold">{section.title}</h2>
          <div className="mt-4 grid gap-3">
            {section.entries.map((entry) => (
              <div
                key={`${section.title}-${entry.title}`}
                className="rounded-md border border-border p-3"
              >
                <p className="font-medium">{entry.title}</p>
                {entry.description && (
                  <p className="text-sm text-muted-foreground">{entry.description}</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};


