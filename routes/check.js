const check = async (request, h) => {
    return {debug: "YAY! Auth worked!"}
}

module.exports = {
    method: 'GET',
    path: '/check',
    handler: check
}