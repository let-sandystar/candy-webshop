export interface Candy {
    id: number;
    images: ProductImages;
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

export interface CartItem {
    candy: Candy;
    qty: number;
}

export interface orderPayLoad {
    name: string; 
    address: string;
    postnr: number;
    city: string;
    email: string;
    items: CartItem[];
}

export interface orderResponse {
    status: string;
    data: [];
}