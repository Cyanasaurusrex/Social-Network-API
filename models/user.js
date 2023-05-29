const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const User = model('User', userSchema);


module.exports = User
