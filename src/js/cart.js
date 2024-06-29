//import { getLocalStorage, deleteLocalStorage } from "./utils.mjs";

// // function renderCartContents() {
// //   let cartItems = getLocalStorage("so-cart");

// //   if (!Array.isArray(cartItems)) {
// //     cartItems = [cartItems];
// //   }

// //   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
// //   document.querySelector(".product-list").innerHTML = htmlItems.join("");

// //   document.querySelectorAll(".cart-card__remove").forEach((button) => {
// //     button.addEventListener("click", function () {
// //       const productId = this.getAttribute("data-id");
// //       removeToCart("so-cart", productId);
// //     });
// //   });
// // }
// // function cartItemTemplate(item) {
// //   const newItem = `<li class="cart-card divider">
// //   <a href="#" class="cart-card__image">
// //     <img
// //       src="${item.Image}"
// //       alt="${item.Name}"
// //     />
// //   </a>
// //   <a href="#">
// //     <h2 class="card__name">${item.Name}</h2>
// //   </a>
// //   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
// //   <p class="cart-card__quantity">qty: 1</p>
// //   <p class="cart-card__price">$${item.FinalPrice}</p>
// //   <button class="cart-card__remove" id="removeToCart" data-id="${item.Id}">&times;</button>
// // </li>`;

// //   return newItem;
// // }

// function removeToCart(key, productId) {
//   deleteLocalStorage(key, productId);
//   renderCartContents();
// }

//renderCartContents();

// new code //

// import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";

// loadHeaderFooter();

// const cart = new ShoppingCart("so-cart", ".product-list");
// cart.renderCartContents();

import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
