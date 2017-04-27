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
    var width = 400;
    var height = 600;

    //var imageWidth = 58;
    //var imageHeight = 60;

    var topY = 0;
    var topLeftX = 20;
    var topRightX = width-80;
    var xLoc = [20, 40, 60, 80, 100, 120, 140, 180, 220, 260, 300, 325];

    var timer;

    var passingLine = height-30; //to deal with fruits passing the basket
    var basketY = 550;

    var group;


    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {
        game.load.image('apple', 'assets/apple.png');
        game.load.image('watermelon', 'assets/watermelon.png');
        game.load.image('peach', 'assets/peach.png');
        game.load.image('orange', 'assets/orange.png');
        game.load.image('grape', 'assets/grape.png');
        game.load.image('banana', 'assets/banana.png');
        game.load.image('coconut', 'assets/coconut.png');
        game.load.image('badfruit', 'assets/badfruit.png');
        game.load.image('box', 'assets/box.png');

        //game.load.image('background', 'assets/background.png');

        //game.load.audio('yoshi', 'assets/audio/story-theme.mp3');
        //game.load.audio('mount', 'assets/audio/mountsound.mp3');
        //game.load.audio('happy', 'assets/audio/happysound.mp3');
    }

    var fruits;
    var player;
    var playerX = width/2;

    function create() {
        //music = game.add.audio('yoshi');
        //music.play();
        //mount = game.add.audio('mount');
        fruits = game.add.physicsGroup();

        //var back = game.add.sprite(0,0, 'background');
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        timer = game.time.create(false);
        timer.loop(500, updateCounter, this);
        timer.start();

        var images = game.cache.getKeys(Phaser.Cache.IMAGE);

        game.stage.backgroundColor="#22cc58";
        

        player = game.add.sprite(playerX, height-100, 'box');
        group = game.add.group();

        
        //var images = game.cache.getKeys(Phaser.Cache.IMAGE);

        //var test = game.add.group();

        //stateText = game.add.text(350,250,' ', { font: '50px Arial', fill: '#fff' });
        //stateText.anchor.setTo(0.5, 0.5);
        //stateText.text = "You collected\n      all of \nYoshi's Eggs!";
        //stateText.visible = false;

    }

    var lastDropLoc = 0;

    function updateCounter() {
        //var images = game.cache.getKeys(Phaser.Cache.IMAGE);

        //var test = game.add.group();
        var randX = 0;
        var randY = 0;
        //var direction = game.rnd.integerInRange(0, 1); 
        randX = game.rnd.integerInRange(0, xLoc.length-1);
        //var img = game.rnd.pick(images);
        var randImg = game.rnd.integerInRange(0, 7);
        var tempSprite;
        if(randImg == 0){
            tempSprite = fruits.create(xLoc[randX], topY, 'apple');
        }else if(randImg == 1){
            tempSprite = fruits.create(xLoc[randX], topY, 'watermelon');
        }else if(randImg == 2){
            tempSprite = fruits.create(xLoc[randX], topY, 'orange');
        }else if(randImg == 3){
            tempSprite = fruits.create(xLoc[randX], topY, 'peach');
        }else if(randImg == 4){
            tempSprite = fruits.create(xLoc[randX], topY, 'grape');
        }else if(randImg == 5){
            tempSprite = fruits.create(xLoc[randX], topY, 'coconut');
        }else if(randImg == 6){
            tempSprite = fruits.create(xLoc[randX], topY, 'banana');
        }else if(randImg == 7){
            tempSprite = fruits.create(xLoc[randX], topY, 'badfruit');
        }
        tempSprite.inputEnabled = true;
        this.physics.enable(tempSprite,Phaser.Physics.ARCADE);
        tempSprite.body.gravity.y = 100;
        //tempSprite.physics.arcade.enable(this);
        //tempSprite.input.enableDrag(false, true);
        //tempSprite.events.onDragStart.add(onDragStart, this);
        //tempSprite.events.onDragStop.add(onDragStop, this);
        fruits.setAll('outOfBoundsKill', true);
        fruits.setAll('checkWorldBounds', true);

        //group.add(new Fruits(game));
    }

    function update() {

        if (game.physics.arcade.collide(player, fruits, collisionHandler, processHandler, this))
        {
            console.log('boom');
        }
        //game.physics.arcade.overlap(player, fruits, collisionHandler, null, this);

        player.x = game.input.mousePointer.x-45;
        if(player.x > width-100){
            player.x = width-100;
        }else if(player.x < 5){
            player.x = 5;
        }
    }

    function processHandler (player, fruit) {
        return true;
    }

    function collisionHandler (player, fruit) {
        fruit.kill();
    }

    //var collection = 'Eggs Collected: ' + eggsCollected + '/30';

    function render() {
        //game.debug.text(collection, 250, 150);
        //game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
        //game.debug.text('Loop Count: ' + total, 32, 64);
    }
};