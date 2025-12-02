import type { orderPayLoad,orderResponse } from "./candy.types";
const POST = import.meta.env.VITE_API_ORDER_URL;

const postOrder = async (orderPayLoad: orderPayLoad):Promise<orderResponse> => {
    try {
        const res = await fetch(`${POST}`), {
            method: "POST",
            headers: { "Content-Type":"application/json" },
            body: JSON.stringify(orderPayLoad)
        }
    }
}