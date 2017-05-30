$(document).ready(function () {
	function openVideo(link){
		var videoId = link.split('=')[1];
		var html = '<webview width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '?autoplay=1"></webview>';

		document.getElementById('video').innerHTML = html;
  	}

  	$("#abrir").click(function(){
    	openVideo($("#link").val());
  	});

  	$("#close").click(function() {
  		window.close();
  	});
});

