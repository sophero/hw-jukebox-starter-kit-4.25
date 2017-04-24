// To do:
// addSong user interface to create Song object with artist and title, and most importantly url
// random song
// next track, previous track

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
		
	var player = document.getElementById('audio-player');
	var playBtn = document.getElementsByClassName('play-btn')[0];
	var pauseBtn = document.getElementsByClassName('pause-btn')[0];
	var stopBtn = document.getElementsByClassName('stop-btn')[0];
	var volUpBtn = document.getElementsByClassName('vol-up-btn')[0];
	var volDownBtn = document.getElementsByClassName('vol-down-btn')[0];
	var muteBtn = document.getElementsByClassName('mute-btn')[0];
	var songList = document.getElementsByClassName('song-list')[0];

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

	var unmute = function() {
		player.volume = prevVol;		
		muteBtn.innerHTML = "Mute";
	}

	var mute = function() {
		prevVol = player.volume;
		player.volume = 0;
		muteBtn.innerHTML = "Unmute";	
	}

	this.volumeUp = function() {
		if (player.volume >= 0.95) {
			player.volume = 1;
		} else {
			player.volume += 0.05;		
		}
		muteBtn.innerHTML = "Mute";
	}

	this.volumeDown = function() {
		if (player.volume <= 0.05) {
			player.volume = 0;
			muteBtn.innerHTML = "Unmute";
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
		addSongListEvents();
	}

	this.newSongObj = function(songUrl, title, artist) {
		// Code goes here...
		this.addSong();
	}

	var addSongListEvents = function() {
		var songListItems = document.getElementsByClassName("song-list__item");
		for (let k = 0; k < songListItems.length; k++) {
			songListItems[k].addEventListener("click", function() {
				pickSong(k);
			});
		}
	}

	var listSongs = function() {
		songList.innerHTML = "";
		for (var k = 0; k < jukeboxObj.songs.length; k++) {
			var song = jukeboxObj.songs[k];
			var newLi = '<li class="song-list__item">';
			newLi += song.artist + " - " + song.title;
			songList.innerHTML += newLi;
		}
	}

	var loadSong = function(song) {
		if (typeof song !== "object") {
			return;
		} else {
			player.src = song.url;		
		}
	}

	var pickSong = function(songIndex) {
		var song = jukeboxObj.songs[songIndex]
		player.src = song.url;
		jukeboxObj.play();
		jukeboxObj.currentSongIndex = songIndex;
	}
	
	this.songs = songArray;
	if (typeof this.songs !== "object") {
		this.songs = [];
	}

	this.currentSongIndex = 0;
	loadSong(this.songs[this.currentSongIndex]);
	listSongs();
	addSongListEvents();

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