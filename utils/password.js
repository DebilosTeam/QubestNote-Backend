const argon2 = require("argon2");

const hashPassword = async (password) => {
    const hash = await argon2.hash(password);
    return hash;
}

const comparePassword = async (password, hash) => {
    return await argon2.verify(hash, password);
}

module.exports = { hashPassword, comparePassword };