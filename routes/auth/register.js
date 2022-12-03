const { user } = require("../../models");
const { createUserSchema } = require("../../schemas");
const { isUserUnique, hashPassword, issueToken } = require("../../utils");
const Boom = require("@hapi/boom");

const register = async (request, h) => {   
    const newUser = new user({
        username: request.payload.username,
        nickname: request.payload.username,
        email: request.payload.email,
    });

    const hash = await hashPassword(request.payload.password);
    if(!hash) return Boom.internal();
    newUser.password = hash;

    const savedUser = await newUser.save();
    if(!savedUser) return Boom.internal();

    const jwt = await issueToken(savedUser);

    return { registered: true, token: jwt};
}

module.exports = {
    method: 'POST', 
    path: '/auth/register', 
    options: { 
        pre: [ { method: isUserUnique } ],
        validate: { payload: createUserSchema },
        auth: false, 
        payload: { 
            multipart: true 
        } 
    }, 
    handler: register
}