"use strict";

module.exports = function productRepository({ db }) {
  return {
    async create(productData) {
      console.log(productData);
      return db.product.create({ data: productData });
    },
    async update(id, productData) {
      return db.product.update({
        where: {
          id: id,
        },
        data: productData,
      });
    },
  };
};
