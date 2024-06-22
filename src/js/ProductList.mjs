import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
  <a href="product_pages/index.html?product=${product.Id}">
  <img
    src="${product.Image}"
    alt="Image of ${product.Name}"
  />
  <h3 class="card__brand">${product.Brand.Name}</h3>
  <h2 class="card__name">${product.Name}</h2>
  <p class="product-card__price">$${product.FinalPrice}</p></a>
</li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // We passed in this information to make our class as reusable as possible.
    // Being able to define these things when we use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }
  async init() {
    // our dataSource will return a Promise...so we can use await to resolve it.
    const list = await this.dataSource.getData();
    // filter product that will be rendered and limited to only 4 items.
    const filteredList = this.filterRenders(list);
    // render the list
    this.renderList(filteredList);
  }
  // render after doing the first stretch
  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
  filterRenders(list) {
    // Filter the list to only include products with render set to true
    const filteredList = list.filter(product => product.render);
  
    // Check if the new list contains more than 4 items
    if (filteredList.length > 4) {
      // If more than 4 items, truncate the list to the first 4 items
      return filteredList.slice(0, 4);
    }
  
    // Return the new list (which could be less than or equal to 4 items)
    return filteredList;
  }
  

  
  
  

  // render before doing the stretch
  // renderList(list) {
  //   const htmlStrings = list.map(productCardTemplate);
  //   this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  // }
}