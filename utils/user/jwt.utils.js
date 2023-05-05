const prisma = require("../../database");

const { SESSION_SECRET_KEY } = require("../../config");
const { errorResponse } = require("../responses");

const jwt = require("@hapi/jwt");
const uuid = require("uuid");

const issueToken = async (user) => {
    if (user.isDisabled) return false;

    const session_id = uuid.v4();

    let session;
    if (user.totpStatus) {
        session = await prisma.totpSessions.create({
            data: {
                session_id: session_id,
                user: { connect: { id: user.id } },
            },
        });
    } else {
        session = await prisma.session.create({
            data: {
                session_id: session_id,
                user: { connect: { id: user.id } },
            },
        });
    }

    return jwt.token.generate(
        {
            userID: user.id,
            session_id: session.session_id,
            username: user.username,
        },
        { key: SESSION_SECRET_KEY }
    );
};

const verifyToken = async (artifacts, request, h) => {
    const userId = artifacts.decoded.payload.userID;
    const session_id = artifacts.decoded.payload.session_id;

    if (request.path === "/auth/totp") {
        const totpSession = await prisma.totpSessions.findFirst({
            where: {
                userId: userId,
                session_id: session_id
            }
        });

        if (totpSession) {
            return { isValid: true, credentials: request.auth.credentials };
        }
    } else {
        const session = await prisma.session.findFirst({
            where: {
                userId: userId,
                session_id: session_id
            }
        });

        if (session) {
            return { isValid: true, credentials: request.auth.credentials };
        }
    }

    return { response: await errorResponse(h, 401, "Invalid token: invalid session") };
};

module.exports = { issueToken, verifyToken };