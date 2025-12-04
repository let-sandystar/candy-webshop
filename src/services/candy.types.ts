export interface Candy {
    id: number;
    images: ProductImages;
    name: string;
    description: string;
    on_sale: boolean;
    price: number;
    stock_quantity: number;
    stock_status: string;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
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
    id: number;
    price: number;
    /* total: number; */
}

export interface formData {
    name: string; 
    address: string;
    postnr: number;
    city: string;
    phone: string;
    email: string;
}

export interface orderItem {
    product_id: number;
    qty: number;
    item_price: number;
    item_total: number;
}

export interface orderRequest extends CustomerInfo{
    order_items: orderItem[];
    order_total: number;
}

export interface orderResponse {
    //status: string;
    //data: [];
    order_id: number; 
    message: string;
}

export interface CustomerInfo {
    customer_first_name: string;
    customer_last_name: string; 
    customer_address: string; 
    customer_postcode: string; 
    customer_city: string;
    customer_phone: string; 
    customer_email: string; 
}

