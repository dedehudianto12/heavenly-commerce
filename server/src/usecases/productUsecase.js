"use strict";

module.exports = function ProductUsecase({ productRepository }) {
  return {
    async createProduct(productData) {
      console.log(productData);
    },
  };
};
