export interface Client {
    id?: number;
    name?: string;
    type?: string;
    address?: string;
    email?: string;
    city?: string;
    postalCode?: string;
    creationUser?: string;
    creationDate?: Date;
    editionUser?: string;
    editionDate?: Date;
}