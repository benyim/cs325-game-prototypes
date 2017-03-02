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
    var width = 800;
    var height = 400;
    var background;
    var timer;

    var boardwalk;

    //Trash items
    var can;
    var radio;
    var rope;
    var bottle;
    var bag;

    //spawn locations for trash
    var yLoc = -30; //spawn before the screen so it slowly comes onto screen
    var xLoc = [30, 90, 150, 220, 290, 360, 420, 490, 560, 630, 690, 750];
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
    //0 = can, 1 = rope, 2 = bottle, 3 = bag, 4 = radio
    var trashType = [0,0,0,0,0,0,0,0,0,0,0,0];

    var scoreString;
    var scoreText;
    var score = 0;

    var livesString;
    var livesText;
    var lives = 5;

    var trashString
    var trashText;
    var trashC = 0;

    //Sounds
    var pickup;
    var level;
    var music;
    var trashLeft;

    var gameEnded = false;

    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
    
    function preload() {
        game.load.image('background', 'assets/river3.png');
        game.load.image('can', 'assets/can.png');
        game.load.image('radio', 'assets/radio2.png');
        game.load.image('rope', 'assets/rope.png');
        game.load.image('bottle', 'assets/bottle.png');
        game.load.image('bag', 'assets/bag.png');
        game.load.image('boardwalk', 'assets/boardwalk2.png');
        //Sounds
        game.load.audio('pickup', 'assets/audio/SoundEffects/numkey.wav');
        game.load.audio('level', 'assets/audio/SoundEffects/p-ping.mp3');
        game.load.audio('trashLeft', 'assets/audio/SoundEffects/shot1.wav');
        //game.load.audio('music', 'assets/audio/CatAstroPhi_shmup_normal.wav');
        game.load.audio('music', 'assets/audio/oedipus_wizball_highscore.mp3');
    }

    function create() {

        //game.stage.backgroundColor = "#0a8906";

        // Setting the images
        background = game.add.sprite(0, 0, 'background');
        background.width = width;

        //Sounds
        pickup = game.add.audio('pickup');
        level = game.add.audio('level');
        trashLeft = game.add.audio('trashLeft');
        music = game.add.audio('music');
        music.play();

        can = game.add.sprite(xLoc[0], yLoc, 'can');
        trash = ['can', 'rope', 'bottle', 'bag', 'radio'];
        trashSpots = [can,can,can,can,can,can,can,can,can,can,can,can];

        //Timer for spawning trash
        timer = game.time.create(false);
        timer.loop(1000, spawnTrash, this);
        timer.start();

        //Scores
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '30px Arial', fill: '#fff' });

        livesString = 'Lives : ';
        livesText = game.add.text(670, 10, livesString + lives, { font: '30px Arial', fill: '#fff' });

        trashString = 'Trash Collected : ';
        trashText = game.add.text(650, 60, trashString + trashC, { font: '15px Arial', fill: '#fff' });
    }

    function setTrash(randX){
        var trashChoice = game.rnd.integerInRange(0, 4);
        trashType[randX] = trashChoice;
        currentSprite = game.add.sprite(xLoc[randX], yLoc, trash[trashChoice]);
        currentSprite.inputEnabled = true;
        currentSprite.events.onInputDown.add(listener, this);
        trashSpots[randX] = currentSprite;
        trashAlive[randX] = 1;
    }

    function listener(){
        // Setting the mouse x and y position
        var clickX = game.input.mousePointer.x;
        var clickY = game.input.mousePointer.y;
        var option = 0;
        var clicked = false;
        
        if(clickX > xLoc[0] && clickX < xLoc[0] + 30){
            trashSpots[0].destroy();
            trashAlive[0] = 0;
            trashExist-=1;
            moveTrash[0] = 0;
            option = 0;
            clicked = true;
        }else if(clickX  > xLoc[1] && clickX < xLoc[1] + 30){
            trashSpots[1].destroy();
            trashAlive[1] = 0;
            trashExist-=1;
            moveTrash[1] = 0;
            option = 1;
            clicked = true;
        }else if(clickX  > xLoc[2] && clickX < xLoc[2] + 30){
            trashSpots[2].destroy();
            trashAlive[2] = 0;
            trashExist-=1;
            moveTrash[2] = 0;
            option = 2;
            clicked = true;
        }else if(clickX  > xLoc[3] && clickX < xLoc[3] + 30){
            trashSpots[3].destroy();
            trashAlive[3] = 0;
            trashExist-=1;
            moveTrash[3] = 0;
            option = 3;
            clicked = true;
        }else if(clickX  > xLoc[4] && clickX < xLoc[4] + 30){
            trashSpots[4].destroy();
            trashAlive[4] = 0;
            trashExist-=1;
            moveTrash[4] = 0;
            option = 4;
            clicked = true;
        }else if(clickX  > xLoc[5] && clickX < xLoc[5] + 30){
            trashSpots[5].destroy();
            trashAlive[5] = 0;
            trashExist-=1;
            moveTrash[5] = 0;
            option = 5;
            clicked = true;
        }else if(clickX  > xLoc[6] && clickX < xLoc[6] + 30){
            trashSpots[6].destroy();
            trashAlive[6] = 0;
            trashExist-=1;
            moveTrash[6] = 0;
            option = 6;
            clicked = true;
        }else if(clickX  > xLoc[7] && clickX < xLoc[7] + 30){
            trashSpots[7].destroy();
            trashAlive[7] = 0;
            trashExist-=1;
            moveTrash[7] = 0;
            option = 7;
            clicked = true;
        }else if(clickX  > xLoc[8] && clickX < xLoc[8] + 30){
            trashSpots[8].destroy();
            trashAlive[8] = 0;
            trashExist-=1;
            moveTrash[8] = 0;
            option = 8;
            clicked = true;
        }else if(clickX  > xLoc[9] && clickX < xLoc[9] + 30){
            trashSpots[9].destroy();
            trashAlive[9] = 0;
            trashExist-=1;
            moveTrash[9] = 0;
            option = 9;
            clicked = true;
        }else if(clickX  > xLoc[10] && clickX < xLoc[10] + 30){
            trashSpots[10].destroy();
            trashAlive[10] = 0;
            trashExist-=1;
            moveTrash[10] = 0;
            option = 10;
            clicked = true;
        }else if(clickX  > xLoc[11] && clickX < xLoc[11] + 30){
            trashSpots[11].destroy();
            trashAlive[11] = 0;
            trashExist-=1;
            moveTrash[11] = 0;
            option = 11;
            clicked = true;
        }
        if(trashType[option] === 0){
            score += 20;
        }else if(trashType[option] === 1){
            score += 30;
        }else if(trashType[option] === 2){
            score += 40;
        }else if(trashType[option] === 3){
            score += 50;
        }else if(trashType[option] === 4){
            score += 100;
        }
        scoreText.text = scoreString + score;

        if(clicked){
            //play sound
            pickup.play();
            trashC++;
            trashText.text = trashString + trashC;
            if(trashC%10 === 0){
                //play another sound
                level.play();
            }
        }
    }

    function spawnTrash(){
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

    function update() {
        if(gameEnded === false){
            var i;
            for(i = 0; i < trashSpots.length; i++){
                //move trash if chosen
                if(moveTrash[i] === 1){
                    if(trashType[i] === 0){
                        trashSpots[i].y+=.5;
                    }else if(trashType[i] === 1){
                        trashSpots[i].y+=1;
                    }else if(trashType[i] === 2){
                        trashSpots[i].y+=1.5;
                    }else if(trashType[i] === 3){
                        trashSpots[i].y+=2;
                    }else if(trashType[i] === 4){
                        trashSpots[i].y+=3;
                    }
                }
                //destroy trash
                if(trashSpots[i].y > height && trashAlive[i] === 1){
                    trashSpots[i].destroy();
                    trashAlive[i] = 0;
                    trashExist-=1;
                    moveTrash[i] = 0;
                    lives--;
                    livesText.text = livesString + lives;
                    trashLeft.play();
                }

                /*if(lives === 0){
                    gameEnded = true;
                    ret
                }*/
            }
        }
    }

    function restart () {
        /*for(var x = 0; x < enemyCount; x++){
            enemyKilled[x] = 0;
        }

        //reset sprites and reset
        player.destroy();
        enemy1.destroy();
        enemy2.destroy();
        enemy3.destroy();
        enemy4.destroy();
        enemy5.destroy();

        enemy1 = game.add.sprite(enemyPosX[0], enemyPosY[0], 'enemy');
        enemy2 = game.add.sprite(enemyPosX[1], enemyPosY[1], 'enemy');
        enemy3 = game.add.sprite(enemyPosX[2], enemyPosY[2], 'enemy');
        enemy4 = game.add.sprite(enemyPosX[3], enemyPosY[3], 'enemy');
        enemy5 = game.add.sprite(enemyPosX[4], enemyPosY[4], 'enemy');
        enemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
        enemyDir = 1;

        player = game.add.sprite(50, 50, 'ninjaD');
        player.width = 50;
        player.height = 50;
        stateText.visible = false;*/
    }

    function render() {
        //game.debug.text('x-pos: ' + game.input.mousePointer.x, 32, 32);
    }
};
