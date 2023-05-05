const Joi = require("joi");

const changeDescriptionSchema = Joi.alternatives().try(
    Joi.object({
        newDescription: Joi.string().required()
    })
)

module.exports = { changeDescriptionSchema };