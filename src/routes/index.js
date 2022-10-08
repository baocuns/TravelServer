
const site = require('./site')
const auth = require('./auth')

function route(app) {
    app.use('/api/v1/auth', auth)
    
    app.use('/api/v1/', site)// default
}

module.exports = route