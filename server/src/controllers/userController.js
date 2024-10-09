"use strict";

const UserUseCase = require("../usecases/userUsecase");

module.exports = function UserController({ userRepository }) {
  const userUseCase = UserUseCase({ userRepository });

  return {
    async register(req, res) {
      try {
        const newUser = await userUseCase.registerUser(req.body);
        res.status(201).json(newUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
    async login(req, res) {
      try {
        console.log(userRepository);
        const loginUser = await userUseCase.loginUser(req.body);
        res.status(201).json(loginUser);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    },
  };
};
