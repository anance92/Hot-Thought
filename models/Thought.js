const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ThoughtSchema = new Schema({
    thoughtText : {
        type: String,
        required: 'Thought Text is Required',
        min: 1,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username : {
        type: String,
        required: 'Username is Required'
    },
    reactions : [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
});

// get total count of Reactions using Virtual
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;