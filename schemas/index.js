const { createUserSchema } = require("./auth/register");
const { loginSchema } = require("./auth/login");
const { totpSchema } = require("./settings/security/totp");
const { totpAuthSchema } = require("./auth/totp");
const { changePasswdSchema } = require("./settings/security/change-password")

module.exports = { createUserSchema, loginSchema, totpSchema, totpAuthSchema, changePasswdSchema };