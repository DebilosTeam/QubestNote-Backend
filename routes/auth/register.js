const prisma = require("../../database");

const { createUserSchema } = require("../../schemas");
const { successResponse, errorResponse, isUserUnique, hashPassword, issueToken } = require("../../utils");

const register = async (request, h) => {
    const hash = await hashPassword(request.payload.password);
    if(!hash) return await errorResponse(h, 500, "Unknown error");

    let newUser;
    const user = await prisma.users.findFirst();

    if(!user) {
        newUser = await prisma.users.create({
            data: {
                username: request.payload.username,
                nickname: request.payload.username,
                password: hash,
                isAdmin: true,
                email: request.payload.email,
            },
        });
    } else {
        newUser = await prisma.users.create({
            data: {
                username: request.payload.username,
                nickname: request.payload.username,
                password: hash,
                email: request.payload.email,
            },
        });
    }

    const jwt = await issueToken(newUser);

    return await successResponse(h, { token: jwt });
}

module.exports = {
    method: 'POST', 
    path: '/auth/register',
    options: { 
        pre: [ { method: isUserUnique } ],
        validate: {
            payload: createUserSchema,
            failAction: async (request, h, err) =>
                await errorResponse(h, 400, "Bad payload")
        },
        auth: false, 
        payload: {
            allow: "application/json",
            failAction: async (request, h, err) =>
                await errorResponse(h, 415, "Bad payload format")
        }
    }, 
    handler: register
}