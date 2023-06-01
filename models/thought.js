const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction.js')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString()
        },    
        username: {
            type: String,
            required: true
        },
        reactions: []
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length
})

const thought = model('thought', thoughtSchema);

module.exports = thought