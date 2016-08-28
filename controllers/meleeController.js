var bodyParser 			= require("body-parser");
var urlencodedParser 	= bodyParser.urlencoded({extended: false});
var tools 				= require('./mainControllers'); //different name ? I suck at names.
var character_images    = tools.getImages('melee');
var all_characters = function(images){
    var character = [];
    for(var i = 0; i < images.length; i++){
        character.push(images[i].substr(0, images[i].lastIndexOf('.')));
    }
    return character;
};

module.exports = function(app, connection){

	app.get('/melee', function(req, res){
        console.log("Request made to home page of smash64");
		res.render('melee', {images: character_images});
	});

	app.get('/smash64/:character/:filter?', function(req, res){
        console.log("Request made to "+req.params.character);
        //If smash64 is not a character, redirect to 404
        if(!(all_characters(character_images).indexOf(req.params.character) > -1)){
            console.log("/"+req.params.character+" NOT found! Redirecting");
            res.render('404');
            return false;
        }
        if(req.params.filter == undefined || req.params.filter == 'new' || req.params.filter == 'top'){
            console.log("Sorting by "+req.params.filter);

            //Is this okay ? Eh it works.
            tools.getCharacterInfo(req, connection, "videos64", function(req, response){
                console.log("Getting videos, prepering to render.");
                //Redirect if user goes beyond pagination limit.
                console.dir(response.pagination.totalPages);
                res.render('characters64', {character_videos: response.results, images: character_images, pagination: response.pagination});
            });
        }else{
            // 404 error. They gave us something that does not exist.
            console.log("/"+req.params.character+" NOT found! Redirecting");
            res.render('404');
            return false;
        }

	});

	app.post('/smash64/:character', urlencodedParser, function(req, res){
		console.log("Upvote 'submitted'! Let's see...let us update the video");
		tools.updateVideoVote(connection, "videos64", req);
        res.send(req.body);
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