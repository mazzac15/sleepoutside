import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("tents", dataSource, element);

listing.init();
