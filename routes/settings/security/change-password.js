const { changePasswdSchema } = require("../../../utils");
const { successResponse, errorResponse, comparePassword, hashPassword } = require("../../../utils");

const changePasswd = async (request, h) => {
    const usr = request.auth.credentials;

    const isValid = await comparePassword(request.payload.oldPassword, usr.password);

    if (!isValid) {
        return errorResponse(h, 401, "Wrong password");
    }

    usr.password = await hashPassword(request.payload.newPassword);
    await usr.save()

    return successResponse(h, { message: "Password changed" });
}

module.exports = {
    method: 'POST',
    path: '/settings/security/change-password',
    options: {
        validate: { payload: changePasswdSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "Bad payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "Bad payload format") }
    },
    handler: changePasswd
}