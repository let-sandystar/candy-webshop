import "./assets/scss/style.scss";
import { getAllProducts } from "./services/allproducts"
import { getSingleProduct } from "./services/singleproduct";
import { BASE } from "./services/allproducts";

const container = document.querySelector<HTMLDivElement>("#product-list");

getAllProducts()
  .then(products => {
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
        (document.getElementById("popup-title") as HTMLElement).innerText = product.data.name;
      
        const tags = product.data.tags.map(tag => tag.name).join(", ");
        (document.getElementById("popup-description") as HTMLElement).innerText =
          tags || "Ingen information 😕";
      
        (document.getElementById("popup-price") as HTMLElement).innerText =
          product.data.price + " kr";

          const popupImage = document.getElementById("popup-image") as HTMLImageElement;
          popupImage.src = BASE + product.data.images.large;
          popupImage.alt = product.data.name;
      
        document.getElementById("info-popup")?.classList.remove("hidden");
        document.body.classList.add("no-scroll");
      });
    }
  });

  document.getElementById("popup-close")?.addEventListener("click", () => {
    document.getElementById("info-popup")?.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  });

const productOverview = async () => {
  const product = await getSingleProduct(5216);
  console.log(product.data.name, product.data.price);
};

productOverview();

