const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
}

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = { hashPassword, comparePassword };