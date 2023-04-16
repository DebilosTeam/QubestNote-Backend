const { twofaSchema } = require("../../../schemas/");
const { successResponse, errorResponse } = require("../../../utils");
const speakeasy = require('speakeasy');
const QRcode = require("qrcode");

const twofa = async (request, h) => {
    const usr = request.auth.credentials;
    
    if (usr.twofa_enabled) {
        usr.twofa_enabled = false;
        usr.secret_key = null;
        await usr.save();
        return successResponse(h, { enabled: false });
    }

    if (request.payload.firstCode && !usr.secret_key) return errorResponse(h, 425);

    if (request.payload.firstCode) {
        const verified = speakeasy.totp.verify({
            secret: usr.secret_key,
            encoding: "base32",
            token: request.payload.firstCode
        });
        if (verified) {
            usr.twofa_enabled = true
            await usr.save();
            return successResponse(h, { enabled: true });
        }
        usr.secret_key = null;
        return errorResponse(h, 409, "wrong_code");
    }

    const secret = speakeasy.generateSecret();
    usr.secret_key = secret.base32;
    await usr.save();

    const qr = await QRcode.toDataURL(secret.otpauth_url);
    return successResponse(h, { qrCode: qr });
    
}

module.exports = {
    method: 'POST', 
    path: '/settings/security/2fa', 
    options: {
        validate: { payload: twofaSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    },
    handler: twofa
}