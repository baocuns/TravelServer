const path = require('path')
const express = require('express')
const session = require('express-session')
require('dotenv').config()

const app = express()
const port = 3000

const route = require('./routes')

// Middleware
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())


// Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))

// route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})




