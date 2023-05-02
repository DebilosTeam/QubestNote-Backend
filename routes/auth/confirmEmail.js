const mailsender = require("../../utils");

const { errorResponse, successResponse } = require("../../utils");
const { user } = require("../../models");

const confirmEmail = async (request, h) => {
    const usr = request.auth.credentials;
    const token  = request.query;

    if (!usr.confirmationToken === token) {
        return errorResponse(h, 501, "Invalid token");
    }

    if (usr.isEmailConfirmed) {
        return errorResponse(h, 425, "E-Mail already confirmed")
    }

    usr.isEmailConfirmed = true;
    await usr.save();
    return successResponse(h, { message: "Verified successfully" })
};

module.exports = {
    method: 'POST',
    path: '/auth/confirm-email/verify',
    handler: confirmEmail
}