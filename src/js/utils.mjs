// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
// export function setLocalStorage(key, product) {
//   //get the new data
//   const existingData = localStorage.getItem(key);
//   // create a list to store the products
//   let updatedData = [];
//   // if any, covert it in a json
//   if (existingData) {

//     updatedData = JSON.parse(existingData);

//     if (!Array.isArray(updatedData)) {
//       updatedData = [];
//     }
//   }
//   // Append the new product to the existing product list
//   updatedData.push(product);

//   // Store the updated data back to localStorage
//   localStorage.setItem(key, JSON.stringify(updatedData));
// }

export function setLocalStorage(key, product) {

  // Store the updated data back to localStorage
  localStorage.setItem(key, JSON.stringify(product));
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function setCartCount(count) {
  localStorage.setItem("cart-count", count);
}

export function getCartCount() {
  return parseInt(localStorage.getItem("cart-count")) || 0;
}

export function updateCartBadge(data) {
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    if (data !== undefined) {
      cartCountElement.innerText = data.toString();
    } else {
      const cartCount = getCartCount(); // Assuming getCartCount is an asynchronous function
      cartCountElement.innerText = cartCount.toString();
    }
  } else {
    console.error("Element with class 'cart-count' not found.");
  }
}


export function deleteLocalStorage(key, productId) {

  const existingData = localStorage.getItem(key);

  let updatedData = [];

  if (existingData) {
    updatedData = JSON.parse(existingData);

    if (!Array.isArray(updatedData)) {
      updatedData = [];
    }
  }
  // THis will find the index of rthe first item. It return -1 if no item found
  const index = updatedData.findIndex(item => item.Id === productId);

  // If found, remove that item from the array with splice
  if (index !== -1) {
    updatedData.splice(index, 1);
  }

  localStorage.setItem(key, JSON.stringify(updatedData));
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product;
}

export function getMultipleParams(...params) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const result = {};
  params.forEach(param => {
    result[param] = urlParams.get(param);

  });
  console.log(result);
  return result;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);

  if (callback) {
    callback(data);
  };
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}


export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}