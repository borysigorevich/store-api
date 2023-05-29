const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide username'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model('User', userSchema)