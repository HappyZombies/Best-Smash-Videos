var express 			= require('express');
var mysql 				= require('mysql');
var app 				= express();
var smash64Controller 	= require('./controllers/smash64Controller');

//	Set up template engine 
app.set('view engine', 'ejs');

//	Static files
app.use(express.static('./public'));

//Connect to the database

var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'smash'
});

connection.connect(function(error){
	if(error){
		console.log("Cannot connect to database");
		console.log(error);
		process.exit(code=0);
	}
	console.log("connected to database!");
});

//	Home page is purely static, for now. 
//	Home page does not need controller (or does it ?)
//	Static pages ?
app.get('/', function(req, res){
	console.log("index was called.");
	res.render('index');
});

app.get('/about', function(req, res){
	console.log("about was called.");
	res.render('about');
});

//	Fire controllers

smash64Controller(app, connection);

//	Listen to port

app.listen(3000);
console.log("You are listening to port 3000");