import { Scene } from 'phaser';
import { WIDTH, HEIGHT, FONT, FONTSIZE } from '../util/constants';

export class UIScene extends Scene {
  constructor() {
    super({
      key: 'UIScene'
    });

    // ===== Global Definitions For This FILE ===== //

    //variable for the text, using the levelName variable
    this.levelText;
    //An area to hold the level numbers in the format 1-1, levelNumber[0] stands for the the first number, levelNumber[1] for the second one
    this.levelNumber = [1, 1];
    this.Scenes;
    this.timerText;
    this.timerEvent;
    //timer value in the form of 00 min, : string, 00 seconds and timerValue[5] for the amount of hours
    this.timerValue = [0, 0, ':', 0, 0, 0];
    this.timerValueFormatted = '';
    this.score = 0;
    this.scoreText;
    //the text which says "Lifes:#"
    this.livesText;
    this.hearts;
    //all game objects of ui scene (such as text, hearts and so on)
    this.UISceneGameObjects;
  }

  create() {
    this.registry.set('TIMER', [0, 0, ':', 0, 0, 0]);
    // display hearts for each player life on level start
    this.setLives(this.registry.list.lives);

    // timer gets initiated
    this.startGameClock();
    // and gets stopped until the player starts the game with space key
    this.pauseGameClock();

    // Check the registry and hit the updateData function every time the data is changed.
    // this includes the TIMER and SCORE
    this.registry.events.on('changedata', this.updateData, this);

    //initial display of the score, life text and timer
    this.scoreText = this.add.bitmapText(
      5,
      0,
      FONT,
      'Score: ' + this.score,
      FONTSIZE
    );
    this.livesText = this.add.bitmapText(180, 0, FONT, 'Lives: ', FONTSIZE);
    this.timerText = this.add.bitmapText(420, 0, FONT, '00:00', FONTSIZE);

    // this gets the array with all the scenes names in it like in the config
    this.Scenes = this.scene.manager.scenes;

    //for loop to generate events to enable level update after a stage is won
    let sceneGets = [];
    for (let i = 1; i < this.Scenes.length - 1; i++) {
      sceneGets[i] = this.scene.get(this.Scenes[i]);

      //event with the trigger code 'updateLevel' to update Levels, need the following line to function inside a level scene:
      //this.events.emit('updateLevel');
      sceneGets[i].events.on(
        'updateLevel',
        function() {
          //function which takes in the UIScene object to the function, which was made out of the create scope to improve readability
          this.updateLevel(this);
        },
        this
      );

      //adds events for all level scenes and enables them to pause the timer
      sceneGets[i].events.on(
        'pauseTimer',
        function() {
          //starts the function to stop the timer loop
          this.pauseGameClock();
        },
        this
      );

      //adds events for all level scenes and enables them to resume the timer
      sceneGets[i].events.on(
        'resumeTimer',
        function() {
          //starts the function to stop the timer loop
          this.resumeGameClock();
        },
        this
      );

      //adds events for all level scenes and enables them to start the timer
      sceneGets[i].events.on(
        'startTimer',
        function() {
          //start time loop
          this.startGameClock();
        },
        this
      );
    }

    //set score to previous stage, if new session set the initial score to 0
    if (this.registry.list.sessionAlive) {
      this.registry.set('SCORE', this.registry.list.SCORE);
    } else {
      this.registry.set('SCORE', 0);
    }
  }

  updateLevel(uiScene) {
    let level = uiScene.levelNumber;
    level[1] += 1;

    //this checks if there is a need to go to a higher first number
    //currently the stage is displayed in the format 1-1 and can be increased to 1-9 before being switched to 2-1
    if (level[1] >= 9) {
      level[0] += 1;
      level[1] = 1;

      //changes the level text
      uiScene.levelText.setText('Stage ' + level[0] + '-' + level[1]);
    } else {
      uiScene.levelText.setText('Stage ' + level[0] + '-' + level[1]);
    }
  }

  //updates all the data which was changed in the registry, currently that is : TIMER && SCORE && HEARTS
  updateData(parent, key, data) {
    if (key === 'SCORE') {
      this.scoreText.setText('Score: ' + data);
    }
    else if (key === 'TIMER') {
      //the writerTimerText function uses the timerValue which is why its updated.
      this.timerValue = data;
      this.writeTimerText();
    }
    else if (key === 'lives') {
      this.setLives(data);
    }
  }

  gameClock() {
    //pushes the second number of seconds one up  00:00 --> 00:01
    this.timerValue[4]++;

    //if 00:010 --> 00:10
    if (this.timerValue[4] > 9) {
      this.timerValue[4] = 0;
      this.timerValue[3]++;
    }
    //if 00:60 --> 01:00
    if (this.timerValue[3] > 5) {
      this.timerValue[3] = 0;
      this.timerValue[1]++;
    }
    //if 010:00 --> 10:00
    if (this.timerValue[1] > 9) {
      this.timerValue[1] = 0;
      this.timerValue[0]++;
    }
    //if 60:00 --> 00:00
    if (this.timerValue[0] > 5) {
      this.timerValue = [0, 0, 0, 0];
      this.timerValue[5]++;
    }

    //registering the current Timer Value to the registry across the scenes
    this.registry.set('TIMER', this.timerValue);
    this.registry.set('SESSIONTIMER', this.registry.list.SESSIONTIMER + 1);
  }

  pauseGameClock() {
    this.timerEvent.paused = true;
  }

  resumeGameClock() {
    this.timerEvent.paused = false;
  }

  startGameClock() {
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.gameClock,
      callbackScope: this,
      loop: true
    });
  }

  writeTimerText() {
    this.timerValueFormatted = '';

    //make the array to a text in format 00:00
    for (let i = 0; i < 5; i++) {
      this.timerValueFormatted += this.timerValue[i].toString();
    }
    this.timerText.setText(this.timerValueFormatted);
  }

  //deletes all hearts first before passing on to the write function (which makes the hearts)
  setLives(lives) {
    let numberHearts = lives;
    this.UISceneGameObjects = this.add.displayList.list;

    //filters all objects out which are not hearts
    this.hearts = this.UISceneGameObjects.filter(function(element, i) {
      if ('texture' in element) {
        if ('key' in element.texture) {
          if (element.texture.key === 'heart') {
            return element;
          }
        }
      }
    });

    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].destroy();
    }

    //write function which sets lifes
    this.writeLives(numberHearts);
  }

  writeLives(numberHearts) {
    for (let i = 0; i < numberHearts; i++) {
      if (i > 8) {
        break;
      }
      //space out each heart by 17.5 pixels
      this.add.heart(250 + 17.5 * i, 12);
    }
  }
}
