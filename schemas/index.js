// Auth
const { loginSchema } = require("./auth/login");
const { createUserSchema } = require("./auth/register");
const { totpSchema } = require("./settings/security/totp");
const { totpAuthSchema } = require("./auth/totp");

// Settings
const { changeDescriptionSchema } = require("./settings/main/changeDescription");
const { changePasswdSchema } = require("./settings/security/changePassword");
const { changeNicknameSchema } = require("./settings/main/changeNickname");

module.exports = { createUserSchema, loginSchema, totpSchema, totpAuthSchema, changePasswdSchema, changeNicknameSchema, changeDescriptionSchema };