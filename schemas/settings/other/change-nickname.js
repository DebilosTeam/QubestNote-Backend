const Joi = require("joi");

const changeNicknameSchema = Joi.alternatives().try(
    Joi.object({
        newNickname: Joi.string().required()
    })
)

module.exports = { changeNicknameSchema };