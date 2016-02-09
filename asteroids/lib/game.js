var Asteroid = require('./asteroid');
var Ship = require('./ship');
function Game() {
  this.DIM_X = 500;
  this.DIM_Y = 500;
  this.NUM_ASTEROIDS = 10;
  this.addAsteroids();
  this.ship = new Ship({pos: this.randomPosition},this);
}

Game.prototype.allObjects = function() {
  return this.asteroids.concat([this.ship]);
};


Game.prototype.randomPosition = function() {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.addAsteroids = function() {
  this.asteroids = [];
  var that = this;
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: that.randomPosition()}, that));
  }
};

Game.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  for (var i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].draw(ctx);
  }
};

Game.prototype.move = function () {
  for (var i = 0; i < this.allObjects().length; i++) {
    this.allObjects()[i].move();
  }
};

Game.prototype.wrap = function(pos) {
  if(pos[0] >= this.DIM_X) {
    return [0, this.DIM_Y - pos[1]];
  } else if(pos[1] >= this.DIM_Y) {
    return [this.DIM_X - pos[0],0];
  } else {
    return pos;
  }
};

Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.allObjects().length; i++) {
    for (var j = i + 1; j < this.allObjects().length; j++) {
      if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])){
        this.allObjects()[i].collideWith(this.allObjects()[j]);
      }
    }
  }
};

Game.prototype.step = function(){
  this.move();
  this.checkCollisions();
};

Game.prototype.remove = function(asteroid) {
  var index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index,1);
};


module.exports = Game;
