"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const ProductRepository = require("../repository/productRepository");
const ProductController = require("../controllers/productController");
const db = require("../infrastructure/db");

const productRepository = ProductRepository({ db });
const productController = ProductController({ productRepository });

router.post(
  "/upload-image",
  upload.single("image"),
  productController.uploadImage
);

router.post("/", productController.create);

module.exports = router;
