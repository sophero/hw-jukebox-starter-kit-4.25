// To do:
// add currently playing info eg. volume, time through track..
// add eventlistener on spacebar to play/pause!

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
	var currentSongIndex = 0;
	var	prevVol = 0.5;

	this.songs = songArray;
	if (typeof this.songs !== "object") {
		this.songs = [];
	}
	this.play = play;
	this.pause = pause;
	this.stop = stop;
	this.muteUnmute = muteUnmute;
	this.volumeUp = volumeUp;
	this.volumeDown = volumeDown;
	this.nextTrack = nextTrack;
	this.prevTrack = prevTrack;

	var player = document.getElementById('audio-player');
	var songList = document.getElementsByClassName('song-list')[0];
	var nowPlayingTitle = document.getElementsByClassName('now-playing__title')[0];
	var nowPlayingArtist = document.getElementsByClassName('now-playing__artist')[0];

	var playBtn = document.getElementsByClassName('play-btn')[0];
	var pauseBtn = document.getElementsByClassName('pause-btn')[0];
	var stopBtn = document.getElementsByClassName('stop-btn')[0];
	var nextBtn = document.getElementsByClassName('next-btn')[0];
	var prevBtn = document.getElementsByClassName('prev-btn')[0];
	var randBtn = document.getElementsByClassName('rand-btn')[0];
	var volUpBtn = document.getElementsByClassName('vol-up-btn')[0];
	var volDownBtn = document.getElementsByClassName('vol-down-btn')[0];
	var muteBtn = document.getElementsByClassName('mute-btn')[0];

	var urlInput = document.getElementsByClassName("url-input")[0];
	var titleInput = document.getElementsByClassName("title-input")[0];
	var artistInput = document.getElementsByClassName("artist-input")[0];
	var addTrackBtn = document.getElementsByClassName('add-new-track-btn')[0];
	var clearFormBtn = document.getElementsByClassName('clear-new-input-btn')[0];

	playBtn.addEventListener("click", play);	
	pauseBtn.addEventListener("click", pause);
	stopBtn.addEventListener("click", stop);
	nextBtn.addEventListener("click", nextTrack);
	prevBtn.addEventListener("click", prevTrack);
	randBtn.addEventListener("click", pickRandom);
	muteBtn.addEventListener("click", muteUnmute);
	volUpBtn.addEventListener("click", volumeUp);
	volDownBtn.addEventListener("click", volumeDown);

	addTrackBtn.addEventListener("click", newSongObjFrmInput);
	clearFormBtn.addEventListener("click", clearNewTrackInput);

	loadSong(currentSongIndex);
	listSongs();
	addSongListEvents();


	function pause() {
		player.pause();
	}

	function play() {
		player.play();
		displayCurrentSong();
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
		player.volume = prevVol;		
		muteBtn.innerHTML = "Mute";
	}

	function mute() {
		prevVol = player.volume;
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
		var url = urlInput.value;
		var title = titleInput.value;
		var artist = artistInput.value;
		var newSong = new Song(url, title, artist);

		addSong(newSong);
		clearNewTrackInput();
	}

	function clearNewTrackInput() {
		urlInput.value = "";
		titleInput.value = "";
		artistInput.value = "";
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
				loadSong(k);
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

	function loadSong(songIndex) {
		player.src = jukeboxObj.songs[songIndex].url;
		currentSongIndex = songIndex;		
		jukeboxObj.play();
	}
	
	function displayCurrentSong() {
		nowPlayingTitle.innerHTML = jukeboxObj.songs[currentSongIndex].title;
		nowPlayingArtist.innerHTML = jukeboxObj.songs[currentSongIndex].artist;
	}

	function nextTrack() {
		var songArrayLen = jukeboxObj.songs.length;
		if (currentSongIndex === songArrayLen - 1) {
			currentSongIndex = 0;
		} else {
			currentSongIndex += 1;
		}
		loadSong(currentSongIndex);
	}

	function prevTrack() {
		var songArrayLen = jukeboxObj.songs.length
		if (currentSongIndex === 0) {
			currentSongIndex = songArrayLen - 1;
		} else {
			currentSongIndex -= 1;
		}
		loadSong(currentSongIndex);
	}

	function pickRandom() {
		var randIndex = Math.floor(Math.random() * jukeboxObj.songs.length);
		loadSong(randIndex);
	}
	
}
