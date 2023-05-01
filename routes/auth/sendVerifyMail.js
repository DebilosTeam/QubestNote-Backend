const mailsender = require("../../utils");
const uuid = require("uuid");

const { errorResponse, successResponse } = require("../../utils");

const sendVerifyMail = async (request, h) => {
    const usr = request.auth.credentials;

    if (usr.isEmailConfirmed) {
        return errorResponse(h, 425, "E-Mail already confirmed")
    }

    const token = uuid.v4();
    usr.confirmationToken = token;
    await usr.save();

    mailsender.sendEmail('', `${usr.email}`, "Email confirmation", `${server.info.uri}/reset-password/${resetToken}`)

    return successResponse(h, { message: "Verification E-Mail sended!" })
};

module.exports = {
    method: 'POST',
    path: '/auth/send-mail',
    handler: sendVerifyMail
}