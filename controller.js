var VoaApp;

(function(VoaApp){
    VoaApp = {
        error        : document.getElementById('error-container'),
        videoYoutube : document.getElementById('video_youtube'),
        formVideo    : document.getElementById('videoSubmit'),
        inputLink    : document.getElementById('link'),
        close        : document.getElementById('close')
    };

    VoaApp.listen = function() {
        VoaApp.formVideo.addEventListener('submit', function(e){
            e.preventDefault();
            openVideo(VoaApp.inputLink.value);
        });

        VoaApp.close.addEventListener('click', function() {
            window.close();
        });
    };

    VoaApp.init = function() {
        VoaApp.listen();
    };

    function openVideo(link){
        var regexYoutube = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var result = link.match(regexYoutube);

        if (result && result[2].length == 11) {
            VoaApp.error.style.display = 'none';
            VoaApp.videoYoutube.src = "https://www.youtube.com/embed/" + result[2] + "?autoplay=1";
        }
        else {
            if(link.indexOf('twitch.tv') !== -1){
                var channelTwitch = link.split('/').pop();
                VoaApp.videoYoutube.src = "http://player.twitch.tv/?channel=" + channelTwitch;
            }
            else{
                VoaApp.error.style.display = 'block';
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function(){
        VoaApp.init();
    });
}(VoaApp));
