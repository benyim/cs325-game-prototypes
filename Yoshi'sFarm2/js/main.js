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


    var numEggs = 56;
    var firstLimit = 4;
    var secondLimit = 7;
    var eggPerCrate = 8;

    var music;
    var mount;
    var happy;
    var gameEnded = false;

    var stateText;
    var eggsCollected = 0;

    var startText;
    var timer, timerEvent, text;

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
        game.load.image('red1', 'assets/redeggcrate1.png');
        game.load.image('red2', 'assets/redeggcrate2.png');
        game.load.image('orange1', 'assets/orangeeggcrate1.png');
        game.load.image('orange2', 'assets/orangeeggcrate2.png');
        game.load.image('yellow1', 'assets/yelloweggcrate1.png');
        game.load.image('yellow2', 'assets/yelloweggcrate2.png');
        game.load.image('green1', 'assets/greeneggcrate1.png');
        game.load.image('green2', 'assets/greeneggcrate2.png');
        game.load.image('blue1', 'assets/lblueeggcrate1.png');
        game.load.image('blue2', 'assets/lblueeggcrate2.png');
        game.load.image('purple1', 'assets/purpleeggcrate1.png');
        game.load.image('purple2', 'assets/purpleeggcrate2.png');
        game.load.image('pink1', 'assets/pinkeggcrate1.png');
        game.load.image('pink2', 'assets/pinkeggcrate2.png');
        game.load.image('topcrate', 'assets/cratetop.png');

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
        var counter = 0;
        for (var i = 0; i < numEggs; i++){
            randX = game.rnd.integerInRange(topLeftX, bottomRightX);
            randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            var img = game.rnd.pick(images);
            //var randImg = game.rnd.integerInRange(0, 6);
            var tempSprite;
            if(counter === 0){
                tempSprite = test.create(randX, randY, 'red');
            }else if(counter === 1){
                tempSprite = test.create(randX, randY, 'blue');
            }else if(counter === 2){
                tempSprite = test.create(randX, randY, 'purple');
            }else if(counter === 3){
                tempSprite = test.create(randX, randY, 'green');
            }else if(counter === 4){
                tempSprite = test.create(randX, randY, 'pink');
            }else if(counter === 5){
                tempSprite = test.create(randX, randY, 'yellow');
            }else if(counter === 6){
                tempSprite = test.create(randX, randY, 'orange');
            }
            counter++;
            if(counter === 7){
                counter = 0;
            }
            tempSprite.inputEnabled = true;
            tempSprite.input.enableDrag(false, true);
            tempSprite.events.onDragStart.add(onDragStart, this);
            tempSprite.events.onDragStop.add(onDragStop, this);
        }

        stateText = game.add.text(350,250,' ', { font: '50px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    }

    function update() {
        //game.input.onTap.addOnce(restart,this);
    }

    var collection = 'Eggs Collected: ' + eggsCollected + '/52';

    function render() {
        game.debug.text(collection, 250, 150);
    }

    var dragX = 0;
    var dragY = 0;

    function onDragStart(sprite, pointer) {
        dragX = sprite.x;
        dragY = sprite.y;
    }

    var xCoor = [38, 129, 217, 307, 398, 490, 573];
    var yCoor = 33;

    var eggCounter = [0, 0, 0, 0, 0, 0, 0];
    


    function onDragStop(sprite, pointer){
        var made = 0;
        if(sprite.key==='red'){
            if(pointer.x >= 35 && pointer.x <= 35+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[0]++;
                made = 1;
            }
        }else if(sprite.key==='orange'){
            if(pointer.x >= 126 && pointer.x <= 126+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[1]++;
                made = 1;
            }
        }else if(sprite.key==='yellow'){
            if(pointer.x >= 214 && pointer.x <= 214+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[2]++;
                made = 1;
            }           
        }else if(sprite.key==='green'){
            if(pointer.x >= 304 && pointer.x <= 304+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[3]++;
                made = 1;
            }           
        }else if(sprite.key==='blue'){
            if(pointer.x >= 395 && pointer.x <= 395+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[4]++;
                made = 1;
            }            
        }else if(sprite.key==='purple'){
            if(pointer.x >= 487 && pointer.x <= 487+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[5]++;
                made = 1;
            }           
        }else if(sprite.key==='pink'){
            if(pointer.x >= 570 && pointer.x <= 570+78 && pointer.y >= 30 && pointer.y <= 30+107){
                sprite.destroy();
                eggCounter[6]++;
                made = 1;
            }           
        }

        if(eggCounter[0] === firstLimit){
            game.add.sprite(xCoor[0],yCoor, 'red2');
        }
        if(eggCounter[1] === firstLimit){
            game.add.sprite(xCoor[1],yCoor, 'orange2');
        }
        if(eggCounter[2] === firstLimit){
            game.add.sprite(xCoor[2],yCoor, 'yellow2');
        }
        if(eggCounter[3] === firstLimit){
            game.add.sprite(xCoor[3],yCoor, 'green2');
        }
        if(eggCounter[4] === firstLimit){
            game.add.sprite(xCoor[4],yCoor, 'blue2');
        }
        if(eggCounter[5] === firstLimit){
            game.add.sprite(xCoor[5],yCoor, 'purple2');
        }
        if(eggCounter[6] === firstLimit){
            game.add.sprite(xCoor[6],yCoor, 'pink2');
        }

        if(eggCounter[0] === secondLimit){
            game.add.sprite(xCoor[0],yCoor, 'red1');
        }
        if(eggCounter[1] === secondLimit){
            game.add.sprite(xCoor[1],yCoor, 'orange1');
        }
        if(eggCounter[2] === secondLimit){
            game.add.sprite(xCoor[2],yCoor, 'yellow1');
        }
        if(eggCounter[3] === secondLimit){
            game.add.sprite(xCoor[3],yCoor, 'green1');
        }
        if(eggCounter[4] === secondLimit){
            game.add.sprite(xCoor[4],yCoor, 'blue1');
        }
        if(eggCounter[5] === secondLimit){
            game.add.sprite(xCoor[5],yCoor, 'purple1');
        }
        if(eggCounter[6] === secondLimit){
            game.add.sprite(xCoor[6],yCoor, 'pink1');
        }

        if(eggCounter[0] === eggPerCrate){
            game.add.sprite(xCoor[0]-3,yCoor-3, 'topcrate');
        } 
        if(eggCounter[1] === eggPerCrate){
            game.add.sprite(xCoor[1]-3,yCoor-3, 'topcrate');
        }
        if(eggCounter[2] === eggPerCrate){
            game.add.sprite(xCoor[2]-3,yCoor-3, 'topcrate');
        }
        if(eggCounter[3] === eggPerCrate){
            game.add.sprite(xCoor[3]-3,yCoor-3, 'topcrate');
        }
        if(eggCounter[4] === eggPerCrate){
            game.add.sprite(xCoor[4]-3,yCoor-3, 'topcrate');
        }
        if(eggCounter[5] === eggPerCrate){
            game.add.sprite(xCoor[5]-3,yCoor-3, 'topcrate');
        }
        if(eggCounter[6] === eggPerCrate){
            game.add.sprite(xCoor[6]-3,yCoor-3, 'topcrate');
        }



        if(made===0){
            //var randX = game.rnd.integerInRange(topLeftX, bottomRightX);
            //var randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            sprite.x = dragX;
            sprite.y = dragY;
            gameEnded = true;
        }else{
            eggsCollected++;
            var happy2 = game.add.audio('happy');
            happy2.play();
            if(eggsCollected % 5 === 0){
                mount.play();
            }
            collection = 'Eggs Collected: ' + eggsCollected + '/' + numEggs;
            if(eggsCollected === numEggs){
                stateText.text = "You collected\n      all of \nYoshi's Eggs!";
                stateText.visible = true;
            }
        }

        if (pointer.y > 400){
            console.log('input disabled on', sprite.key);
            sprite.input.enabled = false;

            sprite.sendToBack();
        }
    }
};


/*
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


    var numEggs = 56;
    var firstLimit = 4;
    var secondLimit = 7;
    var eggPerCrate = 8;

    var music;
    var mount;
    var happy;

    var stateText;
    var eggsCollected = 0;

    var startText;

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
        game.load.image('red1', 'assets/redeggcrate1.png');
        game.load.image('red2', 'assets/redeggcrate2.png');
        game.load.image('orange1', 'assets/orangeeggcrate1.png');
        game.load.image('orange2', 'assets/orangeeggcrate2.png');
        game.load.image('yellow1', 'assets/yelloweggcrate1.png');
        game.load.image('yellow2', 'assets/yelloweggcrate2.png');
        game.load.image('green1', 'assets/greeneggcrate1.png');
        game.load.image('green2', 'assets/greeneggcrate2.png');
        game.load.image('blue1', 'assets/lblueeggcrate1.png');
        game.load.image('blue2', 'assets/lblueeggcrate2.png');
        game.load.image('purple1', 'assets/purpleeggcrate1.png');
        game.load.image('purple2', 'assets/purpleeggcrate2.png');
        game.load.image('pink1', 'assets/pinkeggcrate1.png');
        game.load.image('pink2', 'assets/pinkeggcrate2.png');
        game.load.image('topcrate', 'assets/cratetop.png');

        game.load.audio('yoshi', 'assets/audio/story-theme.mp3');
        game.load.audio('mount', 'assets/audio/mountsound.mp3');
        game.load.audio('happy', 'assets/audio/happysound.mp3');
    }


    function create() {
        music = game.add.audio('yoshi');
        music.play();
        mount = game.add.audio('mount');
        //happy = game.add.audio('happy');
        var back = game.add.sprite(0,0, 'background');
        var images = game.cache.getKeys(Phaser.Cache.IMAGE);

        startText.text = "You are a farmer in Yoshi's Farm, and Yoshi accidentally knocked over the crates to be shipped. Quickly put them back in the right spot without making any mistakes.";
        startText.visible = true;
        var test = game.add.group();
        var randX = 0;
        var randY = 0;
        var counter = 0;
        for (var i = 0; i < numEggs; i++){
            randX = game.rnd.integerInRange(topLeftX, bottomRightX);
            randY = game.rnd.integerInRange(topLeftY, bottomRightY);
            var img = game.rnd.pick(images);
            //var randImg = game.rnd.integerInRange(0, 6);
            var tempSprite;
            if(counter === 0){
                tempSprite = test.create(randX, randY, 'red');
            }else if(counter === 1){
                tempSprite = test.create(randX, randY, 'blue');
            }else if(counter === 2){
                tempSprite = test.create(randX, randY, 'purple');
            }else if(counter === 3){
                tempSprite = test.create(randX, randY, 'green');
            }else if(counter === 4){
                tempSprite = test.create(randX, randY, 'pink');
            }else if(counter === 5){
                tempSprite = test.create(randX, randY, 'yellow');
            }else if(counter === 6){
                tempSprite = test.create(randX, randY, 'orange');
            }
            counter++;
            if(counter === 7){
                counter = 0;
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
        game.input.onTap.addOnce(startGame,this);
    }

    function startGame(){
        
    }

    var collection = 'Eggs Collected: ' + eggsCollected + '/52';

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

    var xCoor = [38, 129, 217, 307, 398, 490, 573];
    var yCoor = 33;

    var eggCounter = [0, 0, 0, 0, 0, 0, 0];
    var gameEnded = false;


    function onDragStop(sprite, pointer){

        //result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y;
        if(gameEnded === false){
            var made = 0;
            if(sprite.key==='red'){
                if(pointer.x >= 35 && pointer.x <= 35+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[0]++;
                    made = 1;
                }
            }else if(sprite.key==='orange'){
                if(pointer.x >= 126 && pointer.x <= 126+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[1]++;
                    made = 1;
                }
            }else if(sprite.key==='yellow'){
                if(pointer.x >= 214 && pointer.x <= 214+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[2]++;
                    made = 1;
                }           
            }else if(sprite.key==='green'){
                if(pointer.x >= 304 && pointer.x <= 304+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[3]++;
                    made = 1;
                }           
            }else if(sprite.key==='blue'){
                if(pointer.x >= 395 && pointer.x <= 395+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[4]++;
                    made = 1;
                }            
            }else if(sprite.key==='purple'){
                if(pointer.x >= 487 && pointer.x <= 487+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[5]++;
                    made = 1;
                }           
            }else if(sprite.key==='pink'){
                if(pointer.x >= 570 && pointer.x <= 570+78 && pointer.y >= 30 && pointer.y <= 30+107){
                    sprite.destroy();
                    eggCounter[6]++;
                    made = 1;
                }           
            }

            if(eggCounter[0] === firstLimit){
                game.add.sprite(xCoor[0],yCoor, 'red2');
            }
            if(eggCounter[1] === firstLimit){
                game.add.sprite(xCoor[1],yCoor, 'orange2');
            }
            if(eggCounter[2] === firstLimit){
                game.add.sprite(xCoor[2],yCoor, 'yellow2');
            }
            if(eggCounter[3] === firstLimit){
                game.add.sprite(xCoor[3],yCoor, 'green2');
            }
            if(eggCounter[4] === firstLimit){
                game.add.sprite(xCoor[4],yCoor, 'blue2');
            }
            if(eggCounter[5] === firstLimit){
                game.add.sprite(xCoor[5],yCoor, 'purple2');
            }
            if(eggCounter[6] === firstLimit){
                game.add.sprite(xCoor[6],yCoor, 'pink2');
            }

            if(eggCounter[0] === secondLimit){
                game.add.sprite(xCoor[0],yCoor, 'red1');
            }
            if(eggCounter[1] === secondLimit){
                game.add.sprite(xCoor[1],yCoor, 'orange1');
            }
            if(eggCounter[2] === secondLimit){
                game.add.sprite(xCoor[2],yCoor, 'yellow1');
            }
            if(eggCounter[3] === secondLimit){
                game.add.sprite(xCoor[3],yCoor, 'green1');
            }
            if(eggCounter[4] === secondLimit){
                game.add.sprite(xCoor[4],yCoor, 'blue1');
            }
            if(eggCounter[5] === secondLimit){
                game.add.sprite(xCoor[5],yCoor, 'purple1');
            }
            if(eggCounter[6] === secondLimit){
                game.add.sprite(xCoor[6],yCoor, 'pink1');
            }

            if(eggCounter[0] === eggPerCrate){
                game.add.sprite(xCoor[0]-3,yCoor-3, 'topcrate');
            } 
            if(eggCounter[1] === eggPerCrate){
                game.add.sprite(xCoor[1]-3,yCoor-3, 'topcrate');
            }
            if(eggCounter[2] === eggPerCrate){
                game.add.sprite(xCoor[2]-3,yCoor-3, 'topcrate');
            }
            if(eggCounter[3] === eggPerCrate){
                game.add.sprite(xCoor[3]-3,yCoor-3, 'topcrate');
            }
            if(eggCounter[4] === eggPerCrate){
                game.add.sprite(xCoor[4]-3,yCoor-3, 'topcrate');
            }
            if(eggCounter[5] === eggPerCrate){
                game.add.sprite(xCoor[5]-3,yCoor-3, 'topcrate');
            }
            if(eggCounter[6] === eggPerCrate){
                game.add.sprite(xCoor[6]-3,yCoor-3, 'topcrate');
            }



            if(made===0){
                //var randX = game.rnd.integerInRange(topLeftX, bottomRightX);
                //var randY = game.rnd.integerInRange(topLeftY, bottomRightY);
                sprite.x = dragX;
                sprite.y = dragY;
                gameEnded = true;
            }else{
                eggsCollected++;
                var happy2 = game.add.audio('happy');
                happy2.play();
                if(eggsCollected % 5 === 0){
                    mount.play();
                }
                collection = 'Eggs Collected: ' + eggsCollected + '/' + numEggs;
                if(eggsCollected === numEggs){
                    stateText.text = "You collected\n      all of \nYoshi's Eggs!";
                    stateText.visible = true;
                }
            }

            if (pointer.y > 400){
                console.log('input disabled on', sprite.key);
                sprite.input.enabled = false;

                sprite.sendToBack();
            }
        }
        
    }

    function restart() {

    }

    function unpause(event){

    }
};
*/