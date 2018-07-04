 import { WIDTH, HEIGHT } from '../util/constants';
 
 import {
     songDecider
 } from '../components/objects/Music'
 
 //end the game
 export const gameOver = function() {
    this.nextBackground();
    //switches to the next track
    let songNumber = songDecider(this.registry.list.currentSongNumber);
    //saves the track number in the registry
    this.registry.set('currentSongNumber', songNumber);
    this.isPlayerAlive = false;
    this.cameras.main.shake(500);
    this.time.delayedCall(
      250,
      () => {
        this.physics.world.pause();
      },
      [],
      this
    );
    this.scene.stop('UIScene');

    if (this.registry.list.lives === 0) {
      this.add.text(
        (WIDTH / 2) * 0.5,
        HEIGHT / 2,
        'Game Over! \n Press any key to try again!'
      );
    } else {
      this.add.text(
        (WIDTH / 2) * 0.5,
        HEIGHT / 2,
        'You won!! \n Press any key to play again!'
      );
    }
  }