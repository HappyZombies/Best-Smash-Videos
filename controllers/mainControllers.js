var fs = require('fs');

exports.getImages = function(series) {
    var img = [];
    console.log("Retrieving images");
    fs.readdir('public/assets/img/sprites/' + series, function (err, files) {
        if (err) throw err;
        files.forEach(function(file){
           img.push(file);
        });
    });
    return img;
};

exports.getCharacterInfo = function(request, connection, series, callback){
    var numRows;
    var numPerPage = 5; //five right now for testing.
    var page = parseInt(request.query.page, 10) || 0;
    var numPages;
    var skip = page * numPerPage;
    // Here we compute the LIMIT parameter for MySQL query
    var limit = skip + ',' + numPerPage;
    var sql = "";
    if(request.params.filter == 'top'){
        // Top, let's sort by vote.
        sql  = "SELECT * FROM `"+series+"` WHERE `characters` = "+connection.escape(request.params.character) + " AND `votes` > -5 ORDER BY `votes` DESC LIMIT "+limit;
    }else{
        // Something besides top was specified...whatever it was we don't care, just sort it by new.
        sql  = "SELECT * FROM `"+series+"` WHERE `characters` = "+connection.escape(request.params.character) + " AND `votes` > -5 ORDER BY `date` DESC LIMIT "+limit;
    }
    console.log(sql);
    // Code below was taken from https://github.com/gabhi/mysql-nodejs-pagination/blob/master/index.js , modifications were made to not use bluebird.
    connection.query("SELECT count(*) as numRows FROM "+(series)+" WHERE `characters`="+connection.escape(request.params.character), function(err, res, fld){
        if(err) return "SQL ERROR! on getting character Info";
        numRows = res[0].numRows;
        numPages = Math.ceil(numRows / numPerPage);
    });
    connection.query(sql, function(err, res, fld ){
        if(err) return "SQL ERROR! on getting character Info";
        var responsePayload = {
            results: res
        };
        if(page < numPages){
            responsePayload.pagination = {
                current: page,
                totalPages: numPages,
                perPage: numPerPage,
                previous: page > 0 ? page - 1 : undefined,
                next: page < numPages - 1 ? page + 1 : undefined
            }
        }else{
            responsePayload.pagination = {
                err: 'Queried page '+page+" is >= to max page number "+numPages
            }
        }
        callback(false, responsePayload);
    });
};

exports.updateVideoVote = function(connection, series, request){
    var sql = "UPDATE `" + series + "` SET `votes` =  "+request.body.count+" WHERE `id` = "+request.body.id;
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