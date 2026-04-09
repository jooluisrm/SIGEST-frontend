"use client";

import { Button } from "@/components/ui/button";
import { ApiMeta, ApiMetaLink } from "@/types/api";

type Props = {
  meta: ApiMeta;
  onPageChange: (url: string) => void;
};

const normalizeLabel = (label: string) =>
  label
    .replace(/&laquo;|&#171;/gi, "«")
    .replace(/&raquo;|&#187;/gi, "»")
    .replace(/&hellip;|&#8230;/gi, "...")
    .replace(/&nbsp;/gi, " ")
    .trim();

const isPreviousLink = (label: string) => {
  const normalized = normalizeLabel(label).toLowerCase();
  return normalized.includes("anterior") || normalized.includes("previous");
};

const isNextLink = (label: string) => {
  const normalized = normalizeLabel(label).toLowerCase();
  return normalized.includes("próximo") || normalized.includes("proximo") || normalized.includes("next");
};

const isEllipsisLink = (label: string) => normalizeLabel(label) === "...";

const isPageNumberLink = (link: ApiMetaLink) => {
  const normalized = normalizeLabel(link.label);
  return typeof link.page === "number" || /^\d+$/.test(normalized);
};

const renderPageLabel = (link: ApiMetaLink) => {
  const normalized = normalizeLabel(link.label);
  return /^\d+$/.test(normalized) ? normalized : String(link.page ?? normalized);
};

export const PaginationTable = ({ meta, onPageChange }: Props) => {
  if (!meta?.links?.length || meta.last_page <= 1) {
    return null;
  }

  const previousLink = meta.links.find((link) => isPreviousLink(link.label));
  const nextLink = meta.links.find((link) => isNextLink(link.label));
  const pageLinks = meta.links.filter(
    (link) =>
      !isPreviousLink(link.label) &&
      !isNextLink(link.label) &&
      (isPageNumberLink(link) || isEllipsisLink(link.label))
  );

  const handlePageChange = (link: ApiMetaLink) => {
    if (!link.url) {
      return;
    }

    onPageChange(link.url);
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 border-t pt-6">
      <div className="text-sm text-muted-foreground">
        Página {meta.current_page} de {meta.last_page}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {previousLink && (
          <Button
            type="button"
            variant="outline"
            onClick={() => handlePageChange(previousLink)}
            disabled={!previousLink.url}
          >
            Anterior
          </Button>
        )}

        {pageLinks.map((link, index) => {
          if (isEllipsisLink(link.label)) {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-sm text-muted-foreground"
              >
                ...
              </span>
            );
          }

          return (
            <Button
              key={`${renderPageLabel(link)}-${link.page ?? index}`}
              type="button"
              variant={link.active ? "default" : "outline"}
              onClick={() => handlePageChange(link)}
              disabled={!link.url}
              className="min-w-10"
            >
              {renderPageLabel(link)}
            </Button>
          );
        })}

        {nextLink && (
          <Button
            type="button"
            variant="outline"
            onClick={() => handlePageChange(nextLink)}
            disabled={!nextLink.url}
          >
            Próximo
          </Button>
        )}
      </div>
    </div>
  );
};
