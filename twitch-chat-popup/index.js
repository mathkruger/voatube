const params = new URLSearchParams(window.location.search);
const canal = params.get('canal');
const container = document.getElementById('twitch-chat-container');

container.style.display = 'none';
container.src = 'https://www.twitch.tv/popout/' + canal + '/chat';
container.style.display = 'block';