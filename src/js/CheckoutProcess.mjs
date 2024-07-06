import { getLocalStorage, getCartTotal } from "./utils.mjs";

// function packageItems(items) {}

const totalCart = getCartTotal()
console.log("TotalCart:", totalCart)

export class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }
  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
    this.addZipCodeListener();
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
    this.itemTotal = amounts.reduce((sum, item) => sum + item, 0);
    summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
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
    const shippingElement = document.querySelector(this.outputSelector + " #shipping");
    const taxElement = document.querySelector(this.outputSelector + " #tax");
    const orderTotalElement = document.querySelector(
      this.outputSelector + " #orderTotal"
    );
    shippingElement.innerText = "$" + this.shipping.toFixed(2);
    taxElement.innerText = "$" + this.tax;
    orderTotalElement.innerText = "$" + this.orderTotal;
  }
  addZipCodeListener() {
    const zipInput = document.querySelector("input[name='zip']");
    zipInput.addEventListener("input", () => {
      if (zipInput.value.length === 5) { // Assuming a US ZIP code length of 5 digits
        this.calculateOrderTotal();
      }
    });
  }
}

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");

checkout.init();