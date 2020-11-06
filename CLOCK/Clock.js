"use strict"

function Clock(city) {
    var self = this;
    var currentTime = new Date();
    var cityAndGmtStr;
    var gmt;
    var myView = null;
    var timerId;
    switch(city) {
        case 'Нью-Йорк' : self.cityAndGmtStr = 'Нью-Йорк (GMT-5)'; self.gmt = -5; break;
        case 'Лондон' : self.cityAndGmtStr = 'Лондон (GMT)'; self.gmt = 0; break;
        case 'Берлин' : self.cityAndGmtStr = 'Берлин (GMT+1)'; self.gmt = 1; break;
        case 'Минск' : self.cityAndGmtStr = 'Минск (GMT+3)'; self.gmt = 3; break;
        case 'Токио' : self.cityAndGmtStr = 'Токио (GMT+9)'; self.gmt = 9; break;
        case 'Владивосток' : self.cityAndGmtStr = 'Владивосток (GMT+10)'; self.gmt = 10; break;
    }
    
    self.start=function(view) {
        myView=view;
        self.currentTime = new Date();
    }

    self.updateView=function() {
        if (myView)
            myView.update();
    };
    
    self.startClock = function () {
        if (!self.timerId){
        self.timerId = setInterval(function () {
            self.currentTime = new Date();
            self.updateView();
        }, 1000);
        }
    }

    self.stopClock = function () {
        clearInterval(self.timerId);
        self.timerId = null;
    }
}