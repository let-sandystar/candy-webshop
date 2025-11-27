import "./assets/scss/style.scss";
import { getAllProducts } from "./services/allproducts"

getAllProducts()
  .then(products => console.log(products))
  .catch(err => console.error(err));