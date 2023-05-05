const prisma = require("../../database");

const { changeNicknameSchema } = require("../../utils");
const { successResponse, errorResponse } = require("../../utils");

const changeNickname = async (request, h) => {
    const auth = request.auth.credentials;
    const user = await prisma.users.findFirst({ where: { username: auth.username } })

    if (user.nickname === request.payload.newNickname) {
        return errorResponse(h, 500, "You can't set the same nickname again")
    }

    await prisma.users.update({
        where: { username: auth.username },
        data: { nickname: request.payload.newNickname },
    });

    return successResponse(h, { message: "Nickname changed" });
}


module.exports = {
    method: 'POST',
    path: '/users/change-nickname',
    options: {
        validate: {
            payload: changeNicknameSchema,
            failAction: async (request, h, err) =>
                await errorResponse(h, 400, "Bad payload")
        },
        payload: {
            allow: "application/json",
            failAction: async (request, h, err) =>
                await errorResponse(h, 415, "Bad payload format")
        }
    },
    handler: changeNickname
}