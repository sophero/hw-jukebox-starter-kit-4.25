// To do:
// addSong user interface to create Song object with artist and title, and most importantly url
// random song
// next track, previous track
// add currently playing info eg. volume, time through track..

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
	
	this.currentSongIndex = 0;
	this.songs = songArray;
	if (typeof this.songs !== "object") {
		this.songs = [];
	}
	var jukeboxObj = this;
	this.prevVol = 0.5;
	this.play = play;
	this.pause = pause;
	this.stop = stop;
	this.muteUnmute = muteUnmute;
	this.volumeUp = volumeUp;
	this.volumeDown = volumeDown;

	var player = document.getElementById('audio-player');
	var songList = document.getElementsByClassName('song-list')[0];
	var addTrackModal = document.getElementsByClassName('add-track-modal__container')[0];
	
	var playBtn = document.getElementsByClassName('play-btn')[0];
	var pauseBtn = document.getElementsByClassName('pause-btn')[0];
	var stopBtn = document.getElementsByClassName('stop-btn')[0];
	var volUpBtn = document.getElementsByClassName('vol-up-btn')[0];
	var volDownBtn = document.getElementsByClassName('vol-down-btn')[0];
	var muteBtn = document.getElementsByClassName('mute-btn')[0];
	var openModalBtn = document.getElementsByClassName('open-modal-btn')[0];
	var addTrackBtn = document.getElementsByClassName('add-new-track-btn')[0];

	playBtn.addEventListener("click", this.play);	
	pauseBtn.addEventListener("click", this.pause);
	stopBtn.addEventListener("click", this.stop);
	muteBtn.addEventListener("click", this.muteUnmute);
	volUpBtn.addEventListener("click", this.volumeUp);
	volDownBtn.addEventListener("click", this.volumeDown);
	openModalBtn.addEventListener("click", openAddTrackModal);
	addTrackBtn.addEventListener("click", newSongObjFrmInput);

	loadSong(this.songs[this.currentSongIndex]);
	listSongs();
	addSongListEvents();


	function pause() {
		player.pause();
	}

	function play() {
		player.play();
	}

	function stop() {
		player.pause();
		player.currentTime = 0;
	}

	function muteUnmute() {
		if (player.volume === 0) {
			unmute();
		} else {
			mute();
		}		
	}

	function unmute() {
		player.volume = this.prevVol;		
		muteBtn.innerHTML = "Mute";
	}

	function mute() {
		this.prevVol = player.volume;
		player.volume = 0;
		muteBtn.innerHTML = "Unmute";	
	}


	function volumeUp() {
		if (player.volume >= 0.95) {
			player.volume = 1;
		} else {
			player.volume += 0.05;		
		}
		muteBtn.innerHTML = "Mute";
	}

	function volumeDown() {
		if (player.volume <= 0.05) {
			player.volume = 0;
			muteBtn.innerHTML = "Unmute";
		} else {
			player.volume -= 0.05;
		}
	}

	function newSongObjFrmInput() {
		var songUrl = document.getElementsByClassName("url-input")[0].value;
		var title = document.getElementsByClassName("title-input")[0].value;
		var artist = document.getElementsByClassName("artist-input")[0].value;
		var newSong = new Song(songUrl, title, artist);
		addSong(newSong);
		closeAddTrackModal();
	}

	function addSong(song) {
		if (typeof song !== "object") {
			return;
		}
		jukeboxObj.songs.push(song);
		listSongs();
		addSongListEvents();
	}

	function addSongListEvents() {
		var songListItems = document.getElementsByClassName("song-list__item");
		for (let k = 0; k < songListItems.length; k++) {
			songListItems[k].addEventListener("click", function() {
				pickSong(k);
			});
		}
	}

	function listSongs() {
		songList.innerHTML = "";
		for (var k = 0; k < jukeboxObj.songs.length; k++) {
			var song = jukeboxObj.songs[k];
			var newLi = '<li class="song-list__item">';
			newLi += song.artist + " - " + song.title;
			songList.innerHTML += newLi;
		}
	}

	function loadSong(song) {
		if (typeof song !== "object") {
			return;
		} else {
			player.src = song.url;		
		}
	}

	function pickSong(songIndex) {
		var song = jukeboxObj.songs[songIndex]
		player.src = song.url;
		jukeboxObj.play();
		jukeboxObj.currentSongIndex = songIndex;
	}
	
	function openAddTrackModal() {
		addTrackModal.style.display = "block";
	}

	function closeAddTrackModal() {
		addTrackModal.style.display = "none";
	}

}
