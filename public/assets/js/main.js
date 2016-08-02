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

	var upvoted = false;
	var downvoted = false;
	$(document).on("click", function(e){

		var thisId = "#"+e.target.id;
		var add = 1;

		if(thisId.indexOf("#upvote-") >= 0){
			if(!upvoted){
				if(downvoted){
					console.log("This is already downvoted, better change that");
					var downvoteID = $(thisId)[0].parentNode.nextElementSibling.nextElementSibling.lastChild.id;
					console.log(downvoteID);
					$("#"+downvoteID).css('color', '#6583A6');
					downvoted = false;
					add = 2;
				}
				upvoted = true;
				$(thisId).css('color', '#053dc7');
				$(thisId)[0].parentNode.nextElementSibling.innerHTML = parseInt($(thisId)[0].parentNode.nextElementSibling.innerHTML) + add;
			}else{
				upvoted = false;
				$(thisId).css('color', '#6583A6');
				$(thisId)[0].parentNode.nextElementSibling.innerHTML = parseInt($(thisId)[0].parentNode.nextElementSibling.innerHTML) - add;
			}
		}

		else if(thisId.indexOf("#downvote-") >= 0){
			if(!downvoted){
				if(upvoted){
					console.log("This is already upvoted, better update that");
					var upvoteID = "#"+$(thisId)[0].parentNode.previousElementSibling.previousElementSibling.lastChild.id;
					$(upvoteID).css('color','#6583A6');
					upvoted = false;
					add = 2;
				}
				downvoted = true;
				$(thisId).css('color', '#B61420');
				$(thisId)[0].parentNode.previousElementSibling.innerHTML = parseInt($(thisId)[0].parentNode.previousElementSibling.innerHTML) - add;
			}else{
				downvoted = false;
				$(thisId).css('color', '#6583A6');
				$(thisId)[0].parentNode.previousElementSibling.innerHTML = parseInt($(thisId)[0].parentNode.previousElementSibling.innerHTML) + add;
			}
		}

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