const prisma = require("../../database");
const { errorResponse } = require("../responses");

const isUserUnique = async (request, h) => {
    const userCheck = await prisma.users.findFirst({
        where: {
            OR: [
                { username: request.payload.username },
                { email: request.payload.email },
            ],
        },
    });

    if (userCheck === null) {
        return request.payload;
    }

    const errorMessage = userCheck.username === request.payload.username
        ? 'username_already_registered'
        : 'email_already_registered';

    return await errorResponse(h, 400, errorMessage);
};

module.exports = { isUserUnique };