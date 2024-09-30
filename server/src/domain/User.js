"use strict";

class User {
  constructor({
    username,
    email,
    password,
    role = "user",
    createdAt = new Date(),
  }) {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}

module.exports = User;
