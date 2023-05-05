const Joi = require("joi");

const totpSchema = Joi.alternatives().try(
    Joi.object(),
    Joi.object({
        firstCode: Number
    })
)

module.exports = { totpSchema };