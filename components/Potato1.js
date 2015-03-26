var noflo = require('noflo');

exports.getComponent = function () {
  var c = new noflo.Component();
  var tempInputs =[];
  var sendRule = {
    "totalInputs": 3
  };
  var sumArrayValues = function(previousValue, currentValue, index, array) {
    return previousValue + currentValue;
  };
  
  var funcInterpolate = function (text) {
    // do some actions
    // ...
    window.console.log("p2.funcInterpolate", text);
    var Xs = JSON.parse(tempInputs[0]);
    var Ys = JSON.parse(tempInputs[1]);
    var Cs = JSON.parse(tempInputs[2]);
    window.console.log("p1.Inputs",Xs,Ys,Cs);
    var sumX = Xs.reduce(sumArrayValues);
    var sumY = Xs.reduce(sumArrayValues);
    var sumC = Xs.reduce(sumArrayValues);
    var result = sumX+sumY-sumC;
    // send data 
    c.outPorts.out.send(result);
  };
  
  var addAndProcessValue = function(i, val) {
    //
    window.console.log("p2.addAndProcessValue", i, val);
    tempInputs[i] = val;
    if (totalElements(tempInputs) == 3) {
      // execute interpolate 
   	  funcInterpolate('potato1.res');  
    }
  };
  
  var totalElements = function(arr) {
    var total = 0;
    for (i=arr.length - 1; i >= 0 ; i--) {
      total += (typeof arr[i] !== "undefined")? 1 : 0;
    }
    return total;
  };
  
  c.inPorts.add('in1', function (event, payload) {
    if (event !== 'data') {
      // window.console.log("p1.event", event);
      return;
    }
    window.console.log("p2.in1", payload);
    addAndProcessValue(0, payload);
    
    // Do something with the packet, then
    // c.outPorts.out.send(payload);
  });
  c.inPorts.add('in2', function (event, payload) {
    if (event !== 'data') {
      return;
    }
    window.console.log("p2.in2", payload);
    addAndProcessValue(1, payload);
    
    // Do something with the packet, then
    // c.outPorts.out.send(payload);
    // test
  });
  c.inPorts.add('in3', function (event, payload) {
    if (event !== 'data') {
      return;
    }
    window.console.log("p2.in3", payload);
    addAndProcessValue(2, payload);
    
    // Do something with the packet, then
    c.outPorts.in3.send(payload);
  });
  c.outPorts.add('in3');
  c.outPorts.add('out');
  return c;
};