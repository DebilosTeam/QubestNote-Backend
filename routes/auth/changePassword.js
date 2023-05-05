const prisma = require("../../database");

const { changePasswdSchema } = require("../../schemas");
const { successResponse, errorResponse, comparePassword, hashPassword } = require("../../utils");

const changePasswd = async (request, h) => {
    const auth = request.auth.credentials;

    const isValid = await comparePassword(request.payload.oldPassword, auth.password);

    if (!isValid) {
        return errorResponse(h, 401, "Wrong password");
    }

    const hashedPassword = await hashPassword(request.payload.newPassword);

    await prisma.users.update({
        where: { username: auth.username },
        data: { password: hashedPassword },
    });

    return successResponse(h, { message: "Password changed" });
}

module.exports = {
    method: 'POST',
    path: '/auth/change-password',
    options: {
        validate: {
            payload: changePasswdSchema,
            failAction: async (request, h, err) =>
                await errorResponse(h, 400, "Bad payload")
        },
        payload: {
            allow: "application/json",
            failAction: async (request, h, err) =>
                await errorResponse(h, 415, "Bad payload format")
        }
    },
    handler: changePasswd
}