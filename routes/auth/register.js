const { user } = require("../../models");
const { createUserSchema } = require("../../schemas");
const { isUserUnique, hashPassword, issueToken, errorResponse, successResponse } = require("../../utils");

const register = async (request, h) => {   
    const newUser = new user({
        username: request.payload.username,
        nickname: request.payload.username,
        email: request.payload.email,
    });

    const hash = await hashPassword(request.payload.password);
    if(!hash) return await errorResponse(h, 500, "unknown_error");
    newUser.password = hash;

    const savedUser = await newUser.save();
    if(!savedUser) return await errorResponse(h, 500, "unknown_error");

    const jwt = await issueToken(savedUser);

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