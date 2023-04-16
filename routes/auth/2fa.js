const { twofaAuthSchema } = require("../../schemas");
const { errorResponse, successResponse } = require("../../utils");
const speakeasy = require('speakeasy');

const login = async (request, h) => {
    const usr = request.auth.credentials;

    let failure;

    if(!usr.twofa_enabled) failure = "2fa_not_enabled";

    const verified = speakeasy.totp.verify({
        secret: usr.secret_key,
        encoding: 'base32',
        token: request.payload.code
    });

    if(!verified) return await errorResponse(h, 403, "wrong_totp_code");

    await usr.sessions.push(request.auth.artifacts.decoded.payload.session_id);
    await usr.twofa_sessions.splice(usr.twofa_sessions.indexOf(request.auth.artifacts.decoded.payload.session_id), 1);
    await usr.save();

    return await successResponse(h);
}

module.exports = {
    method: 'POST', 
    path: '/auth/2fa', 
    options: { 
        validate: { payload: twofaAuthSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    }, 
    handler: login
}