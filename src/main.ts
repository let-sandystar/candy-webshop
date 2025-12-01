import "./assets/scss/style.scss";
import { getAllProducts } from "./services/allproducts"
import { getSingleProduct } from "./services/singleproduct";
import { BASE } from "./services/allproducts";
import type { Candy, CartItem } from "./services/candy.types";

const container = document.querySelector<HTMLDivElement>("#product-list");
const cartContainer = document.querySelector<HTMLDivElement>("#cart-items");

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
    cartContainer.innerHTML = `
    <p class="text-center text-white">Din varukorg är tom</p>
   `;
    return;
  }

 cart.forEach(item => {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.classList.add("card", "bg-dark", "border-0", "mb-3");

  cartItemDiv.innerHTML = `
    <div class="row g-0">
        <div class="col-3">
          <img src="${BASE}${item.candy.images.thumbnail}" class="img-fluid rounded" alt="${item.candy.name}">
        </div>
        <div class="col-9">
          <div class="card-body">
          <h5 class="card-title">${item.candy.name}</h5>
          <p class="card-text">${item.candy.price} kr</p>
          <div class ="input-group" style="max-width: 120px;">
          <button class ="btn btn-secondary minus-btn" type="button">-</button>
          <input type="text" class="form-control text-center" value="${item.qty}" readonly>
          <button class="btn btn-secondary plus-btn" type="button">+</button>
        </div>
      </div>
    </div>
  </div>
  `;

  const minusBtn = cartItemDiv.querySelector<HTMLButtonElement>(".minus-btn");
  const plusBtn = cartItemDiv.querySelector<HTMLButtonElement>(".plus-btn");
  const qtyInput = cartItemDiv.querySelector<HTMLInputElement>("input");

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
    cartContainer.appendChild(cartItemDiv);
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

