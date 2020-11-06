"use strict"

function ClockViewCANVAS() {
    var self = this;
    var citygmt = null;
    var myModel = null;
    var myField = null;
    var hou;
    var min;
    var sec;

    self.start=function(model,field) {
        myModel=model;
        myField=field;
        // ищем и запоминаем интересные нам элементы DOM
        self.citygmt=myField.querySelector('#citygmt');
        self.clock=myField.querySelector('#viewCANVAS');

        self.diamBase = 200; //диаметр диска часов
        self.diamNum = 20; //диаметр кругов вокруг цифр
        self.angle = (30 / 180) * Math.PI; //градусов в одном часу
        self.secNminAngle = 360 / 60; //градусов в одном шаге секундной и минутной стреллки
        self.hAngle = 360 / 12; // градусов в одном шаге часовой стреллки
        self.textHight = 13 // высота текста на циферблате

        var canvasClock=self.clock.querySelector('#CLEAR');
        self.contextClock=canvasClock.getContext('2d');
        canvasClock.setAttribute("width", self.diamBase);
        canvasClock.setAttribute("height", self.diamBase);
    }

    self.update=function() {
        self.hou = myModel.currentTime.getUTCHours() + myModel.gmt;
        self.min = myModel.currentTime.getMinutes();
        self.sec = myModel.currentTime.getSeconds();
        self.citygmt.innerHTML = myModel.cityAndGmtStr;

        self.contextClock.beginPath();
        self.contextClock.arc(self.diamBase/2,self.diamBase/2,self.diamBase/2-0.5,0,Math.PI*2,true);
        self.contextClock.fillStyle='yellow';
        self.contextClock.fill();
        //создаём цифры на часах
        var numCircle = [];
        var txtCircle = [];
        for (var i = 1; i <= 12; i++) {
            var numCenterX =
            self.diamBase / 2 + (self.diamBase / 2 - self.diamNum) * Math.sin(i * self.angle);
            var numCenterY =
            self.diamBase / 2 - (self.diamBase / 2 - self.diamNum) * Math.cos(i * self.angle);
            self.contextClock.beginPath();
            self.contextClock.arc(numCenterX,numCenterY,self.diamNum/2,0,Math.PI*2,true);
            self.contextClock.fillStyle='green';
            self.contextClock.fill();
            self.contextClock.fillStyle='black';
            self.contextClock.font = `${self.textHight}px Verdana`;
            self.contextClock.textAlign = "center";
            self.contextClock.fillText(i, numCenterX, numCenterY + self.textHight/3);
        }

        //секундная стрелка
        var a1 = self.secNminAngle * self.sec/180*Math.PI;
        self.contextClock.beginPath();
        self.contextClock.lineWidth = 2;
        self.contextClock.moveTo(self.diamBase/2, self.diamBase/2);
        self.contextClock.lineTo(Math.round(self.diamBase/2 + (self.diamBase/3)*Math.sin(a1)), Math.round(self.diamBase/2 - (self.diamBase/3)*Math.cos(a1)));
        self.contextClock.stroke();
        //минутная стрелка
        var a2 = self.secNminAngle * self.min/180*Math.PI;
        self.contextClock.beginPath();
        self.contextClock.lineWidth = 4;
        self.contextClock.lineCap = "round";
        self.contextClock.moveTo(self.diamBase/2, self.diamBase/2);
        self.contextClock.lineTo(Math.round(self.diamBase/2 + (self.diamBase/3.5)*Math.sin(a2)), Math.round(self.diamBase/2 - (self.diamBase/3.5)*Math.cos(a2)));
        self.contextClock.stroke();
        //часовая стрелка
        var a3 = self.hAngle * self.hou/180*Math.PI + self.hAngle*a2/360;
        self.contextClock.beginPath();
        self.contextClock.lineWidth = 8;
        self.contextClock.lineCap = "round";
        self.contextClock.moveTo(self.diamBase/2, self.diamBase/2);
        self.contextClock.lineTo(Math.round(self.diamBase/2 + (self.diamBase/4)*Math.sin(a3)), Math.round(self.diamBase/2 - (self.diamBase/4)*Math.cos(a3)));
        self.contextClock.stroke();
    }
}