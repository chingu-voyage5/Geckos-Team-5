import { Scene } from 'phaser';
import { WIDTH, HEIGHT } from '../util/constants';

export class displayInformation extends Scene {
      constructor() {
            super({
                  key: 'displayInformation'
            });

            // ===== Global Definitions For This FILE ===== //

            //variable for the text, using the levelName variable
            this.levelText;

            //An area to hold the level numbers in the format 1-1, levelNumber[0] stands for the the first number, levelNumber[1] for the second one
            this.levelNumber = [1,1];

            //an empty variable to later on hold the names of the all the scenes in the game
            this.Scenes;

            //the general variable for the style of all ui texts
            this.fontStyle = { font: "12px Arial", fill: "#fff"};
      }

      create() { 
            // this gets the array with all the scenes names in it like in the config
            this.Scenes = this.scene.manager.scenes; 

            //initial display of the level
            this.levelText = this.add.text(0, 0, "Stage 1-1", this.fontStyle);

            //an empty array for the for loop, later it will be holding a shortcut to make events for all scenes
            var SceneGets = [];

            //for loop to generate events to enable level update after a stage is won
            for (var i = 1; i < this.Scenes.length-1; i++) {

                  //loading a scene correspoding to the name of the scene
                  SceneGets[i] = this.scene.get(this.Scenes[i]);
                  
                  //event with the trigger code 'updateLevel' to update Levels, need the following line to function inside a level scene:
                  //this.events.emit('updateLevel');
                  SceneGets[i].events.on('updateLevel', function () {

                        //function which takes in the displayInformation object (ui scene) to the function, which was made out of the creat scope to improve readability
                        this.updateLevel(this);

                  }, this);
            }
      }



      update() {   
      }

      updateLevel(uiScene) {

            //shortening the name to improve readability
            var level = uiScene.levelNumber;

            //basic increase in the level
            level[1] += 1;

            //this checks if there is a need to go to a higher first number
            //currently the stage is displayed in the format 1-1 and can be increased to 1-9 before being switched to 2-1
            if (level[1] >= 9) {
                  level[0] += 1;
                  level[1] = 1;

                  //changes the level text
                  uiScene.levelText.setText("Stage " + level[0] + "-" + level[1]);
            } else {
                  uiScene.levelText.setText("Stage " + level[0] + "-" + level[1]);
            }

      }
      
}