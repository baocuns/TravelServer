
class SiteController {

    // [GET] /home
    index(req, res) {
        res.send({
            admin: 'Cuns',
            messages: 'Why did you get lost here? Why!',
        })
    }

}

module.exports = new SiteController