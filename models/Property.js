const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose schema for a property 

const PropertySchema = new Schema({
    property_name: {
        type: String,
        required: true
    },
    contact_email: {
        type: String,
        required: true
    },
    contact_phone: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [{
            type: String
        }]
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    address: {
        country: String,
        state: String,
        district: String,
        locality: String,
        pincode: Number,
    }
    // please check images its empty for now
    // images: {
    //     type: [{
    //         data: Buffer,
    //         contentType: String
    //     }]
    // }
}, { timestamps: true });

const Property = mongoose.model('Property', PropertySchema);
module.exports = Property