import type { CartItem, OrderData } from "./candy.types";
import { BASE } from "./allproducts";

export function renderOrderResponse(data: OrderData, cart: CartItem[]) {
    const container = document.querySelector<HTMLDivElement>("#order-container")!;
    container!.innerHTML = "";
    container.classList.remove("d-none");
    container.classList.add("order-wrapper");
    document.querySelector("#shopping-cart")?.setAttribute("class", "d-none"); 

    const card = document.createElement("div");
    card.className = "order-card";

    const closeOrderBtn = document.createElement("button");
    closeOrderBtn.className = "btn"
    closeOrderBtn.classList.add("btn-link", "position-absolute", "top-0", "end-0", "m-2");
    closeOrderBtn.setAttribute("id", "close-order");
    closeOrderBtn.setAttribute("aria-label", "close order confirmation button");
    closeOrderBtn.innerHTML = `<i class="fa-solid fa-x"></i>`;

    closeOrderBtn.addEventListener("click", () => {
      container.classList.add("d-none");
      document.querySelector("#shopping-cart")?.classList.remove("d-none");
    })

    card.innerHTML = `
    <h2>Tack för din beställning ${data.customer_first_name}! 🤍</h2>
    <p>Orderbekräftelse skickas även till din mail: ${data.customer_email}.<br>Hoppas godiset smakar och väkommen åter! xoxo CandyQueen</p>
    <p><strong>Ordernummer:</strong> ${data.id}</p>
    <p><strong>Datum:</strong> ${data.order_date}</p>
    <p><strong>Leveransadress:</strong> ${data.customer_address}, ${data.customer_postcode}, ${data.customer_city} </p>
    `;

    const list = document.createElement("ul");
        data.items.forEach(item => {
        const product = cart.find(p => p.id === item.product_id);
        const li = document.createElement("li");
        li.classList.add("order-list");

         if (product) {
          const thumbnail: string = product.candy.images.thumbnail ?? "";
          const altText: string = product.candy.name ?? "";
          li.innerHTML = `
          <img src="${BASE}${thumbnail}" alt="${altText}" class="order-img"/>
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
  card.appendChild(closeOrderBtn);
  container.appendChild(card);

}