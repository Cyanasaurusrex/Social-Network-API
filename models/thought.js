const { Schema, model } = require('mongoose');

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
            // TODO finish date formatting
        },
        username: {
            type: String,
            required: true
        },
        reactions: {
            // TODO implement nested documents created from reaction schema
        }
    }
)

const thought = model('thought', thoughtSchema);

module.exports = thought