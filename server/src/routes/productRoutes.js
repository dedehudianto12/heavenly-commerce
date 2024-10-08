"use strict";

const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const ProductController = require("../controllers/productController");
const ProductRepository = require("../repository/productRepository");
const db = require("../infrastructure/db");

const userRepository = ProductRepository({ db });
const productController = ProductController({ userRepository });

router.post(
  "/upload-image",
  upload.single("image"),
  productController.uploadImage
);
router.post("/", productController.create);

module.exports = router;
