import type { OrderData } from "./candy.types";

export function renderOrderResponse(data: OrderData) {
    const container = document.querySelector<HTMLDivElement>("#order-container")!;
    container!.innerHTML = "";
    container.classList.remove("d-none");

    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
    <h2>Tack för din beställning ${data.customer_first_name}!</h2>
    <p><strong>Ordernummer:</strong> ${data.id}</p>
    <p><strong>Datum:</strong> ${data.order_date}</p>
    <p><strong>Leveransadress:</strong> ${data.customer_address}</p>
    `;

    const list = document.createElement("ul");
        data.items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `
        Produkt ${item.product_id}
         ${item.qty} st à ${item.item_price} kr (Totalt: ${item.item_total} kr)
         `;
        list.appendChild(li);
    });

  const total = document.createElement("p");
  total.innerHTML = `<strong>Total:</strong> ${data.order_total} kr`;

  card.appendChild(list);
  card.appendChild(total);
  container.appendChild(card);

}