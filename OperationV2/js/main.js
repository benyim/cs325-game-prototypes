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
    var height = 700;

    var imageWidth = 50;
    var imageHeight = 50;

    //sounds
    var music;
    var correct;
    var wrong;

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

        game.load.audio('correct', 'assets/audio/gmae.wav');
        game.load.audio('wrong', 'assets/audio/meow2.mp3');
        game.load.audio('correct', 'assets/audio/Wii Shop Channel Music.mp3');
    }

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

    //background image
    var operation;


    function create() {

        operation = game.add.sprite(0, 0, 'operationBoard');
        operation.width = width;
        operation.height = height-100;

        //Sounds
        correct = game.add.audio('correct');
        music = game.add.audio('music');
        wrong = game.add.audio('wrong');
        music.play();

        // Setting the images
        heart = game.add.sprite(xLocation[0], yLocation[0], 'cardBack');
        heart2 = game.add.sprite(xLocation[1], yLocation[1], 'cardBack');
        bone = game.add.sprite(xLocation[2], yLocation[2], 'cardBack');
        bone2 = game.add.sprite(xLocation[3], yLocation[3], 'cardBack');
        apple = game.add.sprite(xLocation[4], yLocation[4], 'cardBack');
        apple2 = game.add.sprite(xLocation[5], yLocation[5], 'cardBack');
        icecream = game.add.sprite(xLocation[6], yLocation[6], 'cardBack');
        icecream2 = game.add.sprite(xLocation[7], yLocation[7], 'cardBack');
        wishbone = game.add.sprite(xLocation[8], yLocation[8], 'cardBack');
        wishbone2 = game.add.sprite(xLocation[9], yLocation[9], 'cardBack');
        ribs = game.add.sprite(xLocation[10], yLocation[10], 'cardBack');
        ribs2 = game.add.sprite(xLocation[11], yLocation[11], 'cardBack');
        butterfly = game.add.sprite(xLocation[12], yLocation[12], 'cardBack');
        butterfly2 = game.add.sprite(xLocation[13], yLocation[13], 'cardBack');
        pencil = game.add.sprite(xLocation[14], yLocation[14], 'cardBack');
        pencil2 = game.add.sprite(xLocation[15], yLocation[15], 'cardBack');
        bread = game.add.sprite(xLocation[16], yLocation[16], 'cardBack');
        bread2 = game.add.sprite(xLocation[17], yLocation[17], 'cardBack');
        horse = game.add.sprite(xLocation[18], yLocation[18], 'cardBack');
        horse2 = game.add.sprite(xLocation[19], yLocation[19], 'cardBack');
        
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
    }

    function listener() {
        // Setting the mouse x and y position
        var clickX = game.input.mousePointer.x;
        var clickY = game.input.mousePointer.y;
        cardsClicked++;
        checkCard(clickX, clickY);
        if(cardsClicked === 2){
            cardsClicked = 0;
            checkMatch();
        }
    }

    function checkCard(clickX, clickY) {
        var count;
        // Loop to see which card was clicked
        for(count = 0; count < xLocation.length; count++){
            if(xLocation[count] <= clickX && clickX <= xLocation[count]+imageWidth && yLocation[count] <= clickY && clickY <= yLocation[count]+imageHeight){
                checker = count;
                flipCard(checker);
                break;
            }
        }
    }

    function checkMatch(){
        // function to see if a match was found when two cards were clicked
        var i;
        for(i = 0; i < clicked.length; i+=2){
            // If a match is found
            if(clicked[i] === 1 && clicked[i+1] === 1){
                // Order of card name in array
                // HEART, FUNNY BONE, ADAMS APPLE, BRAIN FREEZE, WISH BONE, SPARE RIBS, BUTTERFLIES, WRITERS CRAMP, BREAD BASKET, CHARLIE HORSE//matchFound();
                if(i === 0){
                    heart.inputEnabled = false;
                    heart2.inputEnabled = false;
                }else if(i === 2){
                    bone.inputEnabled = false;
                    bone2.inputEnabled = false;
                }else if(i === 4){
                    apple.inputEnabled = false;
                    apple2.inputEnabled = false;
                }else if(i === 6){
                    icecream.inputEnabled = false;
                    icecream2.inputEnabled = false;
                }else if(i === 8){
                    wishbone.inputEnabled = false;
                    wishbone2.inputEnabled = false;
                }else if(i === 10){
                    ribs.inputEnabled = false;
                    ribs2.inputEnabled = false;
                }else if(i === 12){
                    butterfly.inputEnabled = false;
                    butterfly2.inputEnabled = false;
                }else if(i === 14){
                    pencil.inputEnabled = false;
                    pencil2.inputEnabled = false;
                }else if(i === 16){
                    bread.inputEnabled = false;
                    bread2.inputEnabled = false;
                }else if(i === 18){
                    horse.inputEnabled = false;
                    horse2.inputEnabled = false;
                }
            }else{
                // Set the cards back to the cardBack image
                clicked[i] = 0;
                clicked[i+1] = 0;
                game.add.sprite(xLocation[i], yLocation[i], 'cardBack');
                game.add.sprite(xLocation[i+1], yLocation[i+1], 'cardBack');
            }
        }
    }

    function flipCard(checker1) {
        // Change the card from the back of the card to the face of the card.
        if(checker1 === 0){
            heart = game.add.sprite(xLocation[checker1], yLocation[checker1], 'heart');
        }else if(checker1 === 1){
            heart2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'heart');
        }else if(checker1 === 2){
            bone = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bone');
        }else if(checker1 === 3){
            bone2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bone');
        }else if(checker1 === 4){
            apple = game.add.sprite(xLocation[checker1], yLocation[checker1], 'apple');
        }else if(checker1 === 5){
            apple2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'apple');
        }else if(checker1 === 6){
            icecream = game.add.sprite(xLocation[checker1], yLocation[checker1], 'icecream');
        }else if(checker1 === 7){
            icecream2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'icecream');
        }else if(checker1 === 8){
            wishbone = game.add.sprite(xLocation[checker1], yLocation[checker1], 'wishbone');
        }else if(checker1 === 9){
            wishbone2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'wishbone');
        }else if(checker1 === 10){
            ribs = game.add.sprite(xLocation[checker1], yLocation[checker1], 'ribs');
        }else if(checker1 === 11){
            ribs2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'ribs');
        }else if(checker1 === 12){
            butterfly = game.add.sprite(xLocation[checker1], yLocation[checker1], 'butterfly');
        }else if(checker1 === 13){
            butterfly2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'butterfly');
        }else if(checker1 === 14){
            pencil = game.add.sprite(xLocation[checker1], yLocation[checker1], 'pencil');
        }else if(checker1 === 15){
            pencil2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'pencil');
        }else if(checker1 === 16){
            bread = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bread');
        }else if(checker1 === 17){
            bread2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'bread');
        }else if(checker1 === 18){
            horse = game.add.sprite(xLocation[checker1], yLocation[checker1], 'horse');
        }else if(checker1 === 19){
            horse2 = game.add.sprite(xLocation[checker1], yLocation[checker1], 'horse');
        }
        clicked[checker1] = 1;
    }

    function update() {

    }

    function render() {
        //game.debug.text('x-pos: ' + game.input.mousePointer.x, 32, 32);
    }
};
