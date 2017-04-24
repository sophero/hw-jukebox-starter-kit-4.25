

var initialSongs = [
	new Song("Clockworks", "Meshuggah", "audio-files/meshuggah-clockworks.mp3"),
	new Song("Specific Meaning In A Group Of Dots", "Entheos", "audio-files/entheos-specific-meaning-in-a-group-of-dots.mp3"),
	new Song("Into Decay", "Meshuggah", "audio-files/meshuggah-into-decay.mp3")
	];

var jukebox = new Jukebox(initialSongs);

function Song(title, artist, url) {
	this.title = title;
	this.artist = artist;
	this.url = url;
}

function Jukebox(songArray) {

	var jukeboxObj = this;
		
	var player = document.getElementById('audio-player');
	var playBtn = document.getElementsByClassName('play-btn')[0];
	var songList = document.getElementsByClassName('song-list')[0];


	this.songs = songArray;
	if (typeof this.songs !== "object") {
		this.songs = [];
	}

	this.currentlyPlaying;

	this.play = function() {
		player.play();
	}

	this.addSong = function(songUrl) {
		this.songs.push();
		listSongs();
	}

	listSongs = function() {

	}
	playBtn.addEventListener("click", this.play);	

}