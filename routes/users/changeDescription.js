const prisma = require("../../database");

const { changeDescriptionSchema } = require("../../schemas");
const { successResponse, errorResponse } = require("../../utils");

const changeDescription = async (request, h) => {
    const auth = request.auth.credentials;

    await prisma.users.update({
        where: { username: auth.username },
        data: { description: request.payload.newDescription },
    });

    return successResponse(h, { message: "Description updated!" });
}


module.exports = {
    method: 'POST',
    path: '/users/change-description',
    options: {
        validate: {
            payload: changeDescriptionSchema,
            failAction: async (request, h, err) =>
                await errorResponse(h, 400, "Bad payload")
        },
        payload: {
            allow: "application/json",
            failAction: async (request, h, err) =>
                await errorResponse(h, 415, "Bad payload format")
        }
    },
    handler: changeDescription
}