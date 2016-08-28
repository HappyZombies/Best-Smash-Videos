/******
 * 	Smash Bro Videos , http://smashbrovideos.com
 * 	Creator: Daniel Reguero
 * 	Contact: daniel.reguero@gmail.com
 * 	All code made by me. That's why it sucks.
 * 	I do not own anything Nintendo related.
 */
/***
 * TODO:
 * -Look into display column.
 * -More options... if, for example, the video is a tournament and we'd like to specify the player.
 * -Some sort of search functionality ?
 *
 */
var express 			= require('express');
var mysql 				= require('mysql');
var app 				= express();
var smash64Controller 	= require('./controllers/smash64Controller');
var meleeController 	= require('./controllers/meleeController');

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
		console.log("Cannot connect to database!");
		console.log(error);
		process.exit(code=0);
	}
	console.log("Connected to database!");
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

//	Fire our controllers
smash64Controller(app, connection);
meleeController(app, connection);

// 404
app.get('*', function(req, res){
	res.render('404');
});

//	Listen to port
app.listen(3000);
console.log("You are listening to port 3000");