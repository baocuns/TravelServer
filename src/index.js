const path = require('path')
const express = require('express')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()
const port = 80
const route = require('./routes')

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')))
const db = require('./database/config/config')

//connect db
db.connect()

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(express.urlencoded({
//   extended: true
// }))
// app.use(express.json())


// route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})




