const mongoose = require('mongoose')




const dogSchema = new mongoose.Schema({
    name: String,
    breed: String,
    image: String
})

const DogModel = mongoose.model('Dog', dogSchema)

module.exports = DogModel