var player = document.getElementById('audio-player');
var playBtn = document.getElementsByClassName('play-btn')[0];

playBtn.addEventListener("click", function() {
	player.play();
});