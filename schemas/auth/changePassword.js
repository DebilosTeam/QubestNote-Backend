const Joi = require("joi");

const changePasswdSchema = Joi.alternatives().try(
    Joi.object({
        oldPassword: Joi.string().required(),
        newPassword: Joi.string().required()
    })
)

module.exports = { changePasswdSchema };