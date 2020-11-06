"use strict"

var diamBase = 300; //диаметр диска часов
var diamNum = 30; //диаметр кругов вокруг цифр
var angle = (30 / 180) * Math.PI; //градусов в одном часу
var secNminAngle = 360 / 60; //градусов в одном шаге секундной и минутной стреллки
var hAngle = 360 / 12; // градусов в одном шаге часовой стреллки

//создаём базу часов
var SVGElem = document.getElementById("CLEAR");
var mainCircle = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "ellipse"
);
mainCircle.setAttribute("fill", "yellow");
mainCircle.setAttribute("rx", diamBase / 2);
mainCircle.setAttribute("ry", diamBase / 2);
mainCircle.setAttribute("cx", diamBase / 2);
mainCircle.setAttribute("cy", diamBase / 2);
SVGElem.appendChild(mainCircle);
SVGElem.style.width = diamBase + "px";
SVGElem.style.height = diamBase + "px";

//создаём цифровые часы
var txt = document.createElementNS("http://www.w3.org/2000/svg", "text");
var startTime = new Date();
txt.textContent =
  str0l(startTime.getHours(), 2) +
  ":" +
  str0l(startTime.getMinutes(), 2) +
  ":" +
  str0l(startTime.getSeconds(), 2);
SVGElem.appendChild(txt);
txt.setAttribute("x", diamBase / 2 - txt.getBoundingClientRect().width / 2);
txt.setAttribute("y", diamBase / 2 - txt.getBoundingClientRect().height * 2);

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
    diamBase / 2 + (diamBase / 2 - diamNum) * Math.sin(i * angle);
  var numCenterY =
    diamBase / 2 - (diamBase / 2 - diamNum) * Math.cos(i * angle);
  numCircle[i].setAttribute("cx", numCenterX);
  numCircle[i].setAttribute("cy", numCenterY);
  SVGElem.appendChild(numCircle[i]);

  txtCircle[i] = document.createElementNS("http://www.w3.org/2000/svg", "text");
  SVGElem.appendChild(txtCircle[i]);
  txtCircle[i].textContent = i;
  txtCircle[i].setAttribute(
    "x",
    numCenterX - SVGElem.getBoundingClientRect().left
  );
  txtCircle[i].setAttribute(
    "y",
    numCenterY -
      SVGElem.getBoundingClientRect().top / 2 +
      txtCircle[i].getBoundingClientRect().height / 2
  );
}

//СОЗДАЁМ СТРЕЛКИ

//минутная
var minArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
minArrow.setAttribute("stroke", "black");
minArrow.setAttribute("stroke-width", "5px");
minArrow.setAttribute("stroke-linecap", "round");
minArrow.setAttribute("x1", diamBase / 2);
minArrow.setAttribute("y1", diamBase / 2);
minArrow.setAttribute("x2", diamBase / 2);
minArrow.setAttribute("y2", diamBase / 7);
SVGElem.appendChild(minArrow);

//часовая
var hArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
hArrow.setAttribute("stroke", "black");
hArrow.setAttribute("stroke-width", "8px");
hArrow.setAttribute("stroke-linecap", "round");
hArrow.setAttribute("x1", diamBase / 2);
hArrow.setAttribute("y1", diamBase / 2);
hArrow.setAttribute("x2", diamBase / 2);
hArrow.setAttribute("y2", diamBase / 4);
SVGElem.appendChild(hArrow);

// //секундная
var secArrow = document.createElementNS("http://www.w3.org/2000/svg", "line");
secArrow.setAttribute("stroke", "black");
secArrow.setAttribute("stroke-width", "2px");
secArrow.setAttribute("stroke-linecap", "round");
secArrow.setAttribute("x1", diamBase / 2);
secArrow.setAttribute("y1", diamBase / 2);
secArrow.setAttribute("x2", diamBase / 2);
secArrow.setAttribute("y2", diamBase / 11);
SVGElem.appendChild(secArrow);

updateTime();

//дополнение нулями
function str0l(val, len) {
  var strVal = val.toString();
  while (strVal.length < len) strVal = "0" + strVal;
  return strVal;
}
//РАБОТА ЧАСОВ
function updateTime() {
  var currTime = new Date();
  //цифровые часы
  txt.textContent =
    str0l(currTime.getHours(), 2) +
    ":" +
    str0l(currTime.getMinutes(), 2) +
    ":" +
    str0l(currTime.getSeconds(), 2);
  //секундная стрелка
  var a1 = secNminAngle * currTime.getSeconds();
  secArrow.setAttribute(
    "transform",
    "rotate(" + a1 + " " + diamBase / 2 + " " + diamBase / 2 + ")"
  );
  //минутная стрелка
  var a2 = secNminAngle * currTime.getMinutes();
  minArrow.setAttribute(
    "transform",
    "rotate(" + a2 + " " + diamBase / 2 + " " + diamBase / 2 + ")"
  );
  //часовая стрелка
  var a3 = hAngle * currTime.getHours() + hAngle * (a2 / 360);
  hArrow.setAttribute(
    "transform",
    "rotate(" + a3 + " " + diamBase / 2 + " " + diamBase / 2 + ")"
  );
}

setInterval(updateTime, 1000);
