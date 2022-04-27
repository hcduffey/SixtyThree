const mongoose = require('mongoose');
const validator = require('mongoose-validator')
const Schema = mongoose.Schema;

const ratingSchema = Schema({
    rating: {
        type: number,
        min: [0, 'ratings must not be below zero'],
        required: [true, 'a rating is required for ratings']
    },
    comment: {
        type: String,
        trim: true,
    },
    user: {
        type: ObjectId,
        required: [true, 'a user is required for ratings']
    },
    park: {
        type: ObjectId,
        required: [true, 'a park is required for ratings']
    }
}, {timestamps: true});

const Park = mongoose.model("Park", parkSchema);
module.exports = Park;
