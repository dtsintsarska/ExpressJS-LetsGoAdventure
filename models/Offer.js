const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const {
    String,
    Number,
    Boolean,
    ObjectId
} = Schema.Types;

const offerSchema = new Schema({
    destination: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    guide: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    participants: [{
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        id: {
            type: ObjectId,
            ref: "User"
        }
    }],
    seats: {
        type: Number,
        required: true,

    },
    galery: [{
        type: String
    }],
    comments: [{
        comment: {
            type: String,
            required: true
        },
        author: {
            type: ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: {
        createdAt: 'created_at'
    }
});

module.exports = new Model('Offer', offerSchema);