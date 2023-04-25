const { user } = require("../../models");
const { loginSchema } = require("../../schemas");
const { comparePassword, issueToken, errorResponse, successResponse } = require("../../utils");

const login = async (request, h) => {
    const usr = await user.findOne({
        $or: [
            { username: request.payload.username },
            { email: request.payload.email }
        ]
    });

    let failure;

    if(!usr) failure = "user_not_found";

    const passCheck = await comparePassword(request.payload.password, usr.password);
    if(!passCheck) failure = "bad_password";

    const jwt = await issueToken(usr);
    if(!jwt) failure = "user_disabled";

    return (failure) ? await errorResponse(h, 401, failure) : await successResponse(h, { totpStatus: usr.totpStatus, token: jwt });


}

module.exports = {
    method: 'POST', 
    path: '/auth/login', 
    options: { 
        auth: false, 
        validate: { payload: loginSchema, failAction: async (request, h, err) => await errorResponse(h, 400, "bad_payload") },
        payload: { allow: "application/json", failAction: async (request, h, err) => await errorResponse(h, 415, "bad_payload_format") } 
    }, 
    handler: login
}