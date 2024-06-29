const baseURL = import.meta.env.VITE_SERVER_URL

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
  }

  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    //console.log("Fetched data:", data.Result);
    return data.Result;
  }

  async findProductById(id) {
    const products = await this.getData(this.category);
    //console.log("Products fetched for category:", this.category, products);
    return products.find((item) => item.Id === id);
  }
}
