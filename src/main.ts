import "./assets/scss/style.scss";
import { getAllProducts } from "./services/allproducts"
import { getSingleProduct } from "./services/singleproduct";
import { BASE } from "./services/allproducts";
import type { Candy, CartItem } from "./services/candy.types";

const container = document.querySelector<HTMLDivElement>("#product-list");
const cartContainer = document.querySelector<HTMLDivElement>("#cart-items");
const cartTotalEl = document.querySelector<HTMLTableElement>("#cart-total");

let cart: CartItem[] = [];

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved) as CartItem[];
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  }
 
function renderCart() {
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<tr><td colspan="5" class="text-center">Din varukorg är tom</td></tr>`;
    return;
  }

function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.qty * item.candy.price, 0);
  }

  cart.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>
        <img src="${BASE}${item.candy.images.thumbnail}" class="cart-item-img" alt="${item.candy.name}">
        <div class="product-name">${item.candy.name}</div>
      </td>
      <td class="text-center">
        <div class="cart-quantity-wrapper">
          <button class="minus-btn" type="button">-</button>
          <input type="text" class="form-control" value="${item.qty}" readonly>
          <button class="plus-btn" type="button">+</button>
        </div>
      </td>
      <td class="text-center">${item.candy.price} kr</td>
      <td class="text-center">${item.qty * item.candy.price} kr</td>
      <td class="text-center">
      <button class="delete-btn">
      <i class="fa-regular fa-trash-can"></i>
      </button>
      </td>
    `;

    if (cartTotalEl) {
      cartTotalEl.textContent = calculateTotal() + "kr";
    }

    const minusBtn = row.querySelector<HTMLButtonElement>(".minus-btn");
    const plusBtn = row.querySelector<HTMLButtonElement>(".plus-btn");
    
    minusBtn?.addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(i => i.candy.id !== item.candy.id);
      }
      saveCart();
      renderCart();
    });

    plusBtn?.addEventListener("click", () => {
      item.qty++;
      saveCart();
      renderCart();
    });

    const deleteBtn = row.querySelector<HTMLButtonElement>(".delete-btn");
    deleteBtn?.addEventListener("click", () => {
      cart = cart.filter(i => i.candy.id !== item.candy.id);
        saveCart();
        renderCart();
      });

    cartContainer.appendChild(row);
  });
}

function addCart(candy: Candy) {
  const item = cart.find(i => i.candy.id === candy.id);
  if(item) {
    item.qty++;
  } else {
    cart.push({candy, qty: 1});
  }
  saveCart();
  renderCart();
}

 loadCart();
 renderCart();

getAllProducts()
  .then(products => {
    products.data.forEach(product => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img class="card-img-top" src="${BASE}${product.images.thumbnail}" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary">Köp</button>
          <button class="btn btn-secondary">Mer info</button>
        </div>
      `;

      container?.appendChild(card);

      const purchaseButton = card.querySelector<HTMLButtonElement>(".btn-primary");
      purchaseButton?.addEventListener("click", () => {
        addCart(product);
    });
  });
})

  .catch(error => {
    console.error("Kunde inte hämta produkter:", error);
  });

const productOverview = async () => {
  const product = await getSingleProduct(5216);
  console.log(product.data.name, product.data.price);
};

productOverview();

