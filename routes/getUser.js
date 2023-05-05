const prisma = require("../database");

const { successResponse, errorResponse } = require("../utils");


const getUser = async (request, h) => {
    const id = parseInt(request.query.id);
    
    const users = await prisma.users.findUnique({
        where: { id: id }
    });

    if (!users) return errorResponse(h, 404, "User not found!");

    return successResponse(h, {
        "nickname": users.nickname,
        "description": users.description,
        "createdAt": users.createdAt,
        "avatarUrl": users.avatarUrl
    })
}

module.exports = {
    method: 'GET',
    options: {
       auth: false
    },
    path: '/get-user',
    handler: getUser
}