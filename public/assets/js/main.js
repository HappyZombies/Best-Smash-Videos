$(document).ready(function(){
	console.log("I am from JQuery!");
	// $('form').on('submit', function(){
	// 	var item = $('form input');
	// 	var todo = {item: item.val()};

	// 	$.ajax({
	// 		type: 'POST',
	// 		url: '/todo',
	// 		data: todo,
	// 		success: function(data){
	// 			location.reload();
	// 		}
	// 	});
	// 	return false;
	// });
	// $('#upvote span').on('click', function(){
	// 	console.log("I was clicked");
	// 	//why is this being dumb ? 
	// 	if($(this).context.nextElementSibling == null){
	// 		console.log("Bye");
	// 		return;
	// 	}
	// 	$(this).context.nextElementSibling.innerText = parseInt($(this).context.nextElementSibling.innerText) + 1; 
	// 	var add = {votes: 1};
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: '/',
	// 		data: add,
	// 		success: function(data){
	// 			console.log("Success...now wat...."+data);
	// 		}
	// 	});
	// });

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