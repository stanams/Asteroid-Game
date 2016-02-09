// function MovingObject(pos, vel, radius, color){
//   this.pos = pos;
//   this.vel = vel;
//   this.radius = radius;
//   this.color = color;
// }
function MovingObject(params, game){
  this.params = params;
  this.game = game;
}

var twoPi = Math.PI * 2;

MovingObject.prototype.draw = function(ctx) {
  ctx.fillStyle = this.params.color;
  ctx.beginPath();
    ctx.arc(
      this.params.pos[0],
      this.params.pos[1],
      this.params.radius,
      0,
      twoPi,
      false
    );

    ctx.fill();
};

MovingObject.prototype.move = function() {
  this.params.pos[0] += this.params.vel[0];
  this.params.pos[1] += this.params.vel[1];
  var that = this;
  this.params.pos = this.game.wrap(that.params.pos);
};

MovingObject.prototype.distance = function (otherObj){
  var xDiff = this.params.pos[0] - otherObj.params.pos[0];
  var yDiff = this.params.pos[1] - otherObj.params.pos[1];
  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
  // ([x_1, y_1], [x_2, y_2]) = sqrt((x_1 - x_2) ** 2 + (y_1 - y_2) ** 2)
};


MovingObject.prototype.isCollidedWith = function (otherObject){
  if (this.distance(otherObject) < this.params.radius + otherObject.params.radius ) {
    return true;
  } else {
    return false;
  }
};

MovingObject.prototype.collideWith = function (otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
};

module.exports = MovingObject;
