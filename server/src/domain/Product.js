class Product {
  constructor({ name, description, price, stock, categoryId, images }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.categoryId = categoryId;
    this.images = images;
  }
}

module.exports = Product;
