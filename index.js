const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDB = require('./Connection/Connection')
const dotenv = require('dotenv')
const admin = require('./Routes/admin')
const users = require('./Routes/users')

dotenv.config()
app.use(cors())
app.use(bodyParser.json())

connectDB()

app.use('/admin', admin)
app.use('/user', users)

app.listen(process.env.port, () => {
    console.log("Server is up and running already at " + process.env.port )
})