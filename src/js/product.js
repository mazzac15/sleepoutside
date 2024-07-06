import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getMultipleParams, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Uisng new getMultipleParams to get both category and product from the url e.g.: /tent/RT53F. Reason for this is because in previous version,
//the category was missing, so I thought to pass the category via the href. You'll see the modification also in the href in productList, in the template.
//
const { category, product } = getMultipleParams("category", "product");
const dataSource = new ProductData(category);

const productElement = new ProductDetails(product, dataSource);
productElement.init();
//