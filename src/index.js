const path = require('path')
const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')

const app = express()
const port = 80
app.use(cookieParser())

const route = require('./routes')
const db = require('./database/config/config')

//connect db
db.connect()

// Middleware
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})




