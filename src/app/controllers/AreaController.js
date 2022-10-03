const DB = require('../models')
// const fetch = require('node-fetch')

class Area {
    // [GET] /area
    async index(req, res, next) {
        res.send({admin: 'API Area'})
    }

    // [GET] /area/show
    async show(req, res, next) {
        await DB.Area.findAll()
            .then(result => res.send(result))
            .catch(next)
    }

    // [POST] /area/store
    async store(req, res, next) {
        const area = await DB.Area.create(req.body)
        res.send(area)
    }
}

module.exports = new Area


// const area = await fetch('https://provinces.open-api.vn/api/?fbclid=IwAR3kGW5-3wHMUNxVcEOCqgaIG0vWYbjrFoCZVJ_kQ8A2jgAJiw_nhdAyVzw')
// const js = await area.json()
// js.forEach(async e => {
//     const body = {
//         name: e.name,
//         type_region: e.code < 38 ? 1 : e.code < 70 ? 2 : 3,
//         slug: e.codename,
//     }
//     await DB.Area.create(body)
// });
// res.send('OK')