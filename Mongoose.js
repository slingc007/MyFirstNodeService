var express = require('express');

var app = express();


app.get('/user',function(req,res){
	// Retrieve
var MongoClient = require('mongodb').MongoClient;


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {
  if(!err) {
   
   db.collection('user', function(err, collection) {
   
		if (err) {
			throw err;
		} else {
		
		  collection.find({}, {
			  'name': true,
			  'password': true
			})
		   
			.each(function(err, doc) {
				if(doc){
					res.send(doc);
					response=doc;
					console.log(doc);
				}
			})
		}
		});
	}
});
})


var bodyParser     =        require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/login', function(req, res) {
	
	console.log(req.body);
	var user = req.body.user;
    var password = req.body.password;
 
    res.send( user + ' ' + password );
});

var account;
var entity = require('./Entity/Entities.js');

app.post('/Autenticate',function(req,res){

	var user = req.body.user;
    var password = req.body.password;

	account=new entity(user,password);

	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {

	if(!err) {
   
	db.collection('user', function(err, collection) {
   
		if (err) {
			throw err;
		} else {
		
		  collection.find({}, {
			  'name': true,
			  'password': true
			})
		   
			.each(function(err, doc) {
				if(doc){

				console.log(doc.name +" - "+account.UserName);
				
					if(doc.name)
					{
						if(doc.name==account.UserName )
						{
							res.send(true);
						}else
						{
							res.send(false);
						}
					}
				}
			})
		}
		});
	}
});
})


app.post('/AutenticateII',function(req,res){

	var user = req.body.user;
    var password = req.body.password;

	account=new entity(user,password);

	var MongoClient = require('mongodb').MongoClient;

	MongoClient.connect("mongodb://localhost:27017/test_user", function(err, db) {

	if(!err) {
   
	db.collection('user', function(err, collection) {
   
		if (err) {
			throw err;
		} else {
		
		  collection.find({ name : account.UserName}, {
			  'name': true,
			  'password': true
			})
		   
			.each(function(err, doc) {
				
				if(doc){
				console.log(doc);
				console.log(doc.password +" - "+account.Password);
				
					 if(doc.name)
					 {
						 if(doc.password==account.Password )
						 {
							 res.send(true);
						 }
					 }
				}
				
				res.send(false);
			})
		}
		});
	}
});
})


app.listen(3000);
console.log('Listening on port 3000...');