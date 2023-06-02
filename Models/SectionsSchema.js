const mongoose = require('mongoose')

const sectionsSchema = new mongoose.Schema({
    subjectID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    },
    sectionName: {type: String, required: true}

})

const section = mongoose.model('section', sectionsSchema)

module.exports = section