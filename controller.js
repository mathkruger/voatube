var VoaApp;

(function ($, VoaApp) {
    VoaApp = {
        error: document.getElementById('error-container'),
        videoYoutube: document.getElementById('video_youtube'),
        formVideo: document.getElementById('videoSubmit'),
        formVideoList: document.getElementById('playlistSubmit'),
        inputLink: document.getElementById('link'),
        inputList: document.getElementById('links'),
        close: document.getElementById('close'),
        topBar: document.getElementById('topBar'),
        logo: document.getElementById('logo')
    };

    VoaApp.listen = function () {
        VoaApp.formVideo.addEventListener('submit', function (e) {
            e.preventDefault();
            openVideo(VoaApp.inputLink.value);
        });

        VoaApp.formVideoList.addEventListener('submit', function (e) {
            e.preventDefault();
            openPlaylist(VoaApp.inputList.value);
        });

        $(document).on('click', '.search-item', function(e) {
            e.preventDefault();
            openVideo($(this).attr('href'));
            VoaApp.inputLink.value = $(this).attr('href');
        })
    };

    VoaApp.init = function (debug) {
        if (debug) {
            console.log('-----------------VOA TUBE-------------------');
            console.log('-Visualisador de vídeos do youtube e twitch-');
        }

        VoaApp.listen();
    };

    function openPlaylist(link) {
        $('#search-container').hide();

        var links = link.split(',');
        var geral = '';
        var erro = false;
        var primeiro = '';

        for (var i = 0; i < links.length; i++) {
            var regexYoutube = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var result = links[i].match(regexYoutube);

            if (result && result[2].length == 11) {
                if (i == 0) {
                    primeiro = result[2];
                }
                else {
                    geral += result[2];

                    if (i < links.length - 1) {
                        geral += ',';
                    }
                }
            }
            else {
                erro = true;
                break;
            }
        }

        if (erro) {
            
        }
        else {
            VoaApp.videoYoutube.src = "https://www.youtube.com/embed/" + primeiro + "?autoplay=1&playlist=" + geral;

            VoaApp.topBar.style.backgroundColor = '#404448';
            //VoaApp.close.style.backgroundColor = '#E62117';
            VoaApp.logo.src = 'assets/youtube.png';
            VoaApp.logo.style.display = 'block';
        }
    }

    function openVideo(link) {
        $('#search-container').hide();

        var regexYoutube = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var result = link.match(regexYoutube);

        if (result && result[2].length == 11) {

            VoaApp.videoYoutube.src = "https://www.youtube.com/embed/" + result[2] + "?autoplay=1";

            VoaApp.topBar.style.backgroundColor = '#404448';
            //VoaApp.close.style.backgroundColor = '#E62117';
            VoaApp.logo.src = 'assets/youtube.png';
            VoaApp.logo.style.display = 'block';
        }
        else {
            if (link.indexOf('twitch.tv') !== -1) {
                var channelTwitch = link.split('/').pop();
                VoaApp.videoYoutube.src = "http://player.twitch.tv/?channel=" + channelTwitch;

                VoaApp.topBar.style.backgroundColor = '#4B367C';
                //VoaApp.close.style.backgroundColor = '#291c47';
                VoaApp.logo.src = 'assets/twitch.png';
                VoaApp.logo.style.display = 'block';
            }
            else {
                if(link.indexOf('mtv.com') > -1) {
                    VoaApp.videoYoutube.src= link;
                }
                else {
                    search(link);
                }
            }
        }
    }

    function search(termo) {
        var q = termo;
        var $results = $('#search-container');
        var url = "https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=30&key=AIzaSyBA3BhnVi5esgCGrncCnyviJmhzZV7WduA"

        $.getJSON(url + "&q=" + q, function (json) {
            var count = 0;

            if (json.items) {

                var items = json.items;
                var html = '<ul class="list-group">';

                items.forEach(function (item) {
                    html += '<li class="list-group-item">';
                    html += '<p><a class="search-item" href="http://youtu.be/' + item.id.videoId + '">';
                    html += '<webview src="' + item.snippet.thumbnails.default.url + '" width="' + item.snippet.thumbnails.default.width + '" height="' + item.snippet.thumbnails.default.height + '" style="width: 120px !important; height: 90px !important;"></webview>';
                    html += '<h5>' + item.snippet.title + '</h5></a></p>';
                    html += '</li>';
                    count++;
                });

                html += '</ul>'
            }

            $results.show();
            if (count === 0) {
                $results.html("No videos found");
            } else {
                $results.html(html);
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        VoaApp.init(true);
    });
}(jQuery, VoaApp));
