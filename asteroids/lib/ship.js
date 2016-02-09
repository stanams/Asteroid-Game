var MovingObject = require('./movingObject');
var Util = require('./utils');
Util.inherits(Ship, MovingObject);

function Ship(params, game){
    params.color = "000000";
    params.radius = 10;
    params.vel = [0,0];
    params.pos = game.randomPosition();
    MovingObject.call(this, params, game);
}





module.exports = Ship;
