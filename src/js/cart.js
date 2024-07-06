import { loadHeaderFooter, setCartTotal } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
addCheckoutEventListener();

// Function to add the event listener to the checkout button
function addCheckoutEventListener() {
    const checkoutButton = document.querySelector(".cart-checkout");

    checkoutButton.addEventListener("click", (event) => {
        // Prevent default behavior (optional, if you want to prevent navigation for any reason)
        // event.preventDefault();

        // Get the total from the cart-total element
        const cartTotalElement = document.getElementById("cart-total");
        const total = cartTotalElement.textContent;

        // Store the total in localStorage
        setCartTotal(total);
    });
}

// Call the function to add the event listener

