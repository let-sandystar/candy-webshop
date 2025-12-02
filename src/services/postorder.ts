import type { orderPayLoad,orderResponse } from "./candy.types";
const POST = import.meta.env.VITE_API_ORDER_URL;

export const postOrder = async (orderPayLoad: orderPayLoad):Promise<orderResponse> => {
    try {
        const res = await fetch(`${POST}`, {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(orderPayLoad)
        });
        
        if(!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        return await res.json() as orderResponse;
    } catch(err) {
        console.error("Fel vid order", err);
        throw err;
    }
};