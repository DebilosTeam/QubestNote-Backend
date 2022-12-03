const { user } = require("../../models");
const Boom = require("@hapi/boom");

const isUserUnique = async (request, h) => {
    const userCheck = await user.findOne({ 
        $or: [
            { username: request.payload.username },
            { email: request.payload.email }
        ]
    }).exec();
    
    if(!userCheck) return request.payload;

    const error = Boom.badData();
    error.output.payload["registered"] = false;
    error.output.payload["failed"] = (userCheck.username === request.payload.username) ? "username" : "email";

    return error;
}

module.exports = { isUserUnique };