var fs = require('fs');


exports.getImages = function(series) {
    var img = [];
    fs.readdir('public/assets/img/sprites/' + series, function (err, files) {
        if (err) throw err;
        files.forEach(function(file){
           img.push(file);
        });
    });
    return img;
};

exports.getCharacterInfo = function(connection, series, character_slug, callback){
    var sql  = "SELECT * FROM `"+series+"` WHERE `characters` = "+connection.escape(character_slug);
    var data = [];
    connection.query(sql, function(err, res, fld ){
        if(err) return "SQL ERROR!";
        console.dir(connection);
        callback(false, res);
    });
    return data;
};