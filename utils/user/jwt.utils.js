const jwt = require("@hapi/jwt");
const uuid = require("uuid");
const { SESSION_SECRET_KEY } = require("../../config");
const { user } = require("../../models");

const issueToken = async (user) => {
    if(user.is_disabled) return undefined;

    const session_id = uuid.v4();
    user.sessions.push(session_id);
    user.save();

    return jwt.token.generate({
        session_id: session_id,
        username: user.username,
        nickname: user.nickname,
        email: user.email,
        created_at: user.created_at,
        role: user.role
    }, SESSION_SECRET_KEY);
}

const verifyToken = async (artifacts, request, h) => {
    const usr = await user.findOne({ username: artifacts.decoded.payload.username });

    if(usr.sessions.includes(artifacts.decoded.payload.session_id)) return { isValid: true, credentials: usr }
    return { isValid: false };
}

module.exports = { issueToken, verifyToken };