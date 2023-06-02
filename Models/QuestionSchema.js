const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({

    subjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',

    },


    sectionID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    },

    
    question: {
        type: String,
    },

    options: {
        type: [String],
    },

    answer: {
        type: String,
    }
})

const question = mongoose.model('question', questionSchema);

module.exports = question;