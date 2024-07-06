import { getLocalStorage, getCartTotal } from "./utils.mjs";

// function packageItems(items) {}

const totalCart = getCartTotal()
console.log("TotalCart:", totalCart)

export class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.total = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);

    this.calculateItemSummary();
  }
  calculateItemSummary() {
    console.log("list:", this.list)
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    console.log("sumaryElement: ", summaryElement);
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    itemNumElement.innerText = this.list.length;
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = "$" + this.itemTotal;
  }
  calculateOrderTotal() {
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.shipping) +
      parseFloat(this.tax)
    ).toFixed(2);
    this.displayOrderTotals();
  }
  displayOrderTotals() {
    const shipping = document.querySelector(this.outputSelector + " #shipping");
    const tax = document.querySelector(this.outputSelector + " #tax")
    const orderTotal = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shipping.innertext = "$" + this.shipping;
    tax.innerText = "$" + this.tax;
    orderTotal.innerText = "$" + this.orderTotal;
  }
  // async checkout (form) {}
}

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");

checkout.init();



