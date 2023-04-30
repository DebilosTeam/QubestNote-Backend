const { totpSchema } = require("../../../schemas");
const { successResponse, errorResponse } = require("../../../utils");
const speakeasy = require('speakeasy');
const QRcode = require("qrcode");

const totp = async (request, h) => {
    const usr = request.auth.credentials;
    
    if (usr.totpStatus) {
        usr.totpStatus = false;
        usr.secretKey = null;
        await usr.save();
        return successResponse(h, { enabled: false });
    }

    if (request.payload.firstCode && !usr.secretKey) return errorResponse(h, 425, "activation_not_started");

    if (request.payload.firstCode) {
        const verified = speakeasy.totp.verify({
            secret: usr.secretKey,
            encoding: "base32",
            token: request.payload.firstCode
        });
        if (verified) {
            usr.totpStatus = true
            await usr.save();
            return successResponse(h, { enabled: true });
        }
        usr.secretKey = null;
        return errorResponse(h, 409, "wrong_code");
    }

    const secret = speakeasy.generateSecret({name: `QubestNote (${usr.nickname})`});
    usr.secretKey = secret.base32;
    await usr.save();

    const qr = await QRcode.toDataURL(secret.otpauth_url);
    return successResponse(h, { secret: secret.base32, qrCode: qr });
}

module.exports = {
    method: 'POST', 
    path: '/settings/security/totp',
    options: {
        validate: { payload: totpSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    },
    handler: totp
}