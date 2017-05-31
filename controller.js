var VoaApp;

(function(VoaApp){
    VoaApp = {
        error        : document.getElementById('error-container'),
        videoYoutube : document.getElementById('video_youtube'),
        formVideo    : document.getElementById('videoSubmit'),
        inputLink    : document.getElementById('link'),
        close        : document.getElementById('close'),
        topBar       : document.getElementById('topBar'),
        logo         : document.getElementById('logo')
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

    VoaApp.init = function(debug) {
        if(debug){
            console.log('-----------------VOA TUBE-------------------');
            console.log('-Visualisador de vídeos do youtube e twitch-');
        }

        VoaApp.listen();
    };

    function openVideo(link){
        var regexYoutube = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var result = link.match(regexYoutube);

        if (result && result[2].length == 11) {
            VoaApp.error.style.display = 'none';

            VoaApp.videoYoutube.src = "https://www.youtube.com/embed/" + result[2] + "?autoplay=1";

            VoaApp.topBar.style.backgroundColor = '#404448';
            VoaApp.close.style.backgroundColor = '#E62117';
            VoaApp.logo.src = 'assets/youtube.png';
            VoaApp.logo.style.display = 'block';
        }
        else {
            if(link.indexOf('twitch.tv') !== -1){
                VoaApp.error.style.display = 'none';

                var channelTwitch = link.split('/').pop();
                VoaApp.videoYoutube.src = "http://player.twitch.tv/?channel=" + channelTwitch;

                VoaApp.topBar.style.backgroundColor = '#4B367C';
                VoaApp.close.style.backgroundColor = '#291c47';
                VoaApp.logo.src = 'assets/twitch.png';
                VoaApp.logo.style.display = 'block';
            }
            else{
                VoaApp.error.style.display = 'block';
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function(){
        VoaApp.init(true);
    });
}(VoaApp));
