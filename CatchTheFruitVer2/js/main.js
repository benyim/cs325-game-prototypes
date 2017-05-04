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
    

    //To DO LIST
    // clickable buttons to fish the trash
    // re load sprite of dock every time a trash is spawned in so trash goes behind it
    // change of plans, will just make trash clickable somehow and make it dissapear
    // will add sound and a point system to make it more fun

    // make error sound when each trash leaves the screen
    // make a check sound when player clicks trash
    // spawn randomly, constantly, not when all 12 trash leave the screen
    // may not need the trashalive variable

    "use strict";
    var barX = 10;
    var barY = 577;
    var width = 400;
    var height = 600;
    var background;
    var timer;

    var boardwalk;

    //Trash items
    var can;
    var radio;
    var rope;
    var bottle;
    var bag;
    var level = 1;
    var pitcher = 0;

    //Fruit bar
    //var fullm5,fullm4,fullm3,fullm2,fullm1,full1,full2,full3,full4,full5,full6,full7,full8,full9,full;

    //spawn locations for trash
    var yLoc = -80; //spawn before the screen so it slowly comes onto screen
    var xLoc = [20, 40, 60, 80, 100, 120, 140, 180, 220, 260, 300, 325];
    var trash;// array to hold the different types of trash
    var trashSpots; // array to hold the trash for each 12 lanes
    var counter = 0; // counter to use for for loops
    var currentSprite; // sprite used for the for loop
    var trashCount = 12; // number of trashes to be displayed at any given time
    
    // amount of trash that are still alive on the screen, 1 for alive, 0 for fell off screen
    var trashAlive = [1,1,1,1,1,1,1,1,1,1,1,1];
    // array to keep track of which trash needs to be moved
    var moveTrash = [0,0,0,0,0,0,0,0,0,0,0,0];
    var trashSpawned = 0;
    var trashExist = 12;
    //0 = can, 1 = rope, 2 = bottle, 3 = bag, 4 = radio, 5 = badfruit;
    var trashType = [0,0,0,0,0,0,0,0,0,0,0,0];

    var scoreString;
    var scoreText;
    var score = 0;

    var livesString;
    var livesText;
    var lives = 3;

    var trashString
    var trashText;
    var trashC = 0;

    var stateText;

    //Sounds
    var pickup;
    var level;
    var music;
    var trashLeft;

    var gameEnded = false;

    var fruitCollected = 0;

    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
    
    function preload() {
        //game.load.image('background', 'assets/river3.png');
        game.load.image('apple', 'assets/apple.png');
        game.load.image('watermelon', 'assets/watermelon.png');
        game.load.image('peach', 'assets/peach.png');
        game.load.image('orange', 'assets/orange.png');
        game.load.image('grape', 'assets/grape.png');
        game.load.image('banana', 'assets/banana.png');
        game.load.image('coconut', 'assets/coconut.png');
        game.load.image('badfruit', 'assets/badfruit.png');
        game.load.image('box', 'assets/box.png');
        game.load.image('pitcher', 'assets/pitcher.png');
        game.load.image('carton', 'assets/carton.png');
        game.load.image('background', 'assets/acbackground.jpg');
        
        game.load.image('fullm5', 'assets/full-5.png');
        game.load.image('fullm4', 'assets/full-4.png');
        game.load.image('fullm3', 'assets/full-3.png');
        game.load.image('fullm2', 'assets/full-2.png');
        game.load.image('fullm1', 'assets/full-1.png');
        game.load.image('full1', 'assets/full1.png');
        game.load.image('full2', 'assets/full2.png');
        game.load.image('full3', 'assets/full3.png');
        game.load.image('full4', 'assets/full4.png');
        game.load.image('full5', 'assets/full5.png');
        game.load.image('full6', 'assets/full6.png');
        game.load.image('full7', 'assets/full7.png');
        game.load.image('full8', 'assets/full8.png');
        game.load.image('full9', 'assets/full9.png');
        game.load.image('full', 'assets/full.png');
        //Sounds
        game.load.audio('music', 'assets/audio/delfinoplaza.mp3');
        game.load.audio('catch', 'assets/audio/p-ping.mp3');
        game.load.audio('catch2', 'assets/audio/numkey.wav');
        //game.load.audio('trashLeft', 'assets/audio/SoundEffects/shot1.wav');
        //game.load.audio('music', 'assets/audio/CatAstroPhi_shmup_normal.wav');
        //game.load.audio('music', 'assets/audio/oedipus_wizball_highscore.mp3');
    }

    var fruitsC = 0;

    var player;
    var playerX = width/2;
    var kiwi1, kiwi2, kiwi3;
    var music;
    var bar;
    var ping;
    var catch2;

    function create() {

        //game.stage.backgroundColor = "#0a8906";

        // Setting the images
        //background = game.add.sprite(0, 0, 'background');
        //background.width = width;

        //Sounds
        //pickup = game.add.audio('pickup');
        ping = game.add.audio('catch');
        catch2 = game.add.audio('catch2');
        //trashLeft = game.add.audio('trashLeft');
        music = game.add.audio('music');
        music.play();
        game.add.sprite(0, 0, 'background');
        game.add.sprite(10, 60, 'pitcher');
        kiwi1 = game.add.sprite(width - 60, 10, 'carton');
        kiwi2 = game.add.sprite(width - 60, 90, 'carton');
        kiwi3 = game.add.sprite(width - 60, 170, 'carton');
        player = game.add.sprite(playerX, height-100, 'box');
        bar = game.add.sprite(barX, barY, 'fullm5');
        //game.stage.backgroundColor="#22cc58";

        can = game.add.sprite(xLoc[0], yLoc, 'apple');
        trash = ['apple', 'watermelon', 'peach', 'orange', 'grape', 'banana', 'coconut', 'badfruit'];
        trashSpots = [can,can,can,can,can,can,can,can,can,can,can,can];

        //Timer for spawning trash
        timer = game.time.create(false);
        timer.loop(500, spawnTrash, this);
        timer.start();

        //Scores
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '30px Arial', fill: '#fff' });

        livesString = 'Lives : ';
        livesText = game.add.text(670, 10, livesString + lives, { font: '30px Arial', fill: '#fff' });

        trashString = 'X ';
        trashText = game.add.text(75, 80, trashString + trashC, { font: '30px Arial', fill: '#fff' });

        stateText = game.add.text(210,300,' ', { font: '50px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    }

    function setTrash(randX){
        var trashChoice = game.rnd.integerInRange(0, 7);
        trashType[randX] = trashChoice;
        currentSprite = game.add.sprite(xLoc[randX], yLoc, trash[trashChoice]);
        currentSprite.inputEnabled = true;
        //currentSprite.events.onInputDown.add(listener, this);
        trashSpots[randX] = currentSprite;
        trashAlive[randX] = 1;
    }

    function spawnTrash(){
        player.destroy();
        player = game.add.sprite(playerX, height-100, 'box');
        if(gameEnded === false){
            var i;
            var chosen = false;
            while(chosen === false){
                var randX = game.rnd.integerInRange(0, 11);
                if(moveTrash[randX] === 0){
                    moveTrash[randX] = 1;
                    setTrash(randX);
                    chosen = true;
                    //trashSpawned++;
                }
            }
        }
    }

    var missed = 0;
    var madeIt = false;

    function update() {
        player.x = game.input.mousePointer.x-45;
        if(player.x > width-100){
            player.x = width-100;
        }else if(player.x < 5){
            player.x = 5;
        }
        if(gameEnded === false){
            var i;
            for(i = 0; i < trashSpots.length; i++){
                //var fruitCenter = xLoc[i]+20;
                //move trash if chosen
                if(moveTrash[i] === 1){
                    if(trashSpots[i].y >= player.y-10 && trashSpots[i].y+30 <= player.y+69 && trashSpots[i].x >= player.x && trashSpots[i].x+50 <= player.x+96){
                        trashSpots[i].destroy();
                        trashAlive[i] = 0;
                        trashExist-=1;
                        moveTrash[i] = 0;
                        fruitCollected++;
                        fruitsC++;
                        catch2.play();
                        madeIt = true;
                        scoreText.text = scoreString + score;
                        //checker to see if the player caught the bad fruit, should end game
                        if(trashType[i] === 7){
                            kiwi3.destroy();
                            kiwi2.destroy();
                            kiwi1.destroy();
                            gameEnded = true;
                            stateText.text="  You caught the\n    bad fruit! \nClick to try again";
                            stateText.visible = true;
                            var i;
                            for(i = 0; i < trashCount; i++){
                                //trashCount[i].destroy();
                                trashSpots[i].destroy();
                                trashAlive[i] = 0;
                                moveTrash[i] = 0;
                            }
                            game.input.onTap.addOnce(restart,this);
                            break;
                            //score-=100;
                            //scoreText.text = scoreString + score;
                        }else{
                            score += 20;
                        }
                        if(fruitCollected%14 === 0){
                            //play a sound
                            ping.play();
                            trashC++;
                            trashText.text = trashString + trashC;
                            // checker for if player beat the level
                            if(trashC % 3 == 0 && trashC != 0){
                                level++;
                                if(level == 6){
                                    stateText.text="      You WON!\n      CONGRATS!\nClick to restart";
                                }else{
                                    stateText.text="  You made it\n   to level " + level + "! \nClick to continue";
                                }      
                                stateText.visible = true;
                                gameEnded = true;
                                var i;
                                for(i = 0; i < trashCount; i++){
                                    //trashCount[i].destroy();
                                    trashSpots[i].destroy();
                                    trashAlive[i] = 0;
                                    moveTrash[i] = 0;
                                }
                                if(level == 6){
                                    game.input.onTap.addOnce(restart,this);
                                }else{
                                    game.input.onTap.addOnce(levelHandler,this);
                                }
                                break;
                            }
                        }
                    }
                }
                if(madeIt){
                    madeIt = false;
                    if(fruitsC == 0){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'fullm5');
                    }else if(fruitsC == 1){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'fullm4');
                    }else if(fruitsC == 2){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'fullm3');
                    }else if(fruitsC == 3){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'fullm2');
                    }else if(fruitsC == 4){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'fullm1');
                    }else if(fruitsC == 5){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full1');
                    }else if(fruitsC == 6){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full2');
                    }else if(fruitsC == 7){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full3');
                    }else if(fruitsC == 8){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full4');
                    }else if(fruitsC == 9){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full5');
                    }else if(fruitsC == 10){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full6');
                    }else if(fruitsC == 11){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full7');
                    }else if(fruitsC == 12){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full8');
                    }else if(fruitsC == 13){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full9');
                    }else if(fruitsC == 14){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'full');
                    }
                    if(fruitsC == 14){
                        bar.destroy();
                        bar = game.add.sprite(barX, barY, 'fullm5');
                        fruitsC = 0;
                    }
                }
                if(moveTrash[i] === 1){
                    if(level == 1){
                        trashSpots[i].y+=3;
                    }else if(level == 2){
                        trashSpots[i].y+=4;
                    }else if(level == 3){
                        trashSpots[i].y+=5;
                    }else if(level == 4){
                        trashSpots[i].y+=6;
                    }else if(level == 5){
                        trashSpots[i].y+=7;
                    }
                }
                //destroy trash
                if(trashSpots[i].y > height && trashAlive[i] === 1){
                    trashSpots[i].destroy();
                    trashAlive[i] = 0;
                    trashExist-=1;
                    moveTrash[i] = 0;
                    
                    //livesText.text = livesString + lives;
                    // checker for if a good fruit passes the player
                    if(trashType[i] !== 7){
                        lives--;
                        missed++;
                        if(missed === 1){
                            kiwi3.destroy();
                        }else if(missed === 2){
                            kiwi2.destroy();
                        }else if(missed === 3){
                            kiwi1.destroy();
                        }
                    }
                }

                //End the game
                if(lives === 0){
                    fruitsC = 0;
                    gameEnded = true;
                    stateText.text=" You dropped too\nmany ingredients! \n Click to try again";
                    stateText.visible = true;
                    var i;
                    for(i = 0; i < trashCount; i++){
                        //trashCount[i].destroy();
                        trashSpots[i].destroy();
                        trashAlive[i] = 0;
                        moveTrash[i] = 0;
                    }
                    game.input.onTap.addOnce(restart,this);
                }
            }
        }
    }

    function restart () {
        fruitsC = 0;
        fruitCollected = 0;
        bar.destroy();
        bar = game.add.sprite(barX, barY, 'fullm5');
        gameEnded = false;
        score = 0;
        scoreText.text = scoreString + score;
        lives = 3;
        trashC = 0;
        trashText.text = trashString + trashC;
        livesText.text = livesString + lives;
        stateText.visible = false;
        kiwi1 = game.add.sprite(width - 60, 10, 'carton');
        kiwi2 = game.add.sprite(width - 60, 90, 'carton');
        kiwi3 = game.add.sprite(width - 60, 170, 'carton');
        missed = 0;
        level = 1;
    }

    function levelHandler() {
        fruitCollected = 0;
        bar.destroy();
        bar = game.add.sprite(barX, barY, 'fullm5');
        gameEnded = false;
        //score = 0;
        //scoreText.text = scoreString + score;
        lives = 3;
        //trashC = 0;
        //trashText.text = trashString + trashC;
        livesText.text = livesString + lives;
        stateText.visible = false;
        kiwi1.destroy();
        kiwi2.destroy();
        kiwi3.destroy();
        kiwi1 = game.add.sprite(width - 60, 10, 'carton');
        kiwi2 = game.add.sprite(width - 60, 90, 'carton');
        kiwi3 = game.add.sprite(width - 60, 170, 'carton');
        missed = 0;
    }

    function render() {
        //game.debug.text('x-pos: ' + game.input.mousePointer.x, 32, 32);
    }
};
