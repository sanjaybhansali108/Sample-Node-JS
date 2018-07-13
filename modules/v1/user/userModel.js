const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        enum: ['M', 'F']
    },
    dob: {
        type: String
    },
    password: {
        type: String
    },
    isActive: {
      type: Boolean,
      default: true,
    }
}, { collection: 'user', timestamps: true, versionKey: false});

const User = mongoose.model('user', userSchema);

module.exports = User