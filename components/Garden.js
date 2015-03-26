var noflo = require('noflo');

exports.getComponent = function () {
  var c = new noflo.Component();

  var tempData = [];
  var totalData = 3;
  
  var totalElements = function(arr) {
    var total = 0;
    for (i=arr.length - 1; i >= 0 ; i--) {
      total += (typeof arr[i] !== "undefined")? 1 : 0;
    }
    return total;
  };
  
  var addAndProcessValue = function (i, val) {
    window.console.log("garden.addAndProcessValue", i, val);
    //
    tempData[i] = val;
    if (totalElements(tempData) == 3) {
      // process
     var sum = tempData[0] + tempData[1];
     var result = 0;
     if (tempData[2] !== 0) {
     	result = sum / tempData[2];
     }
      
      c.outPorts.out.send(result);
      window.console.log("***********************************************");
      window.console.log("RESULT=", result);
      window.console.log("***********************************************");
    }
  };
  c.inPorts.add('in1', function (event, payload) {
    window.console.log("garden.in1", payload);
    if (event !== 'data') {
      return;
    }
    addAndProcessValue(0, payload);
    // Do something with the packet, then
    // c.outPorts.out.send(payload);
  });
  c.inPorts.add('in2', function (event, payload) {
    window.console.log("garden.in2", payload);
    if (event !== 'data') {
      return;
    }
    addAndProcessValue(1, payload);
    // Do something with the packet, then
    // c.outPorts.out.send(payload);
  });
  c.inPorts.add('c4', function (event, payload) {
    window.console.log("garden.c4", payload);
    if (event !== 'data') {
      return;
    }
    addAndProcessValue(2, payload);
    
    // Do something with the packet, then
    // c.outPorts.out.send(payload);
  });
  c.outPorts.add('out');
  return c;
};