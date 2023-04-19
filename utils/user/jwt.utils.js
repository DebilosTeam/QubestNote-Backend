const jwt = require("@hapi/jwt");
const uuid = require("uuid");
const { SESSION_SECRET_KEY } = require("../../config");
const { user } = require("../../models");
const { errorResponse } = require("../responses");

const issueToken = async (user) => {
    if(user.is_disabled) return false;

    const session_id = uuid.v4();

    if(user.twofa_enabled) {
        user.twofa_sessions.push(session_id);
        user.save();
    } else {
        user.sessions.push(session_id);
        user.save();
    }

    return jwt.token.generate({
        session_id: session_id,
        username: user.username
    }, SESSION_SECRET_KEY);
}

const verifyToken = async (artifacts, request, h) => {
    const usr = await user.findOne({ username: artifacts.decoded.payload.username });
    if(!usr) return { response: await errorResponse(h, 401, "bad_token") };

    if(request.path == "/auth/totp" && usr.twofa_sessions.includes(artifacts.decoded.payload.session_id)) return { isValid: true, credentials: usr };

    if(usr.sessions.includes(artifacts.decoded.payload.session_id)) return { isValid: true, credentials: usr };

    return { response: await errorResponse(h, 401, "bad_token") };
}

module.exports = { issueToken, verifyToken };
