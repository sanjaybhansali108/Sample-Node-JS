const mongoose = require('mongoose');

const { Schema } = mongoose;

let adminSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
}, { collection: 'admin', timestamps: true, versionKey: false});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;