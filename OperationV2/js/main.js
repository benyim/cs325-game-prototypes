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

    //GOALS
    // Show crads when clicked to give player a chance to memorize what was at that position
    // Adding randomness to the game COMPLETED
    // Restart state
    // Not allow players to click on top of the screen twice COMPLETED
    // fix issue where once a match is found, you can click on it and make a wrong move and it turns the card back over again
    
    "use strict";
    var width = 400;
    var height = 700;

    var imageWidth = 50;
    var imageHeight = 50;

    //Sounds
    var music;
    var correct;
    var wrong;

    var nose;
    var recentClick = 0;
    var totalClick = [0,0];
    var firstPicked = false;
    var secondPicked = false;
    var temp2;
    var gameEnded = false;
    var matched = 0;

    //Texts
    var livesString;
    var livesText;
    var lives = 8;
    var stateText;

    // Image variables
    var heart;
    var heart2;
    var bone;
    var bone2;
    var apple;
    var apple2;
    var icecream;
    var icecream2;
    var wishbone;
    var wishbone2;
    var ribs;
    var ribs2;
    var butterfly;
    var butterfly2;
    var pencil;
    var pencil2;
    var bread;
    var bread2;
    var horse;
    var horse2;

    var tempPic;

    //background image
    var operation;

    var xRandom = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    // exmaple xRandom
    //  xRandom = [0,7,0,11,0,3,0,9,0,19,0,17,0,1,0,5,0,13,0,15]
    //var yRandom = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    var cardsClicked = 0; // keeps track of how many cards have been clicked

    // HEART, FUNNY BONE, ADAMS APPLE, BRAIN FREEZE, WISH BONE, SPARE RIBS, BUTTERFLIES, WRITERS CRAMP, BREAD BASKET, CHARLIE HORSE
    //The location of the images, it goes by every 2, since there are two of each card.
    var xLocation = [230, 100, 70, 150, 180, 200, 220, 250, 170, 300, 140, 100, 200, 150, 300, 200, 180, 250, 120, 300];
    var yLocation = [270, 600, 320, 600, 190, 600, 10, 600, 260, 600, 340, 650, 380, 650, 400, 650, 480, 650, 550, 650];
    // Array to handle which cards have been clicked to be used when seeing if matching cards were picked.
    var clicked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 

    var checker; //temp var to be used in one of the functions

    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.image('cardBack', 'assets/cardBack.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('bone', 'assets/bone.png');
        game.load.image('operationBoard', 'assets/OperationGame.png');
        game.load.image('icecream', 'assets/icecream.png');
        game.load.image('horse', 'assets/horse.png');
        game.load.image('bread', 'assets/bread.png');
        game.load.image('apple', 'assets/apple.png');
        game.load.image('wishbone', 'assets/wishbone.png');
        game.load.image('butterfly', 'assets/butterfly.png');
        game.load.image('pencil', 'assets/pencil.png');
        game.load.image('ribs', 'assets/rib.png');
        game.load.image('greennose', 'assets/greennose.png');
        game.load.image('rednose', 'assets/rednose.png');

        game.load.audio('correct', 'assets/audio/gmae.wav');
        game.load.audio('wrong', 'assets/audio/SoundEffects/shot1.wav');
        game.load.audio('music', 'assets/audio/Wii Shop Channel Music.mp3');
    }

    function create() {

        operation = game.add.sprite(0, 0, 'operationBoard');
        operation.width = width;
        operation.height = height-100;

        var i = 0;
        var x = 0;
        var newNumFound = false;
        var allDifferent = false
        for(i = 0; i < xLocation.length; i+=2){
            while(newNumFound == false){
                var rand = game.rnd.integerInRange(0, 19);
                for(x = 0; x < xLocation.length; x+=2){
                    if(rand == xRandom[x+1] || rand%2===0){
                        allDifferent = false;
                        break;
                    }else{
                        allDifferent = true;
                    }
                }
                if(allDifferent){
                    newNumFound = true;
                }
            }
            xRandom[i+1] = rand;
            newNumFound = false;
        }

        //Sounds
        correct = game.add.audio('correct');
        music = game.add.audio('music');
        wrong = game.add.audio('wrong');
        music.play();

        // Setting the images
        heart = game.add.sprite(xLocation[0], yLocation[0], 'cardBack');
        heart2 = game.add.sprite(xLocation[xRandom[1]], yLocation[xRandom[1]], 'cardBack');
        bone = game.add.sprite(xLocation[2], yLocation[2], 'cardBack');
        bone2 = game.add.sprite(xLocation[xRandom[3]], yLocation[xRandom[3]], 'cardBack');
        apple = game.add.sprite(xLocation[4], yLocation[4], 'cardBack');
        apple2 = game.add.sprite(xLocation[xRandom[5]], yLocation[xRandom[5]], 'cardBack');
        icecream = game.add.sprite(xLocation[6], yLocation[6], 'cardBack');
        icecream2 = game.add.sprite(xLocation[xRandom[7]], yLocation[xRandom[7]], 'cardBack');
        wishbone = game.add.sprite(xLocation[8], yLocation[8], 'cardBack');
        wishbone2 = game.add.sprite(xLocation[xRandom[9]], yLocation[xRandom[9]], 'cardBack');
        ribs = game.add.sprite(xLocation[10], yLocation[10], 'cardBack');
        ribs2 = game.add.sprite(xLocation[xRandom[11]], yLocation[xRandom[11]], 'cardBack');
        butterfly = game.add.sprite(xLocation[12], yLocation[12], 'cardBack');
        butterfly2 = game.add.sprite(xLocation[xRandom[13]], yLocation[xRandom[13]], 'cardBack');
        pencil = game.add.sprite(xLocation[14], yLocation[14], 'cardBack');
        pencil2 = game.add.sprite(xLocation[xRandom[15]], yLocation[xRandom[15]], 'cardBack');
        bread = game.add.sprite(xLocation[16], yLocation[16], 'cardBack');
        bread2 = game.add.sprite(xLocation[xRandom[17]], yLocation[xRandom[17]], 'cardBack');
        horse = game.add.sprite(xLocation[18], yLocation[18], 'cardBack');
        horse2 = game.add.sprite(xLocation[xRandom[19]], yLocation[xRandom[19]], 'cardBack');
        
        //Allowing images to be clicked
        heart.inputEnabled = true;
        heart2.inputEnabled = true;
        bone.inputEnabled = true;
        bone2.inputEnabled = true;
        apple.inputEnabled = true;
        apple2.inputEnabled = true;
        icecream.inputEnabled = true;
        icecream2.inputEnabled = true;
        wishbone.inputEnabled = true;
        wishbone2.inputEnabled = true;
        ribs.inputEnabled = true;
        ribs2.inputEnabled = true;
        butterfly.inputEnabled = true;
        butterfly2.inputEnabled = true;
        pencil.inputEnabled = true;
        pencil2.inputEnabled = true;
        bread.inputEnabled = true;
        bread2.inputEnabled = true;
        horse.inputEnabled = true;
        horse2.inputEnabled = true;
        
        // Adding a listener to each image
        heart.events.onInputDown.add(listener, this);
        heart2.events.onInputDown.add(listener, this);
        bone.events.onInputDown.add(listener, this);
        bone2.events.onInputDown.add(listener, this);
        apple.events.onInputDown.add(listener, this);
        apple2.events.onInputDown.add(listener, this);
        icecream.events.onInputDown.add(listener, this);
        icecream2.events.onInputDown.add(listener, this);
        wishbone.events.onInputDown.add(listener, this);
        wishbone2.events.onInputDown.add(listener, this);
        ribs.events.onInputDown.add(listener, this);
        ribs2.events.onInputDown.add(listener, this);
        butterfly.events.onInputDown.add(listener, this);
        butterfly2.events.onInputDown.add(listener, this);
        pencil.events.onInputDown.add(listener, this);
        pencil2.events.onInputDown.add(listener, this);
        bread.events.onInputDown.add(listener, this);
        bread2.events.onInputDown.add(listener, this);
        horse.events.onInputDown.add(listener, this);
        horse2.events.onInputDown.add(listener, this);

        livesString = 'Attempts : ';
        livesText = game.add.text(width-150, 175, livesString + lives, { font: '25px Arial', fill: '#000' });

        stateText = game.add.text(200,125,' ', { font: '30px Arial', fill: '#000' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    }

    function listener() {
        if(gameEnded === false){
            // Setting the mouse x and y position
            var clickX = game.input.mousePointer.x;
            var clickY = game.input.mousePointer.y;
            cardsClicked++;
            if(cardsClicked === 1){
                firstPicked = true;
                secondPicked = false
            }
            if(cardsClicked === 2){
                firstPicked = false;
                secondPicked = true;
            }
            checkCard(clickX, clickY);
            if(cardsClicked === 2){
                firstPicked = false;
                cardsClicked = 0;
                checkMatch();
            }
        }
    }

    function checkCard(clickX, clickY) {
        var count;
        // Loop to see which card was clicked
        for(count = 0; count < xLocation.length; count++){
            if(xLocation[count] <= clickX && clickX <= xLocation[count]+imageWidth && yLocation[count] <= clickY && clickY <= yLocation[count]+imageHeight){
                checker = count;
                if(firstPicked && checker%2===1){
                    cardsClicked = 0;
                    firstPicked = false;
                }else if(secondPicked && checker%2===0){
                    cardsClicked = 1;
                    secondPicked = false;
                }else{
                    flipCard(checker);
                }
                break;
            }
        }
    }

    function checkMatch(){
        // function to see if a match was found when two cards were clicked
        var i;

        //NEED TO DEAL WITH THIS IF STATEMENT because ^^^^ this is checking when the cards used to be next to each other in the array, now they are seperated due to the randomness
        if(clicked[totalClick[1]] === 1 && clicked[temp2-1] === 1){
            correct.play();
            // Order of card name in array
            // HEART, FUNNY BONE, ADAMS APPLE, BRAIN FREEZE, WISH BONE, SPARE RIBS, BUTTERFLIES, WRITERS CRAMP, BREAD BASKET, CHARLIE HORSE//matchFound();
            if(clicked[0] === 1 && clicked[totalClick[1]] === 1){
                heart.inputEnabled = false;
                heart2.inputEnabled = false;
            }else if(clicked[2] === 1 && clicked[totalClick[1]] === 1){
                bone.inputEnabled = false;
                bone2.inputEnabled = false;
            }else if(clicked[4] === 1 && clicked[totalClick[1]] === 1){
                apple.inputEnabled = false;
                apple2.inputEnabled = false;
            }else if(clicked[6] === 1 && clicked[totalClick[1]] === 1){;
                icecream.inputEnabled = false;
                icecream2.inputEnabled = false;
            }else if(clicked[8] === 1 && clicked[totalClick[1]] === 1){
                wishbone.inputEnabled = false;
                wishbone2.inputEnabled = false;
            }else if(clicked[10] === 1 && clicked[totalClick[1]] === 1){
                ribs.inputEnabled = false;
                ribs2.inputEnabled = false;
            }else if(clicked[12] === 1 && clicked[totalClick[1]] === 1){
                butterfly.inputEnabled = false;
                butterfly2.inputEnabled = false;
            }else if(clicked[14] === 1 && clicked[totalClick[1]] === 1){
                pencil.inputEnabled = false;
                pencil2.inputEnabled = false;
            }else if(clicked[16] === 1 && clicked[totalClick[1]] === 1){
                bread.inputEnabled = false;
                bread2.inputEnabled = false;
            }else if(clicked[18] === 1 && clicked[totalClick[1]] === 1){
                horse.inputEnabled = false;
                horse2.inputEnabled = false;
            }
            nose = game.add.sprite(190, 110, 'greennose');
            matched++;
            if(matched === 10){
                gameEnded = true;
                stateText.text = "The surgery was a success!!\n           Refresh to try again"
                stateText.visible = true;
                //game.input.onTap.addOnce(restart,this);
            }
        }else{
            wrong.play();
            nose = game.add.sprite(190, 110, 'rednose');
            lives--;
            livesText.text = livesString + lives;
            // believe these are okay, dont need to edit these four lines
            clicked[totalClick[0]] = 0;
            clicked[totalClick[1]] = 0;
            game.add.sprite(xLocation[totalClick[0]], yLocation[totalClick[0]], 'cardBack');
            game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'cardBack');
            if(totalClick[1] === xRandom[1]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'heart');
            }else if(totalClick[1] === xRandom[3]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'bone');
            }else if(totalClick[1] === xRandom[5]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'apple');
            }else if(totalClick[1] === xRandom[7]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'icecream');
            }else if(totalClick[1] === xRandom[9]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'wishbone');
            }else if(totalClick[1] === xRandom[11]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'ribs');
            }else if(totalClick[1] === xRandom[13]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'butterfly');
            }else if(totalClick[1] === xRandom[15]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'pencil');
            }else if(totalClick[1] === xRandom[17]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'bread');
            }else if(totalClick[1] === xRandom[19]){
                tempPic = game.add.sprite(xLocation[totalClick[1]], yLocation[totalClick[1]], 'horse');
            }
        }
        game.time.events.add(Phaser.Timer.SECOND * 1, fadePicture, this);
        if(lives === 0){
            gameEnded = true;
            stateText.text = "The surgery was unsuccessful!\n           Refresh to try again"
            stateText.visible = true;
            //game.input.onTap.addOnce(restart,this);
        }
    }

    function flipCard(checker1) {
        // Change the card from the back of the card to the face of the card.
        if(checker1 === 0){
            heart = game.add.sprite(xLocation[checker1], yLocation[checker1], 'heart');
        }else if(checker1 === xRandom[1]){
            temp2 = 1;
            heart2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'heart');
        }else if(checker1 === 2){
            bone = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bone');
        }else if(checker1 === xRandom[3]){
            temp2 = 3;
            bone2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bone');
        }else if(checker1 === 4){
            apple = game.add.sprite(xLocation[checker1], yLocation[checker1], 'apple');
        }else if(checker1 === xRandom[5]){
            temp2 = 5;
            apple2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'apple');
        }else if(checker1 === 6){
            icecream = game.add.sprite(xLocation[checker1], yLocation[checker1], 'icecream');
        }else if(checker1 === xRandom[7]){
            temp2 = 7;
            icecream2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'icecream');
        }else if(checker1 === 8){
            wishbone = game.add.sprite(xLocation[checker1], yLocation[checker1], 'wishbone');
        }else if(checker1 === xRandom[9]){
            temp2 = 9;
            wishbone2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'wishbone');
        }else if(checker1 === 10){
            ribs = game.add.sprite(xLocation[checker1], yLocation[checker1], 'ribs');
        }else if(checker1 === xRandom[11]){
            temp2 = 11;
            ribs2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'ribs');
        }else if(checker1 === 12){
            butterfly = game.add.sprite(xLocation[checker1], yLocation[checker1], 'butterfly');
        }else if(checker1 === xRandom[13]){
            temp2 = 13;
            butterfly2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'butterfly');
        }else if(checker1 === 14){
            pencil = game.add.sprite(xLocation[checker1], yLocation[checker1], 'pencil');
        }else if(checker1 === xRandom[15]){
            temp2 = 15;
            pencil2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'pencil');
        }else if(checker1 === 16){
            bread = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bread');
        }else if(checker1 === xRandom[17]){
            temp2 = 17;
            bread2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bread');
        }else if(checker1 === 18){
            horse = game.add.sprite(xLocation[checker1], yLocation[checker1], 'horse');
        }else if(checker1 === xRandom[19]){
            temp2 = 19;
            horse2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'horse');
        }
        clicked[checker1] = 1;
        if(cardsClicked === 1){
            totalClick[0] = checker1;
        }
        if(cardsClicked === 2){
            totalClick[1] = checker1;
        }
    }

    function fadePicture() {
        game.add.tween(nose).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
        game.add.tween(tempPic).to( { alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
    }

    function update() {

    }

    function render() {
        //game.debug.text('x-pos: ' + game.input.mousePointer.x, 32, 32);
    }
};



