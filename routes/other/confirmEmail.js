const prisma = require("../../database");
const mailsender = require("../../utils");

const { randomBytes } = require('crypto');

const { successResponse, errorResponse } = require("../../utils");

const confirmEmail = async (request, h) => {
    const auth = request.auth.credentials;
    const { token } = request.query;

    const user = await prisma.users.findFirst({
        where: {
            username: auth.username,
        }
    });

    if (user.emailConfirmed) {
        return errorResponse(h, 425, "Email already confirmed");
    }

    if (!token) {
        const generatedToken = randomBytes(40).toString("hex");

        const url = `${request.url}?token=${generatedToken}`;
        mailsender.sendEmail(
            'qn-dev@debilosempire.org',
            user.email,
            "Email confirmation",
            url
        );

        await prisma.users.update({
            where: { username: auth.username },
            data: { confirmationToken: generatedToken },
        })

        return successResponse(h, { message: "Verification email has been sent!" })
    } else {
        if (!user.confirmationToken === token) {
            return errorResponse(h, 403, "Invalid token");
        }

        await prisma.users.update({
            where: { username: auth.username },
            data: { emailConfirmed: true }
        });

        return successResponse(h, { message: "Email verification success!" });
    }
};

module.exports = {
    method: 'POST',
    path: '/email-confirmation',
    handler: confirmEmail
}