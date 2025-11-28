export interface Candy {
    id: number;
    images: string;
    name: string;
    on_sale: boolean;
    price: number;
    stock_quantity: number;
    stock_status: string;
}

export interface ProductImages {
    thumbnail: string;
    large: string;
}

export interface everyProduct {
    status: string;
    data: Candy[];
}

export interface SingleProductResponse {
    status: string;
    data: Candy;
}