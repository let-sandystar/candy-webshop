import type { OrderData } from "./candy.types";
import { cart } from "../main";

export function renderOrderResponse(data: OrderData) {
    const container = document.querySelector<HTMLDivElement>("#order-container")!;
    container!.innerHTML = "";
    container.classList.remove("d-none");
    document.querySelector("#shopping-cart")?.classList.add("d-none"); // dessa funkar inte, glöm inte fixa

    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
    <h2>Tack för din beställning ${data.customer_first_name}!</h2>
    <p><strong>Ordernummer:</strong> ${data.id}</p>
    <p><strong>Datum:</strong> ${data.order_date}</p>
    <p><strong>Leveransadress:</strong> ${data.customer_address}, ${data.customer_postcode}, ${data.customer_city} </p>
    `;

    const list = document.createElement("ul");
        data.items.forEach(item => {
        const product = cart.find(p => p.id === item.product_id);
        const li = document.createElement("li");
        /* li.textContent = `
        Produkt ${item.product_id}
         ${item.qty} st à ${item.item_price} kr (Totalt: ${item.item_total} kr)
         `; */

         if (product) {
          const thumbnail = (product as any).images?.thumbnail ?? "";
          const altText = (product as any).name ?? "";
          li.innerHTML = `
          ${thumbnail ? `<img src="${thumbnail}" alt="${altText}" />` : ""}
          ${item.qty} st à ${item.item_price} kr (Totalt: ${item.item_total} kr)
          `;
         } else {
          li.textContent = `Produkt ${item.product_id}
          ${item.qty} st à ${item.item_price} kr (Totalt: ${item.item_total} kr)`;
         }
        list.appendChild(li);
    });

  const total = document.createElement("p");
  total.innerHTML = `<strong>Totalt:</strong> ${data.order_total} kr`;

  card.appendChild(list);
  card.appendChild(total);
  container.appendChild(card);

}