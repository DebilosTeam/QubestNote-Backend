const prisma = require("../../database");
const { createUserSchema } = require("../../schemas");
const { isUserUnique, hashPassword, issueToken, errorResponse, successResponse } = require("../../utils");

const register = async (request, h) => {
    const hash = await hashPassword(request.payload.password);
    if(!hash) return await errorResponse(h, 500, "unknown_error");

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
        validate: { payload: createUserSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        auth: false, 
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    }, 
    handler: register
}