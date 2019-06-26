var express = require('express');
const assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'iss';
const client = new MongoClient(url);
var db = null;
var collection = null;


client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client.db(dbName);
    collection = db.collection('coordinates');

    // collection.find().toArray(function(err, docs) {
    //     assert.equal(err, null);
    //     for(var i = 0; i < docs.length; i++) {
    //         console.log(docs[i].lat + ' ' + docs[i].long);
    //     }
    // });

    // client.close();
});

var app = express();


app.use( express.static( "public" ) );

app.get('/', function(req, res) {
    collection.find().toArray(function(err, coordinates) {
        assert.equal(err, null);
        res.render('index.ejs', {coordinates: coordinates});
    });
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Error 404, page not found.');
});

app.listen(8080);
