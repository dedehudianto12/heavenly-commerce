"use strict";

const Product = require("../domain/Product");

module.exports = function ProductUsecase({ productRepository }) {
  return {
    async createProduct(productData) {
      if (
        !productData.name ||
        !productData.description ||
        !productData.price ||
        !productData.stock ||
        !productData.images
      ) {
        throw new Error("Product data need to be filled");
      }

      const product = new Product({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        stock: productData.stock,
        categoryId: productData.categoryId,
        images: productData.images,
      });

      const newProduct = await productRepository.create(product);
      return newProduct;
    },
  };
};
