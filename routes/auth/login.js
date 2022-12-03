const Boom = require("@hapi/boom");
const { user } = require("../../models");
const { loginSchema } = require("../../schemas");
const { comparePassword, issueToken } = require("../../utils");

const login = async (request, h) => {
    const usr = await user.findOne({
        $or: [
            { username: request.payload.username },
            { email: request.payload.email }
        ]
    });

    const error = Boom.unauthorized();
    error.output.payload["authenticated"] = false;

    if(!usr) {
        error.output.payload["reason"] = "user_not_found";
        return error;
    }

    const passCheck = await comparePassword(request.payload.password, usr.password);
    if(!passCheck) {
        error.output.payload["reason"] = "bad_password";
        return error;
    }

    const jwt = await issueToken(usr);
    if(!jwt) {
        error.output.payload["reason"] = "user_disabled";
        return error;
    }

    return { authenticated: true, token: jwt };
}

module.exports = {
    method: 'POST', 
    path: '/auth/login', 
    options: { 
        auth: false, 
        validate: { payload: loginSchema },
        payload: { 
            multipart: true 
        } 
    }, 
    handler: login
}