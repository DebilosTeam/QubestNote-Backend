const Joi = require("joi");

const loginSchema = Joi.alternatives().try(
    Joi.object({
        username: Joi.string().alphanum().min(6).max(30).required(),
        password: Joi.string().required()
    }),
    Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
)

module.exports = { loginSchema };