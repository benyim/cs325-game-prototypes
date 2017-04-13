window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    var width = 664;
    var height = 530;

    var imageWidth = 58;
    var imageHeight = 60;

    var topLeftX = 40;
    var topLeftY = 170;

    var bottomRightX = 600;
    var bottomRightY = 410;

    var music;
    var mount;
    var happy;

    var stateText;

    var eggsCollected = 0;
    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {
        game.load.image('red', 'assets/redegg.png');
        game.load.image('green', 'assets/greenegg.png');
        game.load.image('blue', 'assets/lblueegg.png');
        game.load.image('purple', 'assets/purpleegg.png');
        game.load.image('pink', 'assets/pinkegg.png');
        game.load.image('yellow', 'assets/yellowegg.png');
        game.load.image('orange', 'assets/orangeegg.png');
        game.load.image('background', 'assets/background.png');

        game.load.audio('yoshi', 'assets/audio/story-theme.mp3');
        game.load.audio('mount', 'assets/audio/mountsound.mp3');
        game.load.audio('happy', 'assets/audio/happysound.mp3');
    }

    /*var b1,b2,b3,b4,b5,b6;
    var r1,r2,r3,r4,r5,r6;
    var p1,p2,p3,p4,p5,p6;
    var g1,g2,g3,g4,g5,g6;
    var pi1,pi2,pi3,pi4,pi5,pi6;
    var y1,y2,y3,y4,y5,y6;
    var o1,o2,o3,o4,o5,o6;*/

    function create() {
        music = game.add.audio('yoshi');
        music.play();
        mount = game.add.audio('mount');
        //happy = game.add.audio('happy');
        var back = game.add.sprite(0,0, 'background');
        var images = game.cache.getKeys(Phaser.Cache.IMAGE);

        var test = game.add.group();
        var randX = 0;
        var randY = 0;
        for (var i = 0; i < 30; i++){
            randX = game.rnd.integerInRange(topLeftX, bottomRightX);
            randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            var img = game.rnd.pick(images);
            var randImg = game.rnd.integerInRange(0, 6);
            var tempSprite;
            if(randImg == 0){
                tempSprite = test.create(randX, randY, 'red');
            }else if(randImg == 1){
                tempSprite = test.create(randX, randY, 'blue');
            }else if(randImg == 2){
                tempSprite = test.create(randX, randY, 'purple');
            }else if(randImg == 3){
                tempSprite = test.create(randX, randY, 'green');
            }else if(randImg == 4){
                tempSprite = test.create(randX, randY, 'pink');
            }else if(randImg == 5){
                tempSprite = test.create(randX, randY, 'yellow');
            }else if(randImg == 6){
                tempSprite = test.create(randX, randY, 'orange');
            }
            tempSprite.inputEnabled = true;
            tempSprite.input.enableDrag(false, true);
            tempSprite.events.onDragStart.add(onDragStart, this);
            tempSprite.events.onDragStop.add(onDragStop, this);
        }

        stateText = game.add.text(350,250,' ', { font: '50px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        //stateText.text = "You collected\n      all of \nYoshi's Eggs!";
        stateText.visible = false;
    }

    function update() {

    }

    var collection = 'Eggs Collected: ' + eggsCollected + '/30';

    function render() {
        game.debug.text(collection, 250, 150);
    }

    var dragX = 0;
    var dragY = 0;

    function onDragStart(sprite, pointer) {
        dragX = sprite.x;
        dragY = sprite.y;
        //result = "Dragging " + sprite.key;

    }

    function onDragStop(sprite, pointer) {

        //result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;
        var made = 0;
        if(sprite.key==='red'){
            if(pointer.x >= 35 && pointer.x <= 35+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }
        }else if(sprite.key==='orange'){
            if(pointer.x >= 126 && pointer.x <= 126+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }
        }else if(sprite.key==='yellow'){
            if(pointer.x >= 214 && pointer.x <= 214+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }           
        }else if(sprite.key==='green'){
            if(pointer.x >= 304 && pointer.x <= 304+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }           
        }else if(sprite.key==='blue'){
            if(pointer.x >= 395 && pointer.x <= 395+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }            
        }else if(sprite.key==='purple'){
            if(pointer.x >= 487 && pointer.x <= 487+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }           
        }else if(sprite.key==='pink'){
            if(pointer.x >= 570 && pointer.x <= 570+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                made = 1;
            }           
        }

        if(made===0){
            //var randX = game.rnd.integerInRange(topLeftX, bottomRightX);
            //var randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            sprite.x = dragX;
            sprite.y = dragY;
        }else{
            eggsCollected++;
            var happy2 = game.add.audio('happy');
            happy2.play();
            if(eggsCollected % 5 === 0){
                mount.play();
            }
            collection = 'Eggs Collected: ' + eggsCollected + '/30';
            if(eggsCollected === 30){
                stateText.text = "You collected\n      all of \nYoshi's Eggs!";
                stateText.visible = true;
            }
        }

        if (pointer.y > 400)
        {
            console.log('input disabled on', sprite.key);
            sprite.input.enabled = false;

            sprite.sendToBack();
        }

    }
};






/*var textStyle = { font: '64px', align: 'center'};
    var timer;
    var milliseconds = 0;
    var seconds = 0;
    var minutes = 0;
    function create() {    
        timer = game.add.bitmapText(250, 250, '00:00:00', textStyle);
    }
    function update() {    //Calling a different function to update the timer just cleans up the update loop if you have other code.    
        updateTimer();
    }
    function updateTimer() {    
        minutes = Math.floor(game.time.time / 60000) % 60;   
        seconds = Math.floor(game.time.time / 1000) % 60;    
        milliseconds = Math.floor(game.time.time) % 100;    
        //If any of the digits becomes a single digit number, pad it with a zero    
        if (milliseconds < 10)        
            milliseconds = '0' + milliseconds;    
        if (seconds < 10)        
            seconds = '0' + seconds;    
        if (minutes < 10)        
            minutes = '0' + minutes;    
        timer.setText(minutes + ':'+ seconds + ':' + milliseconds);
    }*/




/*if(i == 0){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                b1 = test.create(randX, randY, 'blue');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                b2 = test.create(randX, randY, 'blue');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                b3 = test.create(randX, randY, 'blue');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                b4 = test.create(randX, randY, 'blue');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                b5 = test.create(randX, randY, 'blue');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                b6 = test.create(randX, randY, 'blue');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }else if(i == 1){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                r1 = test.create(randX, randY, 'red');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                r2 = test.create(randX, randY, 'red');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                r3 = test.create(randX, randY, 'red');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                r4 = test.create(randX, randY, 'red');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                r5 = test.create(randX, randY, 'red');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                r6 = test.create(randX, randY, 'red');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }else if(i == 2){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                p1 = test.create(randX, randY, 'purple');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                p2 = test.create(randX, randY, 'purple');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                p3 = test.create(randX, randY, 'purple');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                p4 = test.create(randX, randY, 'purple');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                p5 = test.create(randX, randY, 'purple');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                p6 = test.create(randX, randY, 'purple');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }else if(i == 3){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                g1 = test.create(randX, randY, 'green');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                g2 = test.create(randX, randY, 'green');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                g3 = test.create(randX, randY, 'green');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                g4 = test.create(randX, randY, 'green');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                g5 = test.create(randX, randY, 'green');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                g6 = test.create(randX, randY, 'green');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }else if(i == 4){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                pi1 = test.create(randX, randY, 'pink');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                pi2 = test.create(randX, randY, 'pink');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                pi3 = test.create(randX, randY, 'pink');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                pi4 = test.create(randX, randY, 'pink');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                pi5 = test.create(randX, randY, 'pink');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                pi6 = test.create(randX, randY, 'pink');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }else if(i == 5){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                y1 = test.create(randX, randY, 'yellow');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                y2 = test.create(randX, randY, 'yellow');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                y3 = test.create(randX, randY, 'yellow');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                y4 = test.create(randX, randY, 'yellow');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                y5 = test.create(randX, randY, 'yellow');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                y6 = test.create(randX, randY, 'yellow');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }else if(i == 6){
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                o1 = test.create(randX, randY, 'orange');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                o2 = test.create(randX, randY, 'orange');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                o3 = test.create(randX, randY, 'orange');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                o4 = test.create(randX, randY, 'orange');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                o5 = test.create(randX, randY, 'orange');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                o6 = test.create(randX, randY, 'orange');
                randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            }*/
            //var tempSprite = test.create(game.world.randomX, game.world.randomY, game.rnd.pick(images));
            //tempSprite.inputEnabled = true;
            //tempSprite.input.enableDrag(false, true);