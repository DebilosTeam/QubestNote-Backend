const { createUserSchema } = require("./auth/register");
const { loginSchema } = require("./auth/login");
const { twofaSchema } = require("./settings/security/totp");
const { twofaAuthSchema } = require("./auth/totp");

module.exports = { createUserSchema, loginSchema, twofaAuthSchema, twofaSchema };