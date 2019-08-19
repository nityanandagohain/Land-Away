const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    property_owned: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }]
    },

    // For later part
    property_interacted: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Property'
        }]
    }
});


const User = mongoose.model("User", UserSchema);
module.exports = User;