//loads of the sounds into the scene upon call into their personal variables 
//because otherwise its they make problems when there is a need to repeat the sound
function soundAdder(scene) {
    scene.sound_gameover = scene.sound.add('gameover');
    scene.sound_brick = scene.sound.add('brick');
    scene.sound_ballplayer = scene.sound.add('ballplayer');
    scene.sound_ballwalls = scene.sound.add('ballwalls');
    scene.sound_bullet = scene.sound.add('bullet');
    scene.sound_gamewin = scene.sound.add('gamewin');
    scene.sound_sword = scene.sound.add('sword');
    scene.sound_life = scene.sound.add('life');
}

//reduces the need to make an if statement everytime
function soundPlay(sound, scene) {
    if (scene.registry.list.soundControl == true) {
        scene[sound].play();
    }
}

export { soundAdder, soundPlay };