const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true }
    },
    nickname: {
        type: String,
        required: true,
        index: { unique: true }
    },
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    secret_key: {
         type: String,
         default: null
    },
    twofa_enabled: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "user"
    },
    created_at: {
        default: Math.floor((new Date()).getTime() / 1000),
        type: Number
    },
    description: {
        type: String,
        default: "No description yet."
    },
    is_disabled: {
        default: false,
        type: Boolean
    },
    sessions: {
        type: Array,
        default: []
    },
    twofa_sessions: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('user', userModel, 'users');