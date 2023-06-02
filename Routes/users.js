const express = require('express')
const users = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')


const subject = require('../Models/SubjectSchema')
const section = require('../Models/SectionsSchema')
const question = require('../Models/QuestionSchema')
const feedback = require('../Models/Feedback')
const User = require('../Models/Signup')


users.use(bodyParser.json())



users.get('/subjects', async (req, res) => {
  try {
    const data = await subject.find()
    res.status(200).json({
      data,
      message: "Subject fetched successfully"
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})



users.get('/subject/:subjectId/sections', async (req, res) => {
  try {


    const subjectId = req.params.subjectId

    const foundSubject = await subject.findById(subjectId)

    if (!foundSubject) {
      return res.status(404).json({
        message: 'Subject not found'
      })
    }

    const sections = await section.find({ subjectID: subjectId })

    res.status(200).json({
      data: sections,
      message: 'Questions fetched successfully'
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})




users.get('/subject/:subjectId/section/:sectionId/questions', async (req, res) => {
  try {

    const subjectId = req.params.subjectId
    const sectionId = req.params.sectionId

    const foundSubject = await subject.findById(subjectId)
    const foundSection = await section.findById(sectionId)

    if (!foundSubject) {
      return res.status(404).json({
        message: 'Subject not found'
      })
    }

    if (!foundSection) {
      return res.status(404).json({
        message: 'Section not found'
      })
    }


    const questions = await question.find({
      subjectID: subjectId,
      sectionID: sectionId
    })

    res.status(200).json({
      data: questions,
      message: 'Questions fetched successfully'
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})



users.post('/contact/feeback', async (req, res) => {
  try {
    const data = await feedback.create(req.body)
    res.status(201).json({
      message: "Feedback posted",
      data
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})


users.get("/feedback", async (req, res) => {
  try {
    const data = await feedback.find()
    res.status(201).json({
      message: "Feedback fetched",
      data
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})






users.post('/login', async (req, res) => {

  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: 'User not found, Please log in with registered email'
      })
    }

    const passwordMatches = await bcrypt.compare(password, user.password)

    if (!passwordMatches) {
      return res.status(401).json({
        message: 'Invalid credentials, Please enter registered email & password'
      })
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET)

    res.status(200).json({
      message: 'Logged in successfully',
      token
    })
  }

  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})






users.post('/signup', async (req, res) => {

  const { name, email, password, confirmPassword } = req.body

  const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        message: 'User with this email already exists'
      })
    }


  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds)
  let hashedPassword = await bcrypt.hash(password, salt)

  let newUser = {
    name: name,
    email: email,
    password: hashedPassword
  }

  try {
    let data = await User.create(newUser)
    res.status(201).json({
      message: 'User registered successfully',
      data
    })
  }

  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})








module.exports = users