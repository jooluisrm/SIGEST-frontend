// src/components/PaginationTable.tsx

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { ApiMeta, ApiMetaLink } from "@/types/getRequestType";

type Props = {
    meta: ApiMeta;
    onPageChange: (url: string) => void;
}

export const PaginationTable = ({ meta, onPageChange  }: Props) => {
    // Retorna null se não houver meta ou links para evitar erros
    if (!meta || !meta.links) {
        return null;
    }

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: ApiMetaLink) => {
        // Se não houver URL, não faz nada
        if (!link.url) {
            e.preventDefault();
            return;
        }
        // Previne a navegação padrão do navegador
        e.preventDefault(); 
        // Chama a função que recebemos por props com a nova URL
        onPageChange(link.url);
    };

    return (
        <Pagination>
            <PaginationContent>
                {meta.links.map((link, index) => {
                    // Verifica se é o botão "Previous" (case-insensitive)
                    if (link.label.toLowerCase().includes('previous')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationPrevious 
                                    href={link.url ?? '#'} 
                                    aria-disabled={!link.url}
                                    tabIndex={!link.url ? -1 : undefined}
                                    className={!link.url ? "pointer-events-none opacity-50" : undefined}
                                    onClick={(e) => handleLinkClick(e, link)}
                                />
                            </PaginationItem>
                        );
                    }

                    // Verifica se é o botão "Next" (case-insensitive)
                    if (link.label.toLowerCase().includes('next')) {
                        return (
                            <PaginationItem key={index}>
                                <PaginationNext 
                                    href={link.url ?? '#'}
                                    aria-disabled={!link.url}
                                    tabIndex={!link.url ? -1 : undefined}
                                    className={!link.url ? "pointer-events-none opacity-50" : undefined}
                                    onClick={(e) => handleLinkClick(e, link)} 
                                />
                            </PaginationItem>
                        );
                    }

                    if (link.label === '...') {
                        return (
                            <PaginationItem key={index}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        );
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink 
                                href={link.url ?? '#'} 
                                isActive={link.active}
                                onClick={(e) => handleLinkClick(e, link)} 
                            >
                                {link.label}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
            </PaginationContent>
        </Pagination>
    );
}