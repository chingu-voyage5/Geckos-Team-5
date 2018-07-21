//we need a delay on the first song, because it starts playing too early after the theme song stops
let firstDelay = 0.4;

//starts playing music if musicControl is on. First song played with delay
function musicStart(songname, scene) {
      scene.registry.list.musicControl = true;
      
      if (scene.registry.list.currentSongNumber == 1) {
            scene['music_' + songname].play({
                  loop: true,
                  delay: firstDelay
            });  
      }  else {
            scene['music_' + songname].play({
                  loop: true
            });
      }
}

function musicStop(songname,scene) {
      scene.registry.list.musicControl = false;
      scene['music_' + songname].stop();
}

//switches to the next number of songs upon call
function songDecider(song) {
      let returnSong = song + 1;
      if (returnSong > 4) {
            returnSong = 1
      } else {
            return returnSong;
      }
      return returnSong;
}

//stops the music in the provided scene without stopping music in general
function musicStopScene(songname, scene) {
      if (scene.registry.list.musicControl) {
            scene['music_' + songname].stop();
      }
}

//makes the music accessable from the called scene and provides with volume config
function musicAdder(scene) {
      scene.music_theme = scene.sound.add('theme');
      scene.music_song1 = scene.sound.add('song1');
      scene.music_song2 = scene.sound.add('song2');
      scene.music_song3 = scene.sound.add('song3');
      scene.music_song4 = scene.sound.add('song4');

      scene.music_theme.config.volume = 1.8;
      scene.music_song1.config.volume = 0.7;
      scene.music_song2.config.volume = 1;
      scene.music_song3.config.volume = 1;
      scene.music_song4.config.volume = 1.3;
}

export {musicStart, musicStop, musicStopScene, songDecider,musicAdder};