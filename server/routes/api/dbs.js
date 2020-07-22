const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req,res,next){

	res.setHeader('Access-Control-allow-origin', '*');
	res.setHeader('Access-Control-allow-Methods', 'GET,POST,PUT,DELETE');
	res.setHeader('Access-Control-allow-HEADERS', '*');
	next();
});

//app.use(require("cors")); il remplace les 4 lignes precedentes 

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectId;
const url = "mongodb://localhost:27017";
MongoClient.connect(url, {useNewUrlParser:true}, {useUnifiedTopology: true}, (err, client) => {
	let db = client.db("SUPERVENTES");

/*listes des produits*/
if (err) {
        console.log('Sorry unable to connect to MongoDB Error:', err);
    } else {
        console.log("connected")}})