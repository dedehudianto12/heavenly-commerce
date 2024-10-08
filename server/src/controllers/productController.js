"use strict";

const ProductUseCase = require("../usecases/productUsecase");
const { uploadFileToGCP, checkImageIsExist } = require("../helper/gcp");

module.exports = function ProductController({ productRepository }) {
  const productUsecase = ProductUseCase({ productRepository });

  return {
    async create(req, res) {
      try {
        const newProduct = await productUsecase.createProduct(req.body);
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
    async uploadImage(req, res) {
      try {
        const file = req.file;

        if (!file) {
          res.status(400).json({ error: "No file provided" });
        }

        const isImage = await checkImageIsExist(file, "product");

        let imageUrl;

        if (!isImage) {
          imageUrl = await uploadFileToGCP(file);
        } else {
          imageUrl = `https://storage.googleapis.com/heavenlly-commerce/product/${file.originalname}`;
        }

        res.status(200).json({ message: "Success upload the image", imageUrl });
      } catch (error) {
        console.log("Error when uploading the image ", error);
        res.status(500).json({ error: "Failed to upload image" });
      }
    },
  };
};
