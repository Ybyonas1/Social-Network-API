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
            // NEED ASSISTANCE HERE
            // Use a getter method to format the timestamp on query
            get: formatTime
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
        // NEED ASSISTANCE HERE
        // Use a getter method to format the timestamp on query
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)

function formatTime(date) {

}

const Thought = model('thought ', thoughtSchema);

module.exports = Thought;