const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 180,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatTime
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], s
        // Use a getter method to format the timestamp on queryß
    },
    {
        toJSON : {
            virtuals: true,
        },
        id: false,
    }
)

function formatTime(date) {

}


module.exports = Thought;