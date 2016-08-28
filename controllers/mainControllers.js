var fs = require('fs');


exports.getImages = function(series) {
    var img = [];
    console.log("Getting images ");
    fs.readdir('public/assets/img/sprites/' + series, function (err, files) {
        if (err) throw err;
        files.forEach(function(file){
           img.push(file);
        });
    });
    return img;
};

exports.getCharacterInfo = function(connection, series, character_slug, filter, callback){
    var sql = "";
    if(filter == 'top'){
        // Top, let's sort by vote.
        sql  = "SELECT * FROM `"+series+"` WHERE `characters` = "+connection.escape(character_slug) + " AND `votes` > -5 ORDER BY `votes` DESC";
    }else{
        // Something besides top was specified...whatever it was we don't care, just sort it by new.
        sql  = "SELECT * FROM `"+series+"` WHERE `characters` = "+connection.escape(character_slug) + " AND `votes` > -5 ORDER BY `date` DESC";
    }

    var data = [];
    console.log("Going to retrieve video content");
    connection.query(sql, function(err, res, fld ){
        if(err) return "SQL ERROR! on getting character Info";
        callback(false, res);
    });
    return data;
};

exports.updateVideo = function(connection, series, id, newVote){
    var sql = "UPDATE `" + series + "` SET `votes` =  "+newVote+" WHERE `id` = "+id;
    console.log("Updating video...");
    connection.query(sql);
};

exports.addVideo = function(connection, data){
    console.log("Inside mainControoler...");
    var sql = "INSERT INTO "+data.series+" " +
        "(title, url, characters, votes, display, date) " +
        "VALUES ("+connection.escape(data.title)+","+connection.escape(data.url)+","+connection.escape(data.character)+","+connection.escape(data.votes)+","+connection.escape(data.display)+","+connection.escape(new Date())+")";
    connection.query(sql);
};