//Importer
import "./assets/scss/style.scss";
import { getAllProducts } from "./services/allproducts"
import { getSingleProduct } from "./services/singleproduct";
import { BASE } from "./services/allproducts";
import type { Candy, CartItem, orderRequest } from "./services/candy.types";
import { postOrder } from "./services/postorder";
import { Modal, Carousel } from 'bootstrap';
import { renderOrderResponse } from "./services/rendertycard";

//DOM variabler
const container = document.querySelector<HTMLDivElement>("#product-list");
const productModalEl = document.getElementById('productModalEl')!;
const productModal = new Modal(productModalEl);
const cartContainer = document.querySelector<HTMLTableSectionElement>("#cart-items");
const cartTotalEl = document.querySelector<HTMLTableElement>("#cart-total");
const totalTitle = document.querySelector<HTMLTableCellElement>("#total-title");
const checkoutBtn = document.querySelector<HTMLButtonElement>(".checkout-btn");
const form = document.querySelector<HTMLFormElement>("#checkoutForm");
const countProductEl = document.querySelector<HTMLParagraphElement>("#count-product");

const navCartBtn = document.getElementById("nav-cart-btn") as HTMLButtonElement | null;
const cartSection = document.querySelector<HTMLDivElement>(".cart-section");
const checkoutSection = document.querySelector<HTMLDivElement>(".checkout-section");

const cartCounterEl = document.getElementById("cart-counter") as HTMLSpanElement;

const productList = document.getElementById("product-list")
const navLogo = document.querySelector<HTMLImageElement>(".navbar-logo");
const closeCartBtn = document.getElementById("close-cart") as HTMLButtonElement | null;
const closeCheckoutBtn = document.getElementById("close-checkout") as HTMLButtonElement | null;

//Globala variabler
export let cart: CartItem[] = [];

const carouselEl = document.querySelector("#candy-carousel");
if (carouselEl) {
  new Carousel(carouselEl, {
    interval: 6000,
    ride: "carousel"
  });
}


document.querySelectorAll(".search-nav-wrapper form, footer form")
.forEach(form => {
  form.addEventListener("submit", e => e.preventDefault());
});

function updateCartCounter() {
  if (!cartCounterEl) return;
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCounterEl.textContent = totalQty > 0 ? totalQty.toString() : '';

}

function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved) as CartItem[];
  }
}

function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.qty * item.candy.price, 0);
  }

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  }
 
function renderCart() {
  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<tr><td colspan="4" class="text-center">Din varukorg är tom</td></tr>`;
    totalTitle?.classList.add("d-none");
    checkoutBtn?.classList.add("d-none");
    return;
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
          <button class="minus-btn" type="button" aria-label="remove">-</button>
          <input name="number" id="${item.id}" class="form-control" value="${item.qty}" readonly>
          <button class="plus-btn" type="button" aria-label="add">+</button>
        </div>
      </td>
      <td class="text-center">${item.candy.price} kr</td>
      <td class="text-center">${item.qty * item.candy.price} kr</td>
      <td class="text-center">
      <button class="delete-btn" aria-label="delete item button">
      <i class="fa-regular fa-trash-can"></i>
      </button>
      </td>
    `;

    if (cartTotalEl) {
      cartTotalEl.textContent = calculateTotal() + "kr";
      totalTitle?.classList.remove("d-none");
      checkoutBtn?.classList.remove("d-none");
    } 

    const minusBtn = row.querySelector<HTMLButtonElement>(".minus-btn");
    const plusBtn = row.querySelector<HTMLButtonElement>(".plus-btn");
    const deleteBtn = row.querySelector<HTMLButtonElement>(".delete-btn");

     minusBtn?.addEventListener("click", () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart = cart.filter(i => i.candy.id !== item.candy.id);
      }
      saveCart();
      renderCart();
      updateCartCounter();
    });

    plusBtn?.addEventListener("click", () => {
      if (item.qty < item.candy.stock_quantity) {
      item.qty++;
    } else {
    alert("Det finns inte fler på lagret. xoxo CandyQueen!")
  }
      saveCart();
      renderCart();
      updateCartCounter();
    });

    deleteBtn?.addEventListener("click", () => {
      cart = cart.filter(i => i.candy.id !== item.candy.id);
        saveCart();
        renderCart();
        updateCartCounter();
      });

    cartContainer.appendChild(row);
  });
}

function addCart(candy: Candy) {
  const item = cart.find(i => i.candy.id === candy.id);

  if (item) {
    if (item.qty < candy.stock_quantity) {
    item.qty++;
  } else {
    alert("Det finns inte fler på lagret! xoxo CandyQueen");
  }
} else {
  if (candy.stock_quantity > 0) {
    cart.push({candy,
      qty: 1,
      id: candy.id,
      price: candy.price,
    });
  } else {
    alert("Det finns inte fler på lagret. xoxo CandyQueen!")
  }
}
  saveCart();
  renderCart();

  updateCartCounter();

  if (navCartBtn) {
    navCartBtn.classList.add("active");
    setTimeout(() => {
      navCartBtn.classList.remove("active");
    }, 500); 
  }

}

//Close window function
function closeWindow(section: HTMLDivElement | null) {
  section?.classList.remove("open");
  if (window.innerWidth < 768) {
    productList!.style.display = "flex";
  }
}

 loadCart();
 updateCartCounter();
 renderCart();

 //Navbar click
navLogo?.addEventListener("click",() => {
  window.scrollTo({
    top: 0, 
    behavior: "smooth"
  });
});

//Close window
closeCartBtn?.addEventListener("click", () =>
closeWindow(cartSection));
closeCheckoutBtn?.addEventListener("click", () =>
closeWindow(checkoutSection));

// Varukorgs knapp navbar
navCartBtn?.addEventListener("click", () => {
  const isOpen = cartSection?.classList.contains("open");
  if(isOpen) {
    cartSection?.classList.remove("open");
    if (window.innerWidth < 768) {
      productList!.style.display = "flex";
      }
    } else {
      cartSection?.classList.add("open");
      if (window.innerWidth < 768) {
        productList!.style.display = "none";
      }
        checkoutSection?.classList.remove("open");
  }
});
 
checkoutBtn?.addEventListener("click", () => {
  checkoutSection?.classList.add("open");
  if (window.innerWidth < 768) {
    cartSection?.classList.remove("open");
    productList!.style.display = "none";
  }
  checkoutSection?.scrollIntoView({ behavior: "smooth" });
});


getAllProducts()
  .then(products => {
    if (countProductEl) {
      countProductEl.textContent = `Visar ${products.data.length} godis`;
      }
  
    products.data.forEach(product => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img class="card-img-top" src="${BASE}${product.images.thumbnail}" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-price">${product.price} kr</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary">Köp</button>
          <button class="btn btn-secondary more-info-btn" data-id=${product.id}>Mer info</button>
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

  container?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
  
    if (target.classList.contains("more-info-btn")) {
      const id = target.dataset.id;
      if(!id) return;
  
      getSingleProduct(id).then(product => {
      const modalTitle = document.getElementById("productModalLabel") as HTMLElement;
      const descriptionEl = document.getElementById("modal-description") as HTMLElement;
      const modalPrice = document.getElementById("modal-price") as HTMLElement;
      const modalImage = document.getElementById("modal-image") as HTMLImageElement;

      modalTitle.innerText = product.data.name;
      descriptionEl.innerHTML = product.data.description; 
      modalPrice.innerText = product.data.price + " kr";
      modalImage.src = BASE + product.data.images.large;
      modalImage.alt = product.data.name;

      productModal.show();
      });
    }
  });

  document.getElementById("popup-close")?.addEventListener("click", () => {
    document.getElementById("info-popup")?.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

 //kassans logik
form?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const customer_address = (document.querySelector("#customer_address") as HTMLInputElement).value;
    const customer_postcode = (document.querySelector("#customer_postcode") as HTMLInputElement).value;
    const customer_city = (document.querySelector("#customer_city") as HTMLInputElement).value;
    const customer_phone = (document.querySelector("#customer_phone") as HTMLInputElement).value;
    const customer_email = (document.querySelector("#customer_email") as HTMLInputElement).value;
    const customer_first_name = (document.querySelector("#customer_first_name") as HTMLInputElement).value;
    const customer_last_name = (document.querySelector("#customer_last_name") as HTMLInputElement).value;

    const sendOrder: orderRequest = {
        customer_first_name,
        customer_last_name,
        customer_address, 
        customer_postcode,
        customer_city, 
        customer_phone,
        customer_email, 
        order_items: cart.map(item =>({
        product_id: item.id,
        qty: item.qty, 
        item_price: item.price,
        item_total: item.price * item.qty,
      })),
      order_total: calculateTotal()
    };

    try {
      const orderResult = await postOrder(sendOrder);
      renderOrderResponse(orderResult.data, cart);

      const orderContainer = document.getElementById("order-container");

  orderContainer?.addEventListener("click", () => {
  orderContainer.classList.add("d-none");

  cart = []; 
  saveCart();
  renderCart();
  updateCartCounter();

  cartSection?.classList.remove("open");
  checkoutSection?.classList.remove("open");


  if (productList && window.innerWidth < 768) {
    productList.style.display = "flex";
  }
  form?.reset();
});

    } catch (err) {
      alert("Hmm något har kraschat");
      console.error("Det här gick fel", err);
    }
});

