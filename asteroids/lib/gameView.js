var Game = require('./game');

function GameView(game,ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  var that = this;
  setInterval(function() {this.game.step(); this.game.draw(ctx);}.bind(that), 20);
};

module.exports = GameView;
