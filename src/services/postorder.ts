import type { orderRequest, OrderResponse } from "./candy.types";
const POST = import.meta.env.VITE_API_ORDER_URL;

export async function postOrder(order: orderRequest) : Promise<OrderResponse> {
    const res = await fetch(`${POST}`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });

    if (!res.ok) {
        throw new Error ("Något gick fel, beställning har ej slutförts!")
    }

    const data: OrderResponse = await res.json();
    return data;
}
