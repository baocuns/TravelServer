

const SimpleImages = (req, array) => {
    if (!array || array.lenght == 0) return null
    const url = req.protocol + '://' + req.get('host') + '/api/v1/views/show/photos/'
    let photos = []
    array.map(images => images.data.map(image => {
        photos.push(url + image.title)
    }))
    return photos
}

const SimpleArrayPhotos = (req, result) => {
    
    result.map(obj => {
        const { images } = obj
        obj.images = SimpleImages(req, images)
    })
}

module.exports = { SimpleImages, SimpleArrayPhotos }