import { BASE } from "./allproducts";
import type { SingleProductResponse } from "./candy.types";

export const getSingleProduct = async (id: string | number): Promise<SingleProductResponse> => {
    const PRODUCT_URL = `${BASE}api/v2/products/${id}`;

    const res = await fetch(`${PRODUCT_URL}`);

    if(!res.ok){
        throw new Error(`${res.status}${res.statusText}`)
    }

    const singleProduct = await res.json() as SingleProductResponse;
    return singleProduct; 
}