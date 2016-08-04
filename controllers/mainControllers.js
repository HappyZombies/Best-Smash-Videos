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

exports.getCharacterInfo = function(connection, series, character_slug, callback){
    var sql  = "SELECT * FROM `"+series+"` WHERE `characters` = "+connection.escape(character_slug) + " AND `votes` > -5";
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