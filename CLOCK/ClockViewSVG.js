"use strict"

function ClockViewSVG() {
    var self = this;
    var citygmt = null;
    var myModel = null;
    var myField = null;
    var secNminAngle;
    var hAngle;
    var a1;
    var a2;
    var a3;
    var diamBase
    var minArrow;
    var secArrow;
    var hArrow;
    var hou;
    var min;
    var sec;
    var SVGElem;

    self.start=function(model,field) {
        myModel=model;
        myField=field;
        // ищем и запоминаем интересные нам элементы DOM
        self.citygmt=myField.querySelector('#citygmt');
        self.clock=myField.querySelector('#viewSVG');

        self.diamBase = 200; //диаметр диска часов
        var diamNum = 20; //диаметр кругов вокруг цифр
        var angle = (30 / 180) * Math.PI; //градусов в одном часу
        self.secNminAngle = 360 / 60; //градусов в одном шаге секундной и минутной стреллки
        self.hAngle = 360 / 12; // градусов в одном шаге часовой стреллки
        
        //создаём базу часов
        self.SVGElem = self.clock.querySelector("#CLEAR");
        var mainCircle = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "ellipse"
        );
        mainCircle.setAttribute("fill", "yellow");
        mainCircle.setAttribute("rx", self.diamBase / 2);
        mainCircle.setAttribute("ry", self.diamBase / 2);
        mainCircle.setAttribute("cx", self.diamBase / 2);
        mainCircle.setAttribute("cy", self.diamBase / 2);
        self.SVGElem.appendChild(mainCircle);
        self.SVGElem.style.width = self.diamBase + "px";
        self.SVGElem.style.height = self.diamBase + "px";
        
        //создаём цифры на часах
        var numCircle = [];
        var txtCircle = [];
        for (var i = 1; i <= 12; i++) {
          numCircle[i] = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
          );
          numCircle[i].setAttribute("fill", "#c2fc03");
          numCircle[i].setAttribute("r", diamNum / 2);
          var numCenterX =
          self.diamBase / 2 + (self.diamBase / 2 - diamNum) * Math.sin(i * angle);
          var numCenterY =
          self.diamBase / 2 - (self.diamBase / 2 - diamNum) * Math.cos(i * angle);
          numCircle[i].setAttribute("cx", numCenterX);
          numCircle[i].setAttribute("cy", numCenterY);
          self.SVGElem.appendChild(numCircle[i]);
        
          txtCircle[i] = document.createElementNS("http://www.w3.org/2000/svg", "text");
          self.SVGElem.appendChild(txtCircle[i]);
          txtCircle[i].textContent = i;
          txtCircle[i].setAttribute(
            "x",
            numCenterX-diamNum/4
          );
          txtCircle[i].setAttribute(
            "y",
            numCenterY +
              txtCircle[i].getBoundingClientRect().height / 3
          );
        }
        
        //СОЗДАЁМ СТРЕЛКИ
        
        //минутная
        self.minArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        self.minArrow.setAttribute("stroke", "black");
        self.minArrow.setAttribute("stroke-width", "5px");
        self.minArrow.setAttribute("stroke-linecap", "round");
        self.minArrow.setAttribute("x1", self.diamBase / 2);
        self.minArrow.setAttribute("y1", self.diamBase / 2);
        self.minArrow.setAttribute("x2", self.diamBase / 2);
        self.minArrow.setAttribute("y2", self.diamBase / 7);
        self.SVGElem.appendChild(self.minArrow);
        
        //часовая
        self.hArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        self.hArrow.setAttribute("stroke", "black");
        self.hArrow.setAttribute("stroke-width", "8px");
        self.hArrow.setAttribute("stroke-linecap", "round");
        self.hArrow.setAttribute("x1", self.diamBase / 2);
        self.hArrow.setAttribute("y1", self.diamBase / 2);
        self.hArrow.setAttribute("x2", self.diamBase / 2);
        self.hArrow.setAttribute("y2", self.diamBase / 4);
        self.SVGElem.appendChild(self.hArrow);
        
        // //секундная
        self.secArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
        self.secArrow.setAttribute("stroke", "black");
        self.secArrow.setAttribute("stroke-width", "2px");
        self.secArrow.setAttribute("stroke-linecap", "round");
        self.secArrow.setAttribute("x1", self.diamBase / 2);
        self.secArrow.setAttribute("y1", self.diamBase / 2);
        self.secArrow.setAttribute("x2", self.diamBase / 2);
        self.secArrow.setAttribute("y2", self.diamBase / 11);
        self.SVGElem.appendChild(self.secArrow);

    }

    self.update=function() {
        self.hou = myModel.currentTime.getUTCHours() + myModel.gmt;
        self.min = myModel.currentTime.getMinutes();
        self.sec = myModel.currentTime.getSeconds();
        self.citygmt.innerHTML = myModel.cityAndGmtStr;

        //секундная стрелка
        self.a1 = self.secNminAngle * self.sec;
        self.secArrow.setAttribute(
            "transform",
            "rotate(" + self.a1 + " " + self.diamBase / 2 + " " + self.diamBase / 2 + ")"
        );
        //минутная стрелка
        self.a2 = self.secNminAngle * self.min;
        self.minArrow.setAttribute(
            "transform",
            "rotate(" + self.a2 + " " + self.diamBase / 2 + " " + self.diamBase / 2 + ")"
        );
        //часовая стрелка
        self.a3 = self.hAngle * self.hou + self.hAngle * (self.a2 / 360);
        self.hArrow.setAttribute(
            "transform",
            "rotate(" + self.a3 + " " + self.diamBase / 2 + " " + self.diamBase / 2 + ")"
        );
    }
}