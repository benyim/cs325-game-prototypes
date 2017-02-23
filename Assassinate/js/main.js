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
    // different sprite for each direction of enemy and player
    // possible end game and restart

    "use strict";
    var width = 600;
    var height = 600;
    var imageWidth = 50;
    var imageHeight = 50;
    var playerWidth = 50;
    var playerHeight = 50;
    
    // Player
    var player;
    var playerXCenter;
    var playerYCenter;

    // Player controls
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    var attack;
    var invisible;
    var invisibility = 0; // boolean for if the player is invisible or not
    var icon;
    var iconX;
    var iconY;
    // 1 for up, 2 for down, 3 for left, 4 for right
    var direction = 4; // set it based on image sprite direction
    // coordinates of the current players X and Y
    var currentPlayerX;
    var currentPlayerY;
    var playerKilled = false;
    var gameOver = 0;
    
    // Enemies
    var enemy1;
    var enemy2;
    var enemy3;
    var enemy4;
    var enemy5;
    // arrays to hold the current x and y coordinates of each of the enemies
    var enemyX;
    var enemyY;

    var enemyDir = 1; // direction of the enemy to help deal with when it kills the player
    var enemies; // array to hold individual enemy objects
    var enemyKilled = [0,0,0,0,0];// array to see which enemies have been killed
    var enemyDead = 0;
    var enemyCount = 5; //number of enemies

    // arrays to hold the starting X and Y coordinates of the enemies
    var enemyPosX = [50, 250, 450, 150, 350];
    var enemyPosY = [150, 150, 150, 450, 450];

    // array to hold the furthest the enemy can move in the X and Y direction
    var movementX = [enemyPosX[0] + 100, enemyPosX[1] + 100, enemyPosX[2]+100, enemyPosX[3]+100, enemyPosX[4]+100];
    var movementY = [enemyPosY[0] + 100, enemyPosY[1] + 100, enemyPosY[2]+100, enemyPosY[3]+100, enemyPosY[4]+100];
    var counter = 0;
    
    //Text result for when game ends
    var stateText;

    // boolean variables to help with key presses
    var pressed;

    var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });
    
    function preload() {
        game.load.image('enemy', 'assets/slime.png');
        game.load.image('ninjaD', 'assets/ninjaD.png');
        game.load.image('icon', 'assets/invisIcon.png');
    }

    function create() {

        game.stage.backgroundColor = "#0a8906";

        // Setting the images
        player = game.add.sprite(50, 50, 'ninjaD');
        player.width = 50;
        player.height = 50;


        enemy1 = game.add.sprite(enemyPosX[0], enemyPosY[0], 'enemy');
        enemy2 = game.add.sprite(enemyPosX[1], enemyPosY[1], 'enemy');
        enemy3 = game.add.sprite(enemyPosX[2], enemyPosY[2], 'enemy');
        enemy4 = game.add.sprite(enemyPosX[3], enemyPosY[3], 'enemy');
        enemy5 = game.add.sprite(enemyPosX[4], enemyPosY[4], 'enemy');
        enemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

        upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attack = game.input.keyboard.addKey(Phaser.Keyboard.K);
        invisible = game.input.keyboard.addKey(Phaser.Keyboard.L)

        stateText = game.add.text(300,300,' ', { font: '50px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    }

    function update() {
        var enemySpeed = 1;
        var playerSpeed = 2;
        currentPlayerX = player.x;
        currentPlayerY = player.y;
        if (upKey.isDown){
            player.y-=playerSpeed;
            direction = 1;
        }else if (downKey.isDown){
            player.y+=playerSpeed;
            direction = 2;
        }
        if (leftKey.isDown){
            player.x-=playerSpeed;
            direction = 3;
        }else if (rightKey.isDown){
            player.x+=playerSpeed;
            direction = 4;
        }

        playerXCenter = player.x + playerWidth/2;
        playerYCenter = player.y + playerHeight/2;

        enemyX = [enemy1.x, enemy2.x, enemy3.x, enemy4.x, enemy5.x];
        enemyY = [enemy1.y, enemy2.y, enemy3.y, enemy4.y, enemy5.y];

        if(invisible.isDown){
            if(!pressed){
                if(invisibility == 0){
                    icon = game.add.sprite(width/2, 20, 'icon');
                    invisibility = 1;
                    game.stage.backgroundColor = "#000000";
                }else{
                    icon.destroy();
                    invisibility = 0;
                    game.stage.backgroundColor = "#0a8906";
                }
                pressed = true;
            }
        }

        if(invisible.isUp){
            pressed = false;
        }

        if(invisibility == 0){
            if(attack.isDown){
                // 1, 2, 3, 4
                // up, down, left, right
                for(var i = 0; i < enemyCount; i++){
                    if(direction == 1){
                        if(playerXCenter > enemyX[i] && playerXCenter < enemyX[i]+imageWidth && playerYCenter > enemyY[i]+imageHeight && playerYCenter < enemyY[i]+imageHeight+imageHeight/2){
                            enemies[i].destroy();
                            enemyKilled[i] = 1;
                            enemyDead++;
                        }
                    }else if(direction == 2){
                        if(playerXCenter > enemyX[i] && playerXCenter < enemyX[i]+imageWidth && playerYCenter < enemyY[i] && playerYCenter > enemyY[i]-imageHeight/2){
                            enemies[i].destroy();
                            enemyKilled[i] = 1;
                            enemyDead++;
                        }
                    }else if(direction == 3){
                        if(playerYCenter > enemyY[i] && playerYCenter < enemyY[i]+imageHeight && playerXCenter > enemyX[i]+imageWidth && playerXCenter < enemyX[i]+imageWidth+imageWidth/2){
                            enemies[i].destroy();
                            enemyKilled[i] = 1;
                            enemyDead++;
                        }
                    }else if(direction == 4){
                        if(playerYCenter > enemyY[i] && playerYCenter < enemyY[i]+imageHeight && playerXCenter < enemyX[i] && playerXCenter > enemyX[i]-imageWidth/2){
                            enemies[i].destroy();
                            enemyKilled[i] = 1;
                            enemyDead++;
                        }
                    }
                }
            }
        }

        var allDead = true;
        for(var x = 0; x < enemyCount; x++){
            if(enemyKilled[x] == 0){
                allDead = false;
                break;
            }
        }
        if(allDead){
            gameOver = 1;
            stateText.text = "You Won!\nClick to play again";
            stateText.visible = true;
        }


        //enemy movement
        if(enemyDir == 1){
            if(enemy1.x <= movementX[0]){
                enemy1.x += enemySpeed;
            }
            if(enemy2.x <= movementX[1]){
                enemy2.x += enemySpeed;
            }
            if(enemy3.x <= movementX[2]){
                enemy3.x += enemySpeed;
            }
            if(enemy4.x <= movementX[3]){
                enemy4.x += enemySpeed;
            }
            if(enemy5.x <= movementX[4]){
                enemy5.x += enemySpeed;
            }
            if(enemy1.x == movementX[0]){
                enemyDir++;
            }

            // loop to check for player hitbox near enemy, this will kill the player
            if(invisibility == 0){
                for(var i = 0; i < enemyCount; i++){
                    if(enemyKilled[i] == 0){
                        if(playerXCenter > enemyX[i] && playerXCenter < enemyX[i]+imageWidth+imageWidth/2 && playerYCenter < enemyY[i]+imageHeight && playerYCenter > enemyY[i]){
                            player.destroy();
                            stateText.text=" GAME OVER \n Click to restart";
                            stateText.visible = true;
                            gameOver = 1;
                        }
                    }
                }
            }
        }

        if(enemyDir == 2){
            if(enemy1.y <= movementY[0]){
                enemy1.y += enemySpeed;
            }
            if(enemy2.y <= movementY[1]){
                enemy2.y += enemySpeed;
            }
            if(enemy3.y <= movementY[2]){
                enemy3.y += enemySpeed;
            }
            if(enemy4.y <= movementY[3]){
                enemy4.y += enemySpeed;
            }
            if(enemy5.y <= movementY[4]){
                enemy5.y += enemySpeed;
            }
            if(enemy1.y == movementY[0]){
                enemyDir++;
            }

            if(invisibility == 0){
                for(var i = 0; i < enemyCount; i++){
                    if(enemyKilled[i] == 0){
                        if(playerYCenter > enemyY[i] && playerYCenter < enemyY[i]+imageHeight+imageHeight/2 && playerXCenter < enemyX[i]+imageWidth && playerXCenter > enemyX[i]){
                            player.destroy();
                            stateText.text=" GAME OVER \n Click to restart";
                            stateText.visible = true;
                            gameOver = 1;
                        }
                    }
                }
            }
        }

        if(enemyDir == 3){
            if(enemy1.x >= enemyPosX[0]){
                enemy1.x -= enemySpeed;
            }
            if(enemy2.x >= enemyPosX[1]){
                enemy2.x -= enemySpeed;
            }
            if(enemy3.x >= enemyPosX[2]){
                enemy3.x -= enemySpeed;
            }
            if(enemy4.x >= enemyPosX[3]){
                enemy4.x -= enemySpeed;
            }
            if(enemy5.x >= enemyPosX[4]){
                enemy5.x -= enemySpeed;
            }
            if(enemy1.x == enemyPosX[0]){
                enemyDir++;
            }

            if(invisibility == 0){
                for(var i = 0; i < enemyCount; i++){
                    if(enemyKilled[i] == 0){
                        if(playerXCenter < enemyX[i] && playerXCenter > enemyX[i]-imageWidth/2 && playerYCenter < enemyY[i]+imageHeight && playerYCenter > enemyY[i]){
                            player.destroy();
                            stateText.text=" GAME OVER \n Click to restart";
                            stateText.visible = true;
                            gameOver = 1;
                        }
                    }
                }
            }
        }

        if(enemyDir == 4){
            if(enemy1.y >= enemyPosY[0]){
                enemy1.y -= enemySpeed;
            }
            if(enemy2.y >= enemyPosY[1]){
                enemy2.y -= enemySpeed;
            }
            if(enemy3.y >= enemyPosY[2]){
                enemy3.y -= enemySpeed;
            }
            if(enemy4.y >= enemyPosY[3]){
                enemy4.y -= enemySpeed;
            }
            if(enemy5.y >= enemyPosY[4]){
                enemy5.y -= enemySpeed;
            }
            if(enemy1.y == enemyPosY[0]){
                enemyDir = 1;
            }

            if(invisibility == 0){
                for(var i = 0; i < enemyCount; i++){
                    if(enemyKilled[i] == 0){
                        if(playerYCenter < enemyY[i] && playerYCenter > enemyY[i]-imageHeight/2 && playerXCenter < enemyX[i]+imageWidth && playerXCenter > enemyX[i]){
                            player.destroy();
                            stateText.text=" GAME OVER \n Click to restart";
                            stateText.visible = true;
                            gameOver = 1;
                        }
                    }
                }
            }
        }

        if(gameOver){
            game.input.onTap.addOnce(restart,this);
        }
    }

    function restart () {
        for(var x = 0; x < enemyCount; x++){
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
        stateText.visible = false;
    }

    function render() {
        //game.debug.text('x-pos: ' + game.input.mousePointer.x, 32, 32);
    }
};
