import { getLocalStorage, deleteLocalStorage } from "./utils.mjs";

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryLarge}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <button class="cart-card__remove" data-id="${item.Id}">&times;</button>
  </li>`;
  return newItem;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
  }

  removeToCart(productId) {
    deleteLocalStorage(this.key, productId);
    this.renderCartContents();
  }

  calculateTotal(cartItems) {
    return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
  }

  renderCartContents() {
    let cartItems = getLocalStorage(this.key);

    if (!Array.isArray(cartItems)) {
      cartItems = [cartItems];
    }

    const htmlItems = cartItems.map((item) => cartItemTemplate(item));

    document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

    document.querySelectorAll(".cart-card__remove").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productId = event.currentTarget.getAttribute("data-id");
        this.removeToCart(productId);
      });
    });
    const total = this.calculateTotal(cartItems);
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotalElement = document.getElementById("cart-total");

    if (cartItems.length > 0) {
      cartTotalElement.textContent = total.toFixed(2);
      cartFooter.classList.remove("hide");
    } else {
      cartFooter.classList.add("hide");
    }

  }
}