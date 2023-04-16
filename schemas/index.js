const { createUserSchema } = require("./auth/register");
const { loginSchema } = require("./auth/login");
const { twofaSchema } = require("./settings/security/2fa");
const { twofaAuthSchema } = require("./auth/2fa");

module.exports = { createUserSchema, loginSchema, twofaAuthSchema, twofaSchema };