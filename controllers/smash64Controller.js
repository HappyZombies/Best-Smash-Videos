var bodyParser 			= require("body-parser");
var urlencodedParser 	= bodyParser.urlencoded({extended: false});
var tools 				= require('./mainControllers'); //different name ? I suck at names.
var character_images    = tools.getImages('smash64');




var all_characters = function(images){
    var character = [];
    for(var i = 0; i < images.length; i++){
        character.push(images[i].substr(0, images[i].lastIndexOf('.')));
    }
    return character;
};


module.exports = function(app, connection){

	app.get('/smash64', function(req, res){
        console.log("Request made to smash64");
		res.render('smash64', {images: character_images});
	});

	app.get('/smash64/:character', function(req, res){
        if(!(all_characters(character_images).indexOf(req.params.character) > -1)){
            console.log("/"+req.params.character+" NOT found! Redirecting");
            res.render('404');
            return false;
        }

        console.log("Request made to "+req.params.character);
        //Is this okay ? Eh it works.
        tools.getCharacterInfo(connection, "videos64", req.params.character, function(req, response){
            console.log("Getting video");
            res.render('characters64', {character_videos: response, images: character_images}); 
        });


	});

	// app.post('/todo', urlencodedParser, function(req, res){
	
	// });

	app.post('/smash64/:character', urlencodedParser, function(req, res){
		console.log("Post 'submitted'! Let's see...let us update the video");
		tools.updateVideo(connection, "videos64", req.body.id, req.body.count);
	});

};