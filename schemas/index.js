const { createUserSchema } = require("./auth/register");
const { loginSchema } = require("./auth/login");

module.exports = { createUserSchema, loginSchema };