const prisma = require("../../../database");
const { totpSchema } = require("../../../schemas");
const { successResponse, errorResponse } = require("../../../utils");


const speakeasy = require('speakeasy');
const QRcode = require("qrcode");

const totp = async (request, h) => {
    const auth = request.auth.credentials;
    const user = await prisma.users.findFirst({
        where: {
            username: auth.username
        }
    })

    if (user.totpStatus) {
        await prisma.users.update({
            where: { username: auth.username },
            data: { secretKey: null },
        });
        return successResponse(h, { enabled: false });
    }

    if (request.payload.firstCode && !user.secretKey) return errorResponse(h, 425, "activation_not_started");

    if (request.payload.firstCode) {
        const verified = speakeasy.totp.verify({
            secret: user.secretKey,
            encoding: "base32",
            token: request.payload.firstCode
        });

        if (verified) {
            await prisma.users.update({
                where: { username: auth.username },
                data: { totpStatus: true }
            });
            return successResponse(h, { enabled: true });
        }

        return errorResponse(h, 409, "wrong_code");
    }

    const secret = speakeasy.generateSecret({name: `QubestNote (${user.nickname})`});
    await prisma.users.update({
        where: { username: auth.username },
        data: { secretKey: secret.base32 }
    });

    const qr = await QRcode.toDataURL(secret.otpauth_url);
    return successResponse(h, { secret: secret.base32, qrCode: qr });
}



module.exports = {
    method: 'POST', 
    path: '/api/settings/totp',
    options: {
        validate: { payload: totpSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    },
    handler: totp
}