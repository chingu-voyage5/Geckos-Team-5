function musicStart(songname, scene) {
      scene.registry.list.musicControll = true;
      
      scene.music = scene.sound.add(songname);
      scene.music.play({
            loop: true
      });  
}

function musicStop(scene) {
      scene.registry.list.musicControll = false;
      scene.music.stop();
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

function musicStopScene(scene) {
      if (scene.registry.list.musicControll) {
            scene.music.stop();
      }
}

export {musicStart, musicStop, musicStopScene, songDecider};