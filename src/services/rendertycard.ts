import type { CartItem, OrderData } from "./candy.types";
import { BASE } from "./allproducts";

export function renderOrderResponse(data: OrderData, cart: CartItem[]) {
    const container = document.querySelector<HTMLDivElement>("#order-container")!;
    container!.innerHTML = "";
    container.classList.remove("d-none");
    document.querySelector("#shopping-cart")?.setAttribute("class", "d-none"); 

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

         if (product) {
          const thumbnail: string = product.candy.images.thumbnail ?? "";
          const altText: string = product.candy.name ?? "";
          li.innerHTML = `
          <img src="${BASE}${thumbnail}" alt="${altText}" />
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