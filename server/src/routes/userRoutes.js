"use strict";

const express = require("express");
const router = express.Router();

const UserRepository = require("../repository/userRepository");
const UserController = require("../controllers/userController");
const db = require("../infrastructure/db");

const userRepository = UserRepository({ db });
const userController = UserController({ userRepository });

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
