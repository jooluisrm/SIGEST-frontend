export type ApiLinks = {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
};

export type ApiMetaLink = {
    url: string | null;
    label: string;
    active: boolean;
};

export type ApiMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: ApiMetaLink[];
    path: string;
    per_page: number;
    to: number;
    total: number;
};