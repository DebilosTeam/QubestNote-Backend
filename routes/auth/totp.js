const { totpAuthSchema } = require("../../schemas");
const { errorResponse, successResponse } = require("../../utils");
const speakeasy = require('speakeasy');

const login = async (request, h) => {
    const usr = request.auth.credentials;

    if(!usr.totpStatus) return await errorResponse(h, 403, "totp_not_enabled");

    const verified = speakeasy.totp.verify({
        secret: usr.secretKey,
        encoding: 'base32',
        token: request.payload.code
    });

    if(!verified) return await errorResponse(h, 403, "wrong_totp_code");

    await usr.sessions.push(request.auth.artifacts.decoded.payload.session_id);
    await usr.totpSessions.splice(usr.totpSessions.indexOf(request.auth.artifacts.decoded.payload.session_id), 1);
    await usr.save();

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