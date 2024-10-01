"use strict";

const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  const secret = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign(payload, secret);
};

module.exports = {
  generateAccessToken,
};
