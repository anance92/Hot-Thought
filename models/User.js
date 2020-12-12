const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    username : {
        type: String,
        unique: true,
        required: 'Username is Required',
        trim: true
    },
    email : {
        type: String,
        required: 'Email is Required',
        unique: true,
        validate: {
          validator: function(v) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
            .test(v);
          },
          message: props => `${props.value} is not a valid email!`
        }
    },
    thoughts : [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends : [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

// get total count of Friends using Virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;