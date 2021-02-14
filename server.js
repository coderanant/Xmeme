require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

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
        res.send({ 'id': doc._id });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/memes', (req, res) => {
    Meme.find().sort({ _id: -1 }).limit(100).then((doc) => {
        var memes = [];
        doc.forEach((i) => {
            memes.push({
                'id': i._id,
                'name': i.name,
                'url': i.url,
                'caption': i.caption
            });
        });
        res.send(memes);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.get('/memes/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Meme.findOne({
        _id: id
    }).then((meme) => {
        if (!meme) {
            return res.status(404).send();
        }

        res.send({
            id: meme._id,
            name: meme.name,
            url: meme.url,
            caption: meme.caption
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/memes/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['url', 'caption']);

    if (!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    Meme.findOneAndUpdate({
        _id: id
        }, {$set: body}, {new: true}).then((meme) => {
        if(!meme) {
            return res.status(404).send();
        }

        res.send({
            id: meme._id,
            name: meme.name,
            url: meme.url,
            caption: meme.caption
        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});