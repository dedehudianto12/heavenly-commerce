"use strict";

const User = require("../domain/User");
const { hashPassword, checkPassword } = require("../helper/hashPassword");
const { generateAccessToken } = require("../helper/jsonWebToken");

module.exports = function UserUsecase({ userRepository }) {
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
    async loginUser({ email, password }) {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error("email/password is wrong");
      }

      const passwordIsTrue = await checkPassword(password, user.password);
      if (!passwordIsTrue) {
        throw new Error("email/password is wrong");
      }

      const token = generateAccessToken(user);

      return {
        message: "Login Successfull",
        accessToken: token,
        user: {
          username: user.username,
          id: user.id,
          role: user.role,
        },
      };
    },
  };
};
