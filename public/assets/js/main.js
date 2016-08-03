$(document).ready(function(){
	console.log("I am from JQuery!");

	var callback = function(data) {
		$.ajax({
			url: window.location.href,
			type: 'post',
			data: { id: data.id, up: data.upvoted, down: data.downvoted, star: data.starred } //Add Correct Data.
		});
	};
	
	
	$('.video').each(function(){
		var numberID = this.id.replace( /^\D+/g, '');
		$(this.firstElementChild).upvote();
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