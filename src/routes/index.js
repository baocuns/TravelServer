
const site = require('./site')
const auth = require('./auth')

function route(app) {
    app.use('/api/v1/auth', auth)
    
    // default
    app.use('/api/v1/', site)
    app.use('/', site)
}

module.exports = route