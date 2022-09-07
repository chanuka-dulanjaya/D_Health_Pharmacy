const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedback = new Schema({
    username: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    Feedback: {
        type: String,
        required: true
    },
    FeedbackType: {
        type: String,
        required: true
    },
    FeedBackAbout: {
        type: String,
        required: true
    },
    feedbackId: {
        type: String,
        required: true
    },
}, {
timestamps: true
});
const feedback_Schema = mongoose.model('feedback', feedback);
module.exports = feedback_Schema;