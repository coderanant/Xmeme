var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = { mongoose };

// var MemeSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         minlength: 1,
//         required: true
//     },
//     url: {
//         type: String,
//         required: true
//     },
//     caption: {
//         type: String,
//         required: true,
//         minlength: 1
//     }
// });

// var Meme = mongoose.model('Meme', MemeSchema);

// var meme = new Meme({
//     url: 'wwjnrfin',
//     caption: 'iniwjf',
//     name: 'Anant'
// });

// meme.save().then((doc) => {
//     console.log('doc');
// }).catch((e) => {
//     console.log(e);
// });

// process.env.NODE_ENV