const express = require('express')
const mongoose = require('mongoose')
const admin = express.Router()
const section = require('../Models/SectionsSchema')
const question = require('../Models/QuestionSchema')
const subject = require("../Models/SubjectSchema")




admin.post('/subject', async (req, res) => {
  try {
    const data = await subject.create(req.body)
    res.status(201).json({
      data,
      message: "Subject created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})





admin.post('/subject/section', async (req, res) => {
  try {
    const subjectId = req.body.subjectID;
    const foundSubject = await subject.findById(subjectId)

    if (!foundSubject) {
      return res.status(404).json({
        message: 'Subject not found',
      })
    }

    const data = await section.create(req.body);
    res.status(201).json({
      data,
      message: "Section created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
})





admin.post('/subject/section/question', async (req, res) => {
  try {

    const subjectId = req.body[0].subjectID
    const sectionId = req.body[0].sectionID
    
    
    const foundSubject = await subject.findById(subjectId)
    const foundSection = await section.findById(sectionId)

    
    if (!foundSubject) {
      return res.status(404).json({
          message: 'Subject not found',
        })
      }

    if (!foundSection) {
    return res.status(404).json({
        message: 'Section not found',
      })
    }


    const data = await question.create(req.body)
    res.status(201).json({
      data,
      message: "Question created successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
})






admin.delete('/subject/:id', async (req, res) => {
  try {
    const subjectId = req.params.id;

    const deletedQuestions = await question.deleteMany({ subjectID: subjectId });
    const deletedSections = await section.deleteMany({ subjectID: subjectId });
    const deletedSubject = await subject.findByIdAndDelete(subjectId);

    if (!deletedSubject) {
      return res.status(404).json({
        message: 'Subject not found',
      })
    }

    res.status(200).json({
      message: 'Subject and associated sections deleted successfully',
      deletedSections: deletedSections.deletedCount,
      deletedQuestions: deletedQuestions.deletedCount
    })
  } 
  catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
})








admin.delete('/subject/section/:id', async (req, res) => {
  try {
    const sectionId = req.params.id;
    const deletedQuestions = await question.deleteMany({ sectionID: sectionId });
    const deletedSection = await section.findByIdAndDelete(sectionId);

    if (!deletedSection) {
      return res.status(404).json({
        message: 'Section not found',
      });
    }

    res.status(200).json({
      message: 'Section and associated questions deleted successfully',
      deletedQuestions: deletedQuestions.deletedCount,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
})




admin.delete('/subject/section/question/:id', async (req, res) => {
  try {
    const questionId = req.params.id
    console.log(questionId)
    const deletedQuestion = await question.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res.status(404).json({
        message: 'Question not found',
      });
    }

    res.status(200).json({
      message: 'Question deleted successfully',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    })
  }
})


admin.get('/sectionName/:id', async (req, res) => {
  try {
    const sectionId = req.params.id
    const data = await section.findById(sectionId)

    res.status(200).json({
      data, 
      message: "Successfully fetched the section name"
    })
  }

  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})





admin.get('/subjectName/:id', async (req, res) => {
  try {
    const subjectId = req.params.id
    const data = await subject.findById(subjectId)

    res.status(200).json({
      data, 
      message: "Successfully fetched the section name"
    })
  }

  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})



module.exports = admin