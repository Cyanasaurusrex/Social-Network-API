const mongoose = require('mongoose');
const dayjs = require('dayjs')
require('dayjs/plugin/customParseFormat');
const currentDateTime = dayjs();

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId,
            default: new mongoose.Types.ObjectId
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
            type: String,
            default: currentDateTime.format('MMM DD, YYYY [at] h:mm A')    
        }        
    },
    {
        _id: false
    }
)

const Reaction = mongoose.model('Reaction', reactionSchema)

module.exports = Reaction