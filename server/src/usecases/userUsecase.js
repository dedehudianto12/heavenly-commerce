"use strict";

const User = require("../domain/User");
const { hashPassword } = require("../helper/hashPassword");

module.exports = function RegisterUser({ userRepository }) {
  return {
    async registerUser(userData) {
      const existingEmail = await userRepository.findByEmail(userData.email);
      const existingUsername = await userRepository.findByUsername(
        userData.username
      );
      if (existingEmail) {
        throw new Error("User with this email already exist");
      }
      if (existingUsername) {
        throw new Error("User with this username already exist");
      }

      const newPassword = await hashPassword(userData.password);

      const user = new User({
        username: userData.username,
        email: userData.email,
        password: newPassword,
        role: userData.role || "user",
      });

      return await userRepository.create({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        createdAt: user.createdAt,
      });
    },
  };
};
