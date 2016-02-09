/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	GameView = __webpack_require__(5);
	Asteroid = __webpack_require__(2);
	Game = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(2);
	var Ship = __webpack_require__(6);
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* globals MovingObject Asteroids */
	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	Util.inherits(Asteroid, MovingObject)

	function Asteroid(params, game){
	    params.color = "A0596E";
	    params.radius = 30;
	    params.vel = Util.randomVec(5);
	    MovingObject.call(this, params, game);
	 }

	module.exports = Asteroid;


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* globals Asteroids */

	var Util = {};

	Util.inherits = function(SubClass, SuperClass) {
	  function Surrogate (){}
	  Surrogate.prototype = SuperClass.prototype;
	  SubClass.prototype = new Surrogate();
	  SubClass.prototype.constructor = SubClass;
	};

	Util.randomVec = function(length) {
	  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
	  return [Math.random() * length * plusOrMinus,
	    Math.random() * length * plusOrMinus];
	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

	function GameView(game,ctx) {
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function() {
	  var that = this;
	  setInterval(function() {this.game.step(); this.game.draw(ctx);}.bind(that), 20);
	};

	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	Util.inherits(Ship, MovingObject);

	function Ship(params, game){
	    params.color = "000000";
	    params.radius = 10;
	    params.vel = [0,0];
	    params.pos = game.randomPosition();
	    MovingObject.call(this, params, game);
	}





	module.exports = Ship;


/***/ }
/******/ ]);