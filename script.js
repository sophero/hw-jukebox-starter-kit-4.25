var initialSongs = [
	new Song("audio-files/meshuggah-clockworks.mp3", "Clockworks", "Meshuggah"),
	new Song("audio-files/entheos-specific-meaning-in-a-group-of-dots.mp3", "Specific Meaning In A Group Of Dots", "Entheos"),
	new Song("audio-files/meshuggah-into-decay.mp3", "Into Decay", "Meshuggah")
	];

var jukebox = new Jukebox(initialSongs);

function Song(url, title, artist) {
	this.url = url;
	this.title = title;
	this.artist = artist;
}

function Jukebox(songArray) {

	var jukeboxObj = this;
		
	player = document.getElementById('audio-player');
	playBtn = document.getElementsByClassName('play-btn')[0];
	pauseBtn = document.getElementsByClassName('pause-btn')[0];
	songList = document.getElementsByClassName('song-list')[0];

	this.songs = songArray;

	if (typeof this.songs !== "object") {
		this.songs = [];
	}
	console.log(this.songs);


	this.pause = function() {
		player.pause();
	}

	this.play = function() {
		player.play();
	}

	this.addSong = function(songUrl) {
		this.songs.push(new Song(songUrl));
		listSongs();
	}

	listSongs = function() {
		// for (var k = 0; k < this.songs.length; k++) {
		// 	var ;
		// }
		// songList.innerHTML += ;
	}

	loadSong = function(song) {
		if (typeof song !== "object") {
			return;
		} else {
			player.src = song.url;		
		}
	}

	this.currentlyPlaying = this.songs[0];
	loadSong(this.currentlyPlaying);

	playBtn.addEventListener("click", this.play);	
	pauseBtn.addEventListener("click", this.pause);
}

// Public methods
// this.pause
// this.play
// this.addSong

// Public properties:
// this.player
// this.songs
// this.currentlyPlaying


// Private methods
// listSongs
// loadSongs

// Private properties
// playBtn
// songList