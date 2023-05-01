const { changeNicknameSchema } = require("../../../utils");
const { successResponse, errorResponse } = require("../../../utils");

const changeNickname = async (request, h) => {
    const usr = request.auth.credentials;

    if (usr.nickname === request.payload.newNickname) {
        return errorResponse(h, 500, "You can't set the same nickname again")
    }

    usr.nickname = request.payload.newNickname
    await usr.save()

    return successResponse(h, { message: "Nickname changed" });
}

module.exports = {
    method: 'POST',
    path: '/settings/security/change-nickname',
    options: {
        validate: { payload: changeNicknameSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "Bad payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "Bad payload format") }
    },
    handler: changeNickname
}