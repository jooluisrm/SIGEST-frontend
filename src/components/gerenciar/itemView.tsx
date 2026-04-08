"use client";

import { useEffect, useState } from "react";
import { detailFetchers } from "@/api/services";
import {
  DetailSection,
  moduleRegistry,
  RelatedSection,
} from "@/config/module-registry";
import { usePageType } from "@/context/pageTypeContext";
import { Alert, AlertTitle } from "../ui/alert";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ItemView = ({ id }: { id: number }) => {
  const { type } = usePageType();
  const [sections, setSections] = useState<DetailSection[]>([]);
  const [relatedSections, setRelatedSections] = useState<RelatedSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (!type) {
        return;
      }

      const registryEntry = moduleRegistry[type];
      const detailPromise = detailFetchers[type](id);
      const relatedPromise = registryEntry.getRelatedSections
        ? registryEntry.getRelatedSections(id)
        : Promise.resolve([]);

      try {
        const [detail, related] = await Promise.all([detailPromise, relatedPromise]);

        if (!active) {
          return;
        }

        setSections(registryEntry.detailSections(detail));
        setRelatedSections(related);
      } catch {
        if (active) {
          setError("Não foi possível carregar os detalhes.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [id, type]);

  if (loading) {
    return <Skeleton className="h-64 w-full" />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{error}</AlertTitle>
      </Alert>
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
