"use strict"

function ClockControllerButtons() {
    var self = this;
    var myModel = null; 
    var myField = null;

    self.start=function(model,field) {
        myModel=model;
        myField=field;

        var start=myField.querySelector('#start');
        start.addEventListener('click',self.startF);
        var stop=myField.querySelector('#stop');
        stop.addEventListener('click',self.stopF);
        myModel.startClock();
    }

    self.startF=function() {
        myModel.startClock();
    }

    self.stopF=function() {
        myModel.stopClock();
    }
}