// To do:
// addSong user interface to create Song object with artist and title, and most importantly url
// 

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
	var prevVol = 0.5;
		
	player = document.getElementById('audio-player');
	playBtn = document.getElementsByClassName('play-btn')[0];
	pauseBtn = document.getElementsByClassName('pause-btn')[0];
	stopBtn = document.getElementsByClassName('stop-btn')[0];
	volUpBtn = document.getElementsByClassName('vol-up-btn')[0];
	volDownBtn = document.getElementsByClassName('vol-down-btn')[0];
	muteBtn = document.getElementsByClassName('mute-btn')[0];
	songList = document.getElementsByClassName('song-list')[0];

	this.pause = function() {
		player.pause();
	}

	this.play = function() {
		player.play();
	}

	this.stop = function() {
		player.pause();
		player.currentTime = 0;
	}

	this.muteUnmute = function() {
		if (player.volume === 0) {
			 unmute();
		} else {
			mute();
		}		
	}

	unmute = function() {
		player.volume = prevVol;		
		muteBtn.innerHTML = "Mute";
	}

	mute = function() {
		prevVol = player.volume;
		player.volume = 0;
		muteBtn.innerHTML = "Unmute";	
	}

	this.volumeUp = function() {
		if (player.volume > 0.95) {
			player.volume = 1;
		} else {
			player.volume += 0.05;		
		}
	}

	this.volumeDown = function() {
		if (player.volume < 0.05) {
			player.volume = 0;
		} else {
			player.volume -= 0.05;
		}
	}

	this.addSong = function(song) {
		if (typeof song !== "object") {
			return;
		}
		this.songs.push(song);
		listSongs();
	}

	this.newSongObj = function(songUrl, title, artist) {

		this.addSong();
	}

	listSongs = function() {
		songList.innerHTML = "";
		for (var k = 0; k < jukeboxObj.songs.length; k++) {
			var song = jukeboxObj.songs[k];
			var newLi = '<li class="song-list__item">';
			newLi += song.artist + " - " + song.title;
			songList.innerHTML += newLi;
		}
	}

	loadSong = function(song) {
		if (typeof song !== "object") {
			return;
		} else {
			player.src = song.url;		
		}
	}
	
	this.songs = songArray;
	if (typeof this.songs !== "object") {
		this.songs = [];
	}
	console.log(this.songs);

	this.currentlyPlaying = this.songs[0];
	loadSong(this.currentlyPlaying);
	listSongs();

	playBtn.addEventListener("click", this.play);	
	pauseBtn.addEventListener("click", this.pause);
	stopBtn.addEventListener("click", this.stop);
	muteBtn.addEventListener("click", this.muteUnmute);
	volUpBtn.addEventListener("click", this.volumeUp);
	volDownBtn.addEventListener("click", this.volumeDown);
}

// Public methods
// this.pause
// this.play
// this.addSong
// this.muteUnmute

// Public properties:
// this.player
// this.songs
// this.currentlyPlaying


// Private methods
// listSongs
// loadSongs
// mute
// unmute

// Private properties
// playBtn
// songList