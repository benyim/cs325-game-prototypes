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
    var width = 800;
    var height = 600;
    var enemyBullets;
    var enemyBullet
    var asteroidsHit = 0;
    var explosions;
    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update, render: render });

    function preload() {

        game.load.audio('boden', ['assets/bodenstaendig_2000_in_rock_4bit.mp3', 'assets/bodenstaendig_2000_in_rock_4bit.ogg']);

        game.load.image('player', 'assets/player.png');
        game.load.image('bullet', 'assets/bullet.png');
        game.load.image('enemyBullet', 'assets/asteroid2.png');
        game.load.spritesheet('kaboom', 'assets/explode.png', 128, 128);
        game.load.image('earth', 'assets/earth.png');
    }

    var sprite;
    var bullets;
    var asteroid;
    var stateText;
    var scoreString = '';
    var scoreText;
    var score = 0;
    var gameFinished = 0;

    var fireRate = 100;
    var nextFire = 0;
    var spawnCount = 0;

    var music;

    var xSpawn = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750];
    var ySpawn = [0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550];

    function create() {
        game.add.sprite(380,300, 'earth');
        music = game.add.audio('boden');
        music.play();
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //game.stage.backgroundColor = '#313131';

        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

        bullets.createMultiple(50, 'bullet');
        bullets.setAll('checkWorldBounds', true);
        bullets.setAll('outOfBoundsKill', true);
        
        sprite = game.add.sprite(400, 300, 'player');
        sprite.anchor.set(0.5, 0.5);

        game.physics.enable(sprite, Phaser.Physics.ARCADE);

        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(30, 'enemyBullet');
        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 1);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);

        explosions = game.add.group();
        explosions.createMultiple(30, 'kaboom');
        explosions.forEach(setupInvader, this);

        //  The score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

        //  Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    }

    function update() {
        spawnAsteroid();

        sprite.rotation = game.physics.arcade.angleToPointer(sprite);

        if (game.input.activePointer.isDown){
            fire();
        }

        game.physics.arcade.overlap(bullets, enemyBullets, collisionHandler, null, this);
        game.physics.arcade.overlap(enemyBullets, sprite, enemyHitsPlayer, null, this);
    }

    function enemyHitsPlayer (sprite,enemyBullet) {
        gameFinished = 1;
        enemyBullet.kill();

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(sprite.body.x, sprite.body.y);
        explosion.play('kaboom', 30, false, true);
        score = 0;

        gameFinished = 1;
        sprite.kill();
        enemyBullets.callAll('kill');

        stateText.text=" GAME OVER \n Click to restart";
        stateText.visible = true;

        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
    }

    function collisionHandler (bullet, enemyBullet) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        enemyBullet.kill();
        asteroidsHit++;

        //  Increase the score
        score += 20;
        scoreText.text = scoreString + score;

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(enemyBullet.body.x, enemyBullet.body.y);
        explosion.play('kaboom', 30, false, true);

        if (asteroidsHit === 35){
            gameFinished = 2;
            score += 1000;
            scoreText.text = scoreString + score;

            enemyBullets.callAll('kill');
            stateText.text = " You Won, \n Click to restart";
            stateText.visible = true;
            asteroidsHit = 0;

            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
        }
    }

    function spawnAsteroid() {
        var randX = Math.floor(Math.random() * 16);  
        var randY = Math.floor(Math.random() * 12);
        var spawnChance = Math.floor(Math.random() * 20);
        var choice = Math.floor(Math.random() * 4);
        enemyBullet = enemyBullets.getFirstExists(false);

        if(spawnChance === 0){
            if(spawnCount < 50 && gameFinished === 0){
                if(choice === 0)
                    //asteroid = game.add.sprite(xSpawn[randX], ySpawn[0], 'asteroid');
                    enemyBullet.reset(xSpawn[randX], ySpawn[0]-20);
                else if(choice === 1)
                    //asteroid = game.add.sprite(xSpawn[randX], ySpawn[11], 'asteroid');
                    enemyBullet.reset(xSpawn[randX], ySpawn[11]+20);
                else if(choice === 2)
                    //asteroid = game.add.sprite(xSpawn[0], ySpawn[randY], 'asteroid');
                    enemyBullet.reset(xSpawn[0]-20, ySpawn[randY]);
                else
                    //asteroid = game.add.sprite(xSpawn[15], ySpawn[randY], 'asteroid');
                    enemyBullet.reset(xSpawn[15]+20, ySpawn[randY]);
                spawnCount++;
            }
        }
        game.physics.arcade.moveToObject(enemyBullet,sprite,120);
    }

    function fire() {

        if (game.time.now > nextFire && bullets.countDead() > 0){
            nextFire = game.time.now + fireRate;
            var bullet = bullets.getFirstDead();
            bullet.reset(sprite.x - 6, sprite.y - 8);
            game.physics.arcade.moveToPointer(bullet, 300);
        }

    }

    function render() {
        //game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
        //game.debug.spriteInfo(sprite, 32, 450);
    }

    function restart () {

        //  A new level starts
        
        //resets the life count
        //lives.callAll('revive');
        //  And brings the aliens back from the dead :)
        //enemyBullets.removeAll();
        //createAliens();
        if(gameFinished === 1){
            score = 0;
        }
        scoreText.text = scoreString + score;

        gameFinished = 0;
        spawnCount = 0;
        //revives the player
        sprite.revive();
        //hides the text
        stateText.visible = false;
    }

    function setupInvader (invader) {
        invader.anchor.x = 0.5;
        invader.anchor.y = 0.5;
        invader.animations.add('kaboom');

    }

};
