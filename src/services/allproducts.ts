const BASE = import.meta.env.VITE_API_BASE_URL;
const PRODUCTS_URL = `${BASE}api/v2/products`;


export const getAllProducts = async () => {
    if(!PRODUCTS_URL) {
        throw new Error("No api found");
    }

    const res = await fetch(`${PRODUCTS_URL}`);

    if(!res.ok){
        throw new Error(`${res.status} ${res.statusText}`);
    }

    const allProducts = await res.json();

    return allProducts; 
    console.log(`${allProducts}`);
};