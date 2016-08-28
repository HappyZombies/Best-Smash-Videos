$(document).ready(function(){
	console.log("I am from JQuery!");

	var callback = function(data) {
		var numberToAdd = function() {
			if(data.downvoted) return -1;
			else if (data.upvoted) return 1;
			else return 0;
		}; // ?
		$.ajax({
			url: window.location.href.replace(/\/new|\/top|\?page=[0-9]/g,''),
			type: 'POST',
			data: { id: data.id, up: data.upvoted, down: data.downvoted, count: data.count } //Add Correct Data.
		});
	};
	
	
	$('.video').each(function(){
		var numberID = this.id.replace( /^\D+/g, '');
		$(this.firstElementChild).upvote({id: numberID, callback: callback});
	});

	$('#modalForm').on('submit', function(e){
        e.preventDefault();
        var okay = true;
        var paramObj = {};
        var errorMessage = "";
        $.each($('#modalForm').serializeArray(), function(_, kv) {
            paramObj[kv.name] = kv.value;
        });
        var matches = paramObj.url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
        if (!matches)
        {
            errorMessage += "- The link must be a YouTube link.\n";
            okay = false;
        }
        if(paramObj.url.length == 0 || paramObj.title.length == 0){
            errorMessage += "- You must not leave anything blank.\n";
            okay = false;
        }

        if(paramObj.url.length > 255 || paramObj.title.length > 255){
            errorMessage += "- Length must not be over 255 characters\n";
            okay = false;
        }

        console.dir(paramObj.title.length);
        console.dir(paramObj);
        if(okay){
            $.ajax({
                url: window.location.href.replace(/\/new|\/top|\?page=[0-9]/g,'')+'/submit',
                type: 'POST',
                data: $('#modalForm').serialize(),
                success: function(data){
                    console.log("Success! Refreshing");
                    window.location.replace(window.location.href.replace(/\/new|\/top|\?page=[0-9]/g,''));
                }
            });
        }else{
            alert("There were errors!\n"+errorMessage);
        }
    });
	
	//Interesting function https://www.sitepoint.com/display-youtube-thumbnails-easy-jquery/
	$.extend({
  	jYoutube: function( url, size ){
        var matches = url.match(/watch\?v=([a-zA-Z0-9\-_]+)/);
        if (!matches)
        {
            return "https://img.buzzfeed.com/buzzfeed-static/static/user_images/web03/2010/4/9/10/questionmark-14334-1270825001-154_large.jpg";
        }
	    if(url === null){ return ""; }

	    size = (size === null) ? "big" : size;
	    var vid;
	    var results;

	    results = url.match("[\?&]v=([^&#]*)");

	    vid = ( results === null ) ? url : results[1];

	    if(size == "small"){
	      return "http://img.youtube.com/vi/"+vid+"/2.jpg";
	    }else {
	      return "http://img.youtube.com/vi/"+vid+"/0.jpg";
	    }
	  }
	});
    // $('.page-link').each(function() {
    //     if ($(this).prop('href') == window.location.href) {
    //         $($(this)[0].parentNode).addClass('active');
    //     }
    // });
	// Add image to link.
	$('.youtubeLinkImg').each(function(){
		this.src = $.jYoutube(this.parentElement.href, 'small');
	});

});