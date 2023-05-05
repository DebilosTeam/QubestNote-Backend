const { totpAuthSchema } = require("../../schemas");
const { errorResponse, successResponse } = require("../../utils");

const prisma = require("../../database");

const speakeasy = require('speakeasy');

const login = async (request, h) => {
    const auth = request.auth.credentials;
    const user = await prisma.users.findFirst({
        where: { username: auth.username }
    })

    if(!user.totpStatus) return await errorResponse(h, 403, "totp_not_enabled");

    const verified = speakeasy.totp.verify({
        secret: user.secretKey,
        encoding: 'base32',
        token: request.payload.code
    });

    if(!verified) return await errorResponse(h, 403, "Incorrect code");


    const session_id = request.auth.artifacts.decoded.payload.session_id;
    const user_id = request.auth.artifacts.decoded.payload.userID;

    await prisma.users.update({
        where: { id: user_id },
        data: {
            sessions: {
                create: { session_id }
            },
            totpSessions: {
                deleteMany: {
                    userId: user_id,
                    session_id,
                }
            }
        }
    });

    return await successResponse(h);
}

module.exports = {
    method: 'POST', 
    path: '/auth/totp',
    options: { 
        validate: { payload: totpAuthSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    }, 
    handler: login
}