const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction.js')
const dayjs = require('dayjs')
require('dayjs/plugin/customParseFormat');
const currentDateTime = dayjs();



const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: String,
            default: currentDateTime.format('MMM DD, YYYY [at] h:mm A')       
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