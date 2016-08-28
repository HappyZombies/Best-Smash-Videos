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

	app.get('/smash64/:character/:filter?', function(req, res){
        console.dir(req.params);
        console.log("Request made to "+req.params.character);
        if(!(all_characters(character_images).indexOf(req.params.character) > -1)){
            console.log("/"+req.params.character+" NOT found! Redirecting");
            res.render('404');
            return false;
        }
        if(req.params.filter == undefined || req.params.filter == 'new' || req.params.filter == 'top'){
            // Sort by newest.
            console.log("Sorting by newest")
            //Is this okay ? Eh it works.
            tools.getCharacterInfo(req, res, connection, "videos64", req.params.character, req.params.filter, function(req, response){
                console.log("Getting video");
                res.render('characters64', {character_videos: response.results, images: character_images, pagination: response.pagination});
            });
        }else{
            // 404 error. They gave us something that does not exist.
            console.log("/"+req.params.character+" NOT found! Redirecting");
            res.render('404');
            return false;
        }



	});

	// app.post('/todo', urlencodedParser, function(req, res){
	
	// });

	app.post('/smash64/:character', urlencodedParser, function(req, res){
		console.log("Upvote 'submitted'! Let's see...let us update the video");
		tools.updateVideo(connection, "videos64", req.body.id, req.body.count);
	});

    app.post('/smash64/:character/submit', urlencodedParser, function(req, res){
        console.log("Going to add video!");
        var obj = {};
        obj = req.body;
        obj.series = 'videos64';
        obj.character = req.params.character;
        obj.votes = 0;
        obj.display = 1; //TODO , is display even needed ? Look into.
        tools.addVideo(connection, obj);
        res.send(req.body); //Important!
    });

};