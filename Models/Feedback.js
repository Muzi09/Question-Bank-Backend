const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedback: {type: String}
})

const feedback = mongoose.model('feedback', feedbackSchema);

module.exports = feedback;