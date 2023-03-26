export interface Ioption {
    id: number;
    option: string;
}

export interface IselectTemplate {
    id: string;
    options: Ioption[];
}

export interface IformSilce {
    formSelectTemplates: IselectTemplate[];
}
