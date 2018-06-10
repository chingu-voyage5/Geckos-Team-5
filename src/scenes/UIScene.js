import { Scene } from 'phaser';
import { WIDTH, HEIGHT, UIFONT } from '../util/constants';

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

    //an empty variable to later on hold the names of the all the scenes in the game
    this.Scenes;

    //holds the text for the timer
    this.timerText;

    //holds the timer event
    this.timerEvent;

    //timer value in the form of 00 min, : string, 00 seconds and timerValue[5] for the amount of hours
    this.timerValue = [0, 0, ':', 0, 0, 0];
    this.timerValueFormatted = '';

    //the variables for the score and the text of the score
    this.score = 0;
    this.scoreText;

    //the text which says Lifes:
    this.lifeText;
    // fallback heartsAmount and init setting
    this.heartsAmount = 1;
    //array for storage of heart objects
    this.hearts;
    //all game objects of ui scene (such as text, hearts and so on)
    this.UISceneGameObjects;
  }

  create() {
    //currently the timer start now as the scene loads in
    this.startGameClock();   

    // Check the registry and hit the updateData function every time the data is changed.
    // this includes the TIMER and SCORE
    this.registry.events.on('changedata', this.updateData, this);

    //initial display of the level
    this.levelText = this.add.text(5, 0, 'Stage 1-1', UIFONT);

    //initial display of the score
    this.scoreText = this.add.text(67, 0, 'Score: ' + this.score, UIFONT);

    //initial display of the life text
    this.lifeText = this.add.text(161, 0, 'Lifes: ', UIFONT);

    //adds the initial timer text
    this.timerText = this.add.text(446, 0, '00:00', UIFONT);

    // this gets the array with all the scenes names in it like in the config
    this.Scenes = this.scene.manager.scenes;

    //an empty array for the for loop, later it will be holding a shortcut to make events for all scenes
    let sceneGets = [];

    //for loop to generate events to enable level update after a stage is won
    for (let i = 1; i < this.Scenes.length - 1; i++) {
      //loading a scene correspoding to the name of the scene
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

      //adds events for all level scenes and enables them to stop the timer
      sceneGets[i].events.on(
        'stopTimer',
        function() {
          //starts the function to stop the timer loop
          this.stopGameClock();
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

    //setting the initial amount of hearts to the player
    this.registry.set('HEARTS', this.heartsAmount);

    //setting the initial score
    this.registry.set('SCORE', 0);
  }

  updateLevel(uiScene) {
    //shortening the name to improve readability
    let level = uiScene.levelNumber;

    //basic increase in the level
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
    //changes the score        
    if (key === 'SCORE')
    {
      this.scoreText.setText('Score: ' + data);
    }
    //changes the timer
    else if (key === 'TIMER')
    {
      //the writerTimerText function uses the timerValue which is why its updated.
      this.timerValue = data;
      this.writeTimerText()
    }
    //changes the hearts
    else if (key === 'HEARTS') {
      this.setLifes(data);
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
  }

  stopGameClock() {
    //stops the time event named timerEvent
    this.timerEvent.remove(false);
  }

  startGameClock() {
    //starts the timer loop which triggeres the gameClock every second, its looped
    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.gameClock,
      callbackScope: this,
      loop: true
    });
  }

  writeTimerText() {
    //delete the previous data in the formatted timervalue
    this.timerValueFormatted = '';

    //make the array to a text in format 00:00
    for (let i = 0; i < 5; i++) {
      this.timerValueFormatted += this.timerValue[i].toString();
    }

    //changes the timerText in the ui scene
    this.timerText.setText(this.timerValueFormatted);
  }

  //deletes all hearts first before passing on to the write function (which makes the hearts)
  setLifes(numberHearts) {    

    this.UISceneGameObjects = this.add.displayList.list;    

    //filters all objects out which are not hearts
    this.hearts = this.UISceneGameObjects.filter(function (element, i) {
      if ('texture' in element) {
        if ('key' in element.texture) {
          if (element.texture.key === 'heart') {
            return element
          }
        }
      }
    });

    //souless heart destroyer D:
    for (let i = 0; i < this.hearts.length; i++) {
      this.hearts[i].destroy();      
    }

    //write function which sets lifes
    this.writeLifes(numberHearts);
  }

  //function to make heart objects
  writeLifes(numberHearts) {
    for (let i = 0; i < numberHearts; i++) {
      if (i > 12) {
        break
      }
      //it looks nice when the next heart is 15 further then the last one
      this.add.heart(200 + (15 * i), 8);      
    }
  }
}
