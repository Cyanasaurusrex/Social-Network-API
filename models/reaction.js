const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: () => new Date()
        }
    }
)

const Reaction = mongoose.model('reaction', reactionSchema)

module.exports = Reaction