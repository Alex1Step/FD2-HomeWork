"use strict"

function ClockViewDOM() {
    var self = this;
    var citygmt = null;
    var myModel = null;
    var myField = null;
    var hou;
    var min;
    var sec;
    var startA1;
    var startA2;
    var startA3;
    var hourArrow;
    var minuteArrow;
    var secondArrow;


    self.start=function(model,field) {
        myModel=model;
        myField=field;
        // ищем и запоминаем интересные нам элементы DOM
        self.citygmt=myField.querySelector('#citygmt');
        self.clock=myField.querySelector('#viewDOM');
        
        //ЧАСЫ
        var diamBase = 200; //диаметр диска часов
        var diamNum = 20; //диаметр кругов вокруг цифр
        var angle = (30 / 180) * Math.PI; //градусов в одном часу
        self.secNminAngle = 360 / 60; //градусов в одном шаге секундной и минутной стреллки
        self.hAngle = 360 / 12; // градусов в одном шаге часовой стреллки
        
        // var startTime = new Date();
        
        //создаём базу часов
        var baseClock = document.createElement("div");
        baseClock.style.position = "relative";
        baseClock.style.margin = "0px";
        baseClock.style.borderRadius = "50%";
        baseClock.style.width = diamBase + "px";
        baseClock.style.height = diamBase + "px";
        baseClock.style.background = "yellow";
        self.clock.appendChild(baseClock);
        
        //создаём цифры на часах
        var numArray = [];
        for (var i = 1; i <= 12; i++) {
          numArray[i] = document.createElement("div");
          numArray[i].style.position = "absolute";
          numArray[i].style.borderRadius = "50%";
          numArray[i].style.background = "#c2fc03";
          numArray[i].style.width = diamNum + "px";
          numArray[i].style.height = diamNum + "px";
          numArray[i].style.textAlign = "center";
          numArray[i].style.lineHeight = numArray[i].style.height;
          numArray[i].innerHTML = i;
          baseClock.appendChild(numArray[i]);
          var numCenterX =
            baseClock.offsetLeft +
            baseClock.offsetWidth / 2 +
            (diamBase / 2 - numArray[i].offsetWidth) * Math.sin(i * angle) -
            baseClock.getBoundingClientRect().left;
          var numCenterY =
            baseClock.offsetTop - myField.querySelector('#contr').offsetHeight +
            baseClock.offsetHeight / 2 -
            (diamBase / 2 - numArray[i].offsetHeight) * Math.cos(i * angle) -
            baseClock.getBoundingClientRect().top;
          numArray[i].style.left =
            Math.round(numCenterX - numArray[i].offsetWidth / 2) + "px";
          numArray[i].style.top =
            Math.round(numCenterY - numArray[i].offsetHeight / 2) + "px";
        }
        
        //создаём стрелки
        
        //минутная
        self.minuteArrow = document.createElement("div");
        self.minuteArrow.setAttribute("id", "min");
        self.minuteArrow.style.position = "absolute";
        self.minuteArrow.style.background = "black";
        self.minuteArrow.style.width = diamBase / 50 + "px"; //линейные размеры
        self.minuteArrow.style.height = diamBase / 2.7 + "px"; //линейные размеры
        self.minuteArrow.style.borderRadius = self.minuteArrow.style.height;
        baseClock.appendChild(self.minuteArrow);
        self.minuteArrow.style.left =
          baseClock.offsetLeft +
          baseClock.offsetWidth / 2 -
          baseClock.getBoundingClientRect().left -
          self.minuteArrow.offsetWidth / 2 +
          "px";
          self.minuteArrow.style.top =
          baseClock.offsetTop - myField.querySelector('#contr').offsetHeight +
          baseClock.offsetHeight / 2 -
          baseClock.getBoundingClientRect().top -
          self.minuteArrow.offsetHeight +
          "px";
        
        //часовая
        self.hourArrow = document.createElement("div");
        self.hourArrow.setAttribute("id", "hour");
        self.hourArrow.style.position = "absolute";
        self.hourArrow.style.background = "black";
        self.hourArrow.style.width = diamBase / 30 + "px"; //линейные размеры
        self.hourArrow.style.height = diamBase / 3.2 + "px"; //линейные размеры
        self.hourArrow.style.borderRadius = self.hourArrow.style.height;
        baseClock.appendChild(self.hourArrow);
        self.hourArrow.style.left =
          baseClock.offsetLeft +
          baseClock.offsetWidth / 2 -
          baseClock.getBoundingClientRect().left -
          self.hourArrow.offsetWidth / 2 +
          "px";
          self.hourArrow.style.top =
          baseClock.offsetTop - myField.querySelector('#contr').offsetHeight  +
          baseClock.offsetHeight / 2 -
          baseClock.getBoundingClientRect().top -
          self.hourArrow.offsetHeight +
          "px";
       
        //секундная
        self.secondArrow = document.createElement("div");
        self.secondArrow.setAttribute("id", "sec");
        self.secondArrow.style.position = "absolute";
        self.secondArrow.style.background = "black";
        self.secondArrow.style.width = diamBase / 70 + "px"; //линейные размеры
        self.secondArrow.style.height = diamBase / 2.3 + "px"; //линейные размеры
        self.secondArrow.style.borderRadius = self.secondArrow.style.height;
        baseClock.appendChild(self.secondArrow);
        self.secondArrow.style.left =
          baseClock.offsetLeft +
          baseClock.offsetWidth / 2 -
          baseClock.getBoundingClientRect().left -
          self.secondArrow.offsetWidth / 2 +
          "px";
          self.secondArrow.style.top =
          baseClock.offsetTop - myField.querySelector('#contr').offsetHeight  +
          baseClock.offsetHeight / 2 -
          baseClock.getBoundingClientRect().top -
          self.secondArrow.offsetHeight +
          "px";
    }

    self.update=function() {
        self.hou = myModel.currentTime.getUTCHours() + myModel.gmt;
        self.min = myModel.currentTime.getMinutes();
        self.sec = myModel.currentTime.getSeconds();
        self.citygmt.innerHTML = myModel.cityAndGmtStr;
        //ЧАСЫ
        self.startA2 = self.secNminAngle * myModel.currentTime.getMinutes();
        self.minuteArrow.style.transformOrigin =
        self.minuteArrow.offsetWidth / 2 + "px " + self.minuteArrow.offsetHeight + "px";
        self.minuteArrow.style.transform = "rotate(" + self.startA2 + "deg)";

        self.startA3 = self.hAngle * (myModel.currentTime.getUTCHours() + myModel.gmt) + self.hAngle * (self.startA2 / 360);
        self.hourArrow.style.transformOrigin =
        self.hourArrow.offsetWidth / 2 + "px " + self.hourArrow.offsetHeight + "px";
        self.hourArrow.style.transform = "rotate(" + self.startA3 + "deg)";

        self.startA1 = self.secNminAngle * myModel.currentTime.getSeconds();
        self.secondArrow.style.transformOrigin =
        self.secondArrow.offsetWidth / 2 + "px " + self.secondArrow.offsetHeight + "px";
        self.secondArrow.style.transform = "rotate(" + self.startA1 + "deg)";
    }
}