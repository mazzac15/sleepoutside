import { loadHeaderFooter } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("so-cart", ".checkout-summary");
myCheckout.init();

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    myCheckout.checkout();
    // Redirect to /checkout/index.html
    //window.location.href = "/checkout/success.html";
    //console.log("Transaction successful, redirect to success/index.html")
  }
});

// listening for click on the button
// document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
//     e.preventDefault();

//     myCheckout.checkout();
// });
