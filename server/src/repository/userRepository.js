"use strict";

module.exports = function userRepository({ db }) {
  return {
    async create(userData) {
      return await db.user.create({ data: userData });
    },
    async findByEmail(email) {
      return await db.user.findUnique({ where: { email } });
    },
    async findByUsername(username) {
      return await db.user.findUnique({ where: { username } });
    },
  };
};
