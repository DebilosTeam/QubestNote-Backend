const errorResponse = async (h, errCode, failure = null, data = {}) => {
    return (
        await h.response(
            {
                success: false,
                failure: failure,
                data: data
            }
        ).code(errCode).takeover()
    )
}

const successResponse = async (h, data = {}) => {
    return (
        await h.response(
            {
                success: true,
                data: data
            }
        ).code(200)
    )
}

module.exports = { errorResponse, successResponse }