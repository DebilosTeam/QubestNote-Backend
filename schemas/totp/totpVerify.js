const Joi = require("joi");

const totpAuthSchema = Joi.alternatives().try(
    Joi.object({
        code: Number
    })
)

module.exports = { totpAuthSchema };