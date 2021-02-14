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
        res.send(doc);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});