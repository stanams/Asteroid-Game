/* globals MovingObject Asteroids */
var MovingObject = require('./movingObject');
var Util = require('./utils');
Util.inherits(Asteroid, MovingObject)

function Asteroid(params, game){
    params.color = "A0596E";
    params.radius = 30;
    params.vel = Util.randomVec(5);
    MovingObject.call(this, params, game);
 }

module.exports = Asteroid;
