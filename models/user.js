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
    secretKey: {
         type: String,
         default: null
    },
    totpStatus: {
        type: Boolean,
        default: false
    },
    created_at: {
        default: Math.floor((new Date()).getTime() / 1000),
        type: Number
    },
    description: {
        type: String,
        default: "No description yet."
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isModerator: {
        type: Boolean,
        default: false
    },
    isDisabled: {
        default: false,
        type: Boolean
    },
    sessions: {
        type: Array,
        default: []
    },
    totpSessions: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('user', userModel, 'users');