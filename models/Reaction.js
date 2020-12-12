const { Schema , Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
    reactionId : {
        default: () => new Types.ObjectId(),
        type: Schema.Types.ObjectId
    },
    reactionBody : {
        type: String,
        required: 'Reaction Body is Required',
        max: 280
    },
    username : {
        type: String,
        required: 'Username is Required'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

// export Reaction Schema
module.exports = ReactionSchema;