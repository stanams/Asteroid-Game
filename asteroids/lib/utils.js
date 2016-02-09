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
