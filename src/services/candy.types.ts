interface candies {
    id: number;
    images: string;
    name: string;
    on_sale: boolean;
    price: number;
    stock_quantity: number;
    stock_status: string;
}

export interface everyProduct {
    status: string;
    data: candies[];
}