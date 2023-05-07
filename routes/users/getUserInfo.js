const prisma = require("../../database");

const { successResponse, errorResponse } = require("../../utils");


const getUserInfo = async (request, h) => {
    const auth = request.auth.credentials;

    const info = await prisma.users.findUnique({
        where: {
            id: auth.id
        }
    });

    return successResponse(h, {
        "nickname": info.nickname,
        "description": info.description,
        "createdAt": info.createdAt,
        "avatarUrl": info.avatarUrl,
        "totpStatus": info.totpStatus,
        "email": info.email
    })
}


module.exports = {
    method: "GET",
    path: "/users/info",
    handler: getUserInfo
}