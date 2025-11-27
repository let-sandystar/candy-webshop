import "./assets/scss/style.scss";
import { getAllProducts } from "./services/API"

getAllProducts()
  .then(products => console.log(products))
  .catch(err => console.error(err));