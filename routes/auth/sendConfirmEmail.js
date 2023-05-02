const mailsender = require("../../utils");
const { randomBytes } = require('crypto');

const { errorResponse, successResponse } = require("../../utils");

const sendConfirmEmail = async (request, h) => {
    const usr = request.auth.credentials;

    if (usr.isEmailConfirmed) {
        return errorResponse(h, 425, "E-Mail already confirmed")
    }

    const token = randomBytes(40).toString("hex");
    usr.confirmationToken = token;
    await usr.save();

    const url = `${request.url}/verify?token=${token}`;
    mailsender.sendEmail('qn-dev@debilosempire.org', `${usr.email}`, "Email confirmation", `${url}`);

    return successResponse(h, { message: "Verification E-Mail sended!" })
};

module.exports = {
    method: 'POST',
    path: '/auth/verify-email',
    handler: sendConfirmEmail
}