import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

loadHeaderFooter();

const category = getParams("category");

// Get the h2 title from the html
const h2Element = document.querySelector(".products h2");
//add the Category dinamically and add uppercase
h2Element.textContent = `Top Products ${category.charAt(0).toUpperCase() + category.slice(1)}`;

// first create an instance of our ExternalServices class.
const dataSource = new ExternalServices(category);

// then get the element we want the product list to render in
const element = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const listing = new ProductList(category, dataSource, element);

// finally call the init method to show our products
listing.init();
