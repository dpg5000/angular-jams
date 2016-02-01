(function() {
    function SongPlayer() {
        var SongPlayer = {};


        /**
         * @desc Current song playing
         * @type {Object}
         */
        var currentSong = null;

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;


        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
        };


        /**
        * @function playSong
        * @desc Plays current Buzz object and sets playing prop of song to true
        * @param {Object} song
        */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
        * @function SongPlayer.play
        * @desc Public method click handler creates Buzz object from song arg and calls own play method
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {

                setSong(song);
                playSong(song);

            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {

                    playSong(song);

                }
            }
        };

        /**
        * @function SongPlayer.pause
        * @desc Public method click handler pauses currently playing song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('angularJams')
        .factory('SongPlayer', SongPlayer);

})();