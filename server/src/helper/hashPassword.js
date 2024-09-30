"use strict";

const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  return await bcrypt.hashSync(password, 10);
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

module.exports = {
  hashPassword,
  checkPassword,
};
