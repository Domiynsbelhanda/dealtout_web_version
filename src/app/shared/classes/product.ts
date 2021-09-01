import { Timestamp } from "firebase/firestore";

// Products
export interface Product {
    id?: string | number;
    article?: string;
    description?: string;
    categorie?: string;
    etat?: string;
    fabricant?: any[];
    key?: string;
    prix?: number;
    telephone?: string;
    timestamp?: Timestamp;
    vendue?: boolean;
    vue?: number;
    image?: string[];
}

export interface ProductId {
    id?: string | number;
}