const prisma = require("../../database");

const { successResponse, errorResponse } = require("../../utils");


const getProfileInfo = async (request, h) => {
    const id = parseInt(request.params.id);

    const users = await prisma.users.findUnique({
        where: { id: id }
    });

    if (!users) return errorResponse(h, 404, "User not found!");

    return successResponse(h, {
        "nickname": users.nickname,
        "description": users.description,
        "createdAt": users.createdAt,
        "avatarUrl": users.avatarUrl,
        "isAdmin": users.isAdmin,
        "isModerator": users.isModerator
    });
}

module.exports = {
    method: 'GET',
    options: {
        auth: false
    },
    path: '/users/profile/{id}',
    handler: getProfileInfo
}