// Auth
const { loginSchema } = require("./auth/login");
const { createUserSchema } = require("./auth/register");
const { totpAuthSchema } = require("./totp/totpVerify");

// Settings
const { totpSchema } = require("./totp/totpControl");
const { changePasswdSchema } = require("./auth/changePassword");
const { changeNicknameSchema } = require("./users/changeNickname");
const { changeDescriptionSchema } = require("./users/changeDescription");

module.exports = { createUserSchema, loginSchema, totpSchema, totpAuthSchema, changePasswdSchema, changeNicknameSchema, changeDescriptionSchema };