var VoaApp;

(function($,VoaApp){
    VoaApp = {
        error        : $("#error-container"),
        videoYoutube : document.getElementById('video_youtube'),
        formVideo    : $("#videoSubmit"),
        inputLink    : $("#link"),
        close        : $("#close")
    };

    VoaApp.listen = function() {
        VoaApp.formVideo.submit(function(e){
            e.preventDefault();
            openVideo(VoaApp.inputLink.val());
        });

        VoaApp.close.click(function() {
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
            VoaApp.error.hide();
            VoaApp.videoYoutube.src = "https://www.youtube.com/embed/" + result[2] + "?autoplay=1";
        }
        else {
            VoaApp.error.show();
        }
    }

    $(document).ready(function(){
        VoaApp.init();
    });
}(jQuery, VoaApp));

