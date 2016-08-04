$(document).ready(function(){
	console.log("I am from JQuery!");

	var callback = function(data) {
		var numberToAdd = function() {
			if(data.downvoted) return -1;
			else if (data.upvoted) return 1;
			else return 0;
		}; // ?
		$.ajax({
			url: window.location.href,
			type: 'post',
			data: { id: data.id, up: data.upvoted, down: data.downvoted, count: data.count } //Add Correct Data.
		});
	};
	
	
	$('.video').each(function(){
		var numberID = this.id.replace( /^\D+/g, '');
		$(this.firstElementChild).upvote({id: numberID, callback: callback});
	});

	//Interesting function https://www.sitepoint.com/display-youtube-thumbnails-easy-jquery/
	$.extend({
  	jYoutube: function( url, size ){
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

	// Add image to link.
	$('.youtubeLinkImg').each(function(){
		this.src = $.jYoutube(this.parentElement.href, 'small');
	});

});