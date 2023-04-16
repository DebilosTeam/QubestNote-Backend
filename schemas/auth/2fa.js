const Joi = require("joi");

const twofaAuthSchema = Joi.alternatives().try(
    Joi.object({
        code: Number
    })
)

module.exports = { twofaAuthSchema };