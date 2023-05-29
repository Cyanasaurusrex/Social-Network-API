const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: mongoose.Types.ObjectId
        }
    }
)

const Reaction = mongoose.model('reaction', reactionSchema)

module.exports = Reaction