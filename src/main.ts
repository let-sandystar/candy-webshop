import "./assets/scss/style.scss";
import { getAllProducts } from "./services/allproducts"
import { getSingleProduct } from "./services/singleproduct";

const container = document.querySelector<HTMLDivElement>("#product-list");

getAllProducts()
  .then(products => {
    products.data.forEach(product => {

      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img class="card-img-top" src="${product.images[0]}" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary">Köp</button>
          <button class="btn btn-secondary">Mer info</button>
        </div>
      `;

      container?.appendChild(card);
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
