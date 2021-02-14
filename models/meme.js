const mongoose = require('mongoose');
const validator = require('validator');

var MemeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        required: true
    },
    url: {
        type: String,
        required: true,
        validate: {
            validator: validator.isURL,
            message: `{VALUE} is not a valid url`
        }
    },
    caption: {
        type: String,
        required: true,
        minlength: 1
    }
});

var Meme = mongoose.model('Meme', MemeSchema);

module.exports = { Meme };