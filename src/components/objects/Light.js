export function lightAdder(object, scene) {
    object.setPipeline('Light2D');

    var light1 = scene.lights.addLight(300, 160, 1000, 0xff0000, 1);
    var ellipse1 = new Phaser.Geom.Ellipse(light1.x, light1.y, 70, 100);

    scene.time.addEvent({
        delay: 100,
        callback: function () {
            Phaser.Geom.Ellipse.Random(ellipse1, light1);
        },
        callbackScope: this,
        repeat: -1
    });

    //We must enable the light system. By default is disabled
    scene.lights.enable();
}