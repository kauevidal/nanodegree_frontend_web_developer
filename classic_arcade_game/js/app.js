//Represents a game character
var Character = function(x, y, sprite) {

    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

// Draw a character on the screen, required method for game
Character.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83);
};

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    Character.call(this, x, y, 'images/enemy-bug.png');

    this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x >= 4) {

        this.x = 0;
    }

    this.x += this.speed * dt;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    Character.call(this, 4, 5, 'images/char-boy.png');
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

//Verify if player won the game, arriving at water
Player.prototype.update = function() {

    if (this.y === 0) {

        console.log("WON");
        this.reset();
    }
};

// Validates the X movement and if is valid move update player.x value
Player.prototype.makeXMoviment = function(newPosX) {

    if ((newPosX >= 0) && (newPosX <= 4)) {
        this.x = newPosX;
    } else {
        console.log("Invalid X movement")
    }
};

// Validates the X movement and if is valid move update player.y value
Player.prototype.makeYMoviment = function(newPosY) {

    if ((newPosY >= 0) && (newPosY <= 5)) {
        this.y = newPosY;
    } else {
        console.log("Invalid Y movement");
    }
};

//Move the player to the original position
Player.prototype.reset = function() {

    this.x = 4;
    this.y = 5;
};

//Handle input user key
Player.prototype.handleInput = function(key) {

    switch (key) {
        case "up":
            this.makeYMoviment(this.y - 1);
            break;
        case "right":
            this.makeXMoviment(this.x + 1);
            break;
        case "left":
            this.makeXMoviment(this.x - 1);
            break;
        case "down":
            this.makeYMoviment(this.y + 1);
            break;
        default:
            console.log("Invalid key");
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = new Array(new Enemy(0, 1, 1.5), new Enemy(1, 3, 0.5), new Enemy(0, 2, 1));

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});