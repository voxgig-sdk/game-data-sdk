export interface GetGameById {
    id?: string;
    source?: string;
    url?: string;
}
export interface GetGameByIdListMatch {
    id: string;
}
export interface Popular {
    headerImage?: string;
    id?: string;
    name?: string;
    popularity?: number;
    releaseDate?: string;
}
export interface PopularListMatch {
    headerImage?: string;
    id?: string;
    name?: string;
    popularity?: number;
    releaseDate?: string;
}
