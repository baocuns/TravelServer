const userRouter = require('./user')
const siteRouter = require('./site')
const auth = require('./auth')
const tours = require('./tours')
const area = require('./area')
const event = require('./event')

function route(app) {
    app.use('/event', event)
    app.use('/area', area)
    app.use('/tours', tours)
    app.use('/auth', auth)
    app.use('/user', userRouter)
    app.use('/', siteRouter)
}

module.exports = route