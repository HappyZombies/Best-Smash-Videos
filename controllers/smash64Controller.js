var bodyParser 			= require("body-parser");
var urlencodedParser 	= bodyParser.urlencoded({extended: false});
var tools 				= require('./mainControllers');
var character_images    = tools.getImages('smash64');



module.exports = function(app, connection){

	

	app.get('/smash64', function(req, res){
		res.render('smash64', {images: character_images});
	});

	app.get('/smash64/:character', function(req, res){

		//Do connection, grab info.
        //Is this okay ? Eh it works.
        
        tools.getCharacterInfo(connection, "videos64", req.params.character, function(req, response){
            res.render('characters64', {character_videos: response, images: character_images}); 
        });
	});

	// app.post('/todo', urlencodedParser, function(req, res){
	
	// });

};