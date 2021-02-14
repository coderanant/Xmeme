require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Meme } = require('./models/meme');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/memes', (req, res) => {
    var meme = new Meme({
        name: req.body.name,
        url: req.body.url,
        caption: req.body.caption
    });

    meme.save().then((doc) => {
        res.send({'id': doc._id});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/memes', (req, res) => {
    Meme.find().sort({_id:-1}).limit(100).then((doc) => {
        var memes = [];
        doc.forEach((i) => {
            console.log(i);
            var meme = {
                'id': i._id,
                'name': i.name,
                'url': i.name,
                'caption': i.caption
            };
            // console.log(meme);
            memes.push(meme);
        });
        res.send(memes);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});