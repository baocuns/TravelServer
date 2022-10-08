
const site = require('./site')
const auth = require('./auth')
const area = require('./area')
const event = require('./event')

function route(app) {
    app.use('/api/v1/event', event)
    app.use('/api/v1/area', area)
    app.use('/api/v1/auth', auth)
    
    // default
    app.use('/api/v1/', site)
    app.use('/', site)
}

module.exports = route