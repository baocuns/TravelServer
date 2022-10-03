const DB = require('../models')
const fetch = require('node-fetch')

class Event {

    // [GET] /event
    index(req, res, next) {
        res.send({ admin: 'API Event' })
    }

    // [GET] /event/update
    async update(req, res, next) {
        // xoa bo moi thu
        try {
            await DB.Event.destroy({
                truncate: true
            })
        } catch (error) {}

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
                    start: e.start,
                    end: e.end,
                    location: e.location[0].toString() + ',' + e.location[1].toString(),
                    slug: 'chua-co'
                }
                try {
                    list.push(body)
                } catch (error) {
                    console.log(error);
                }

            });
            try {
                await DB.Event.bulkCreate(list)
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
    }

    //[GET] /event/show
    async show(req, res, next) {
        await DB.Event.findAll()
            .then(result => res.send(result))
            .catch(next)
    }

    //[GET] /event/destroy
    async destroy(req, res, next) {
        await DB.Event.destroy({
            truncate: true
        })
            .then(result => res.send({
                admin: 'Cuns',
                messages: 'DestroySuccessfully !'
            }))
            .catch(next)
    }
}

module.exports = new Event
