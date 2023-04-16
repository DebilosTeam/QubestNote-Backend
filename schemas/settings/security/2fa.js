const Joi = require("joi");

const twofaSchema = Joi.alternatives().try(
    Joi.object(),
    Joi.object({
        firstCode: Number
    })
)

module.exports = { twofaSchema };