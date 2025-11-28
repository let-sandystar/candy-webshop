import "./assets/scss/style.scss";
<<<<<<< HEAD
=======
import { getAllProducts } from "./services/allproducts"
import { getSingleProduct } from "./services/singleproduct";
>>>>>>> dev

const container = document.querySelector<HTMLDivElement>("#product-list");


const products = [
  {
    image: "bild1.jpg",
    title: "Produkt 1",
    description: "Beskrivning 1"
  },
];

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img class="card-img-top" src="${product.image}" alt="${product.title}">
    <div class="card-body">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">${product.description}</p>
    </div>
    <div class="card-footer">
      <button class="btn btn-primary">Köp</button>
      <button class="btn btn-secondary">Mer info</button>
    </div>
  `;

  container?.appendChild(card);
<<<<<<< HEAD
});
=======
});

const productOverview = async () => {
  const product = await getSingleProduct(5216);
  console.log(product.data.name, product.data.price);
};

productOverview();
>>>>>>> dev
