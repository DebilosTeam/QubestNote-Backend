const { user } = require("../../models");
const { errorResponse } = require("../responses");

const isUserUnique = async (request, h) => {
    const userCheck = await user.findOne({ 
        $or: [
            { username: request.payload.username },
            { email: request.payload.email }
        ]
    }).exec();
    
    if(!userCheck) return request.payload;

    return await errorResponse(h, 400, 
        (userCheck.username === request.payload.username) ? "username_already_registered" : "email_already_registered");
}

module.exports = { isUserUnique };