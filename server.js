require('./config/config');

const _ = require('lodash');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var { mongoose } = require('./db/mongoose');
var { Meme } = require('./models/meme');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    Meme.find().sort({ _id: -1 }).limit(100).then((doc) => {
        var allMemes = "";
        doc.forEach((i) => {
            allMemes += `<div id = "${i._id}">
            <img src = "${i.url}" width="300" height="300">
            <h3>Submitted by : ${i.name}</h3>
            <p>Caption : ${i.caption} </p>
            </div>`
        });

        res.render('home.hbs', { allMemes });
    }).catch((e) => {
        res.status(400).send(e);
    });
});

app.post('/memes', (req, res) => {
    var name = req.body.name;
    var url = req.body.url;
    var caption = req.body.caption;

    var meme = new Meme({ name, url, caption });

    Meme.findOne({ name, url, caption }).then((doc) => {
        console.log(doc);
        if (doc) {
            return res.status(409).send();
        };
    }).then(() => {
        meme.save().then((doc) => {
            return res.send({ 'id': doc._id });
        }).catch((e) => {
            Promise.reject();
        });
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
    }, { $set: body }, { new: true }).then((meme) => {
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

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});