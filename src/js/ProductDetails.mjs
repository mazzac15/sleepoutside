
// ProductDetails.mjs in the "js" directory. This script file will contain the code to dynamically produce the product detail pages. 

import { getLocalStorage, setLocalStorage, alertMessage, deleteLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    try {
      // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        throw new Error(`Product with ID ${this.productId} not found`);
      }
      // once we have the product details we can render out the HTML
      this.renderProductDetails("main");
      // once the HTML is rendered we can add a listener to Add to Cart button
      // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
      document
        .getElementById("addToCart")
        .addEventListener("click", this.addToCart.bind(this));
    } catch (error) {
      return ("Error intializing ProduckDetails:", error);
    }
  }
  addToCart() {
    let cartContents = getLocalStorage("so-cart");

    if (!cartContents) {
      cartContents = [];
    }

    // Check if the product already exists in the cart
    const existingProduct = cartContents.find(item => item.Id === this.product.Id);
    console.log("existingProduct: ", existingProduct);
    if (existingProduct) {
      console.log("product exists: ", this.product.Name)
      // If the product exists, increment its quantity
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
      setLocalStorage("so-cart", cartContents);

      console.log("Qty incremented: ", existingProduct.quantity)
    } else {
      // If the product does not exist, add it with quantity 1
      console.log("Product do not exists in cart")
      this.product.quantity = 1;
      console.log("quantity added: ", this.product.quantity)
      cartContents.push(this.product);
      setLocalStorage("so-cart", cartContents);
      console.log("Item didn't exists and was added")

    }
    // Save updated cart contents back to localStorage
    //deleteLocalStorage();

    console.log("cartContent: ", cartContents);
    // Show a message to the user about the new item added
    const alertMsg = `${this.product.Name} added to the cart, total ${existingProduct ? existingProduct.quantity : this.product.quantity}`;
    alertMessage(alertMsg);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}