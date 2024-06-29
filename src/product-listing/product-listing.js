import { getParams, loadHeaderFooter } from "../js/utils.mjs";
import ProductData from "../js/ProductData.mjs";
import ProductList from "../js/ProductList.mjs";

loadHeaderFooter();
const category = getParams("category");
//create an instance of ProductData class.
const dataSource = new ProductData();
//then get the element we want.
const element = document.querySelector(".product-listing");
//create an instance of ProductList class and send info.
const listing = new ProductList(category, dataSource, element);
//call the init method to show products.

listing.init();
