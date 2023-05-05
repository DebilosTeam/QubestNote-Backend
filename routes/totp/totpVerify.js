const prisma = require("../../database");

const { totpAuthSchema } = require("../../schemas");
const { successResponse, errorResponse } = require("../../utils");

const speakeasy = require('speakeasy');

const totpVerify = async (request, h) => {
    const auth = request.auth.credentials;
    const user = await prisma.users.findFirst({
        where: { username: auth.username }
    })

    if(!user.totpStatus) return await errorResponse(h, 403, "Two-Factor Authentication not enabled");

    const verified = speakeasy.totp.verify({
        secret: user.secretKey,
        encoding: 'base32',
        token: request.payload.code
    });

    if(!verified) return await errorResponse(h, 403, "Invalid code");


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
    path: '/totp/verify',
    options: { 
        validate: {
            payload: totpAuthSchema,
            failAction: async (request, h, err) =>
                await errorResponse(h, 400, "Bad payload")
        },
        payload: {
            allow: "application/json",
            failAction: async (request, h, err) =>
                await errorResponse(h, 415, "Bad payload format")
        }
    }, 
    handler: totpVerify
}