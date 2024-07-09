import {
  clearLocalStorage,
  getLocalStorage,
  alertMessage,
  removeAllAlerts
} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";



const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

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
    zipInput.addEventListener("blur", () => {
      this.calculateOrderTotal();

    });
  }

  packageItems(items) {
    const simplifiedItems = items.map((item) => {
      //console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: this.countProductById(item.Id),
      };
    });
    return simplifiedItems;
  }

  countProductById(productId) {
    let count = 0;
    for (const item of this.list) {
      if (item.Id === productId) {
        count += 1;
      }
    }
    return count;
  }

  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = this.packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
      clearLocalStorage();
      location.assign("/checkout/success.html");
    } catch (err) {
      // get rid of any preexisting alerts.
      removeAllAlerts();
      for (let message in err.message) {
        alertMessage(err.message[message]);
      }

      console.log(err);
    }
  }
}