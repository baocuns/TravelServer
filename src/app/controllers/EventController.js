const Event = require('../models/Event')
const fetch = require('node-fetch')
const slug = require('slug')

const EventController = {
    // [GET] /
    index(req, res) {
        res.status(200).json({
            code: 0,
            status: true,
            msg: 'You need something to go on!'
        })
    },

    // [GET] /show/all/limit/skip
    all(req, res) {
        if (!req.params.limit || req.params.limit <= 0 || req.params.limit > 20) {
            return res.status(401).json({
                code: 0,
                status: false,
                msg: 'limit in not valid',
            })
        }
        if (!req.params.skip || req.params.skip < 0) {
            return res.status(401).json({
                code: 0,
                status: false,
                msg: 'skip in not valid',
            })
        }
        Event.find().limit(req.params.limit).skip(req.params.skip)
            .then(event => {
                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Get all event successfully!',
                    data: event
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Get all event failed!',
                    err: err
                })
            })
    },

    // [GET] /show/details/:slug
    details(req, res) {
        Event.findOne({
            slug: req.params.slug
        })
            .then(event => {
                if (!event) {
                    return res.status(404).json({
                        code: 0,
                        status: false,
                        msg: 'Get details event failed!',
                        data: event
                    })
                }

                res.status(200).json({
                    code: 0,
                    status: true,
                    msg: 'Get details event successfully!',
                    data: event
                })
            })
            .catch(err => {
                res.status(404).json({
                    code: 0,
                    status: false,
                    msg: 'Get details event failed!',
                    err: err
                })
            })
    },

    // [POST] /update
    async update(req, res) {

        // update
        const url = 'https://api.predicthq.com/v1/events/?country=VN&limit=20&offset=0';
        const insert = async (url) => {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer fqUP1ZrNg9KPPJQWWIquuxVUWcZNjpmYTGSfHRUi',
                    Accept: 'application/json',
                }
            })
            const data = await response.json()
            const list = []
            data.results.forEach(async e => {
                const body = {
                    title: e.title,
                    description: e.description,
                    category: e.category,
                    rank: e.rank,
                    time_start: e.start,
                    time_end: e.end,
                    location: {
                        longitude: e.location[0],
                        latitude: e.location[1],
                    },
                    slug: slug(e.title),
                }
                try {
                    list.push(body)
                } catch (error) {
                    console.log(error);
                }
            });

            try {
                await Event.insertMany(list)
            } catch (error) {
                console.log(error);
            }
            data.next && insert(data.next)
        }
        insert(url)
        res.send({
            err: 0,
            status: true
        })
    },
}

module.exports = EventController