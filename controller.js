$(document).ready(function () {
    $("#error-container").hide();

	function openVideo(link){
		var videoId = link.split('=')[1];
        var videoURL = link.split('=')[0];

        if(videoURL.indexOf('youtube') !== -1){
            $("#error-container").hide();
            document.getElementById('video_youtube').src = "https://www.youtube.com/embed/" + videoId + "?autoplay=1";
        }
        else{
            $("#error-container").show();
        }
  	}

  	$("#videoSubmit").submit(function(e){
        e.preventDefault();
    	openVideo($("#link").val());
  	});

  	$("#close").click(function() {
  		window.close();
  	});
});
