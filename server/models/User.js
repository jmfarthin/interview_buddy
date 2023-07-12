const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        chats: [{
            type: Schema.Types.ObjectId,
            ref: 'Chat'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET || 'mysecretssshhhhhhh');
};

userSchema.statics.findUser = function (decodedToken) {
    return this.findById(decodedToken._id);
  }; 

const User = model('User', userSchema);

module.exports = User;