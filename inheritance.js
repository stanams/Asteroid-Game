Function.prototype.inherits = function(SuperClass) {
  function Surrogate (){}
  Surrogate.prototype = SuperClass.prototype;
  var Subclass = this;
  Subclass.prototype = new Surrogate();
  Subclass.prototype.constructor = Subclass;
};
