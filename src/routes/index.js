
const site = require('./site')
const auth = require('./auth')
const area = require('./area')
const event = require('./event')
const permission = require('./permission')
const rating = require('./rating')
const tour = require('./tour')
const upload = require('./upload')
const views = require('./views')

function route(app) {
    app.use('/api/v1/views', views)
    app.use('/api/v1/upload', upload)
    app.use('/api/v1/tour', tour)
    app.use('/api/v1/rating', rating)
    app.use('/api/v1/permission', permission)
    app.use('/api/v1/event', event)
    app.use('/api/v1/area', area)
    app.use('/api/v1/auth', auth)
    
    // default
    app.use('/api/v1/', site)
    app.use('/', site)
}

module.exports = route