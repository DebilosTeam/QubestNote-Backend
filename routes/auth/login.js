const prisma = require("../../database");

const { loginSchema } = require("../../schemas");
const { successResponse, errorResponse, comparePassword, issueToken } = require("../../utils");

const login = async (request, h) => {
    const usr = await prisma.users.findFirst({
        where: {
            OR: [
                { username: request.payload.username },
                { email: request.payload.email },
            ],
        },
    });

    let failure;

    if(!usr) failure = "user_not_found";

    const passCheck = await comparePassword(request.payload.password, usr.password);
    if(!passCheck) return await errorResponse(h, 401, "Invalid password");

    const jwt = await issueToken(usr);
    if(!jwt) return await errorResponse(h, 401, "Account disabled");

    return await successResponse(h, { totpStatus: usr.totpStatus, token: jwt });


}

module.exports = {
    method: 'POST', 
    path: '/auth/login',
    options: { 
        auth: false, 
        validate: {
            payload: loginSchema,
            failAction: async (request, h, err) =>
                await errorResponse(h, 400, "Bad payload")
        },
        payload: {
            allow: "application/json",
            failAction: async (request, h, err) =>
                await errorResponse(h, 415, "Bad payload format")
        }
    }, 
    handler: login
}