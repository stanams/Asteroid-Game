function sum() {
  var finalSum = 0;
  for(var i = 0; i < arguments.length; i++) {
    finalSum += arguments[i];
  }
  return finalSum;
}





Function.prototype.myBind = function(context) {
  var that = this;
  var args = [];
    console.log(arguments);
  for(var i = 1; i < arguments.length; i++){
    args.push(arguments[i]);
  }

  return function() {
    for(var j = 0; j < arguments.length; j++) {
      args.push(arguments[j]);
    }
    return that.apply(context,args);
  };
};



function curriedSum(numArgs) {
  var numbers = [];
  var that = this;
  // console.log(that);
  return function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return sum.apply(this, numbers);
    } else {
      return _curriedSum;
    }
  };
}
