"use strict";

var diamBase = 300; //диаметр диска часов
var diamNum = 30; //диаметр кругов вокруг цифр
var angle = (30 / 180) * Math.PI; //градусов в одном часу
var secNminAngle = 360 / 60; //градусов в одном шаге секундной и минутной стреллки
var hAngle = 360 / 12; // градусов в одном шаге часовой стреллки

var startTime = new Date();

//создаём базу часов
var baseClock = document.createElement("div");
baseClock.style.position = "relative";
baseClock.style.borderRadius = "50%";
baseClock.style.width = diamBase + "px";
baseClock.style.height = diamBase + "px";
baseClock.style.background = "yellow";
document.body.appendChild(baseClock);

//создаём цифровые часы
var stringClock = document.createElement("span");
stringClock.setAttribute("id", "digital");
stringClock.innerHTML =
  str0l(startTime.getHours(), 2) +
  ":" +
  str0l(startTime.getMinutes(), 2) +
  ":" +
  str0l(startTime.getSeconds(), 2);
stringClock.style.position = "absolute";
baseClock.appendChild(stringClock);
stringClock.style.left =
  baseClock.getBoundingClientRect().width / 2 -
  stringClock.offsetWidth / 2 +
  "px";
stringClock.style.top = baseClock.getBoundingClientRect().height / 4 + "px";

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
    baseClock.offsetTop +
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
var minuteArrow = document.createElement("div");
minuteArrow.setAttribute("id", "min");
minuteArrow.style.position = "absolute";
minuteArrow.style.background = "black";
minuteArrow.style.width = diamBase / 50 + "px"; //линейные размеры
minuteArrow.style.height = diamBase / 2.7 + "px"; //линейные размеры
minuteArrow.style.borderRadius = minuteArrow.style.height;
baseClock.appendChild(minuteArrow);
minuteArrow.style.left =
  baseClock.offsetLeft +
  baseClock.offsetWidth / 2 -
  baseClock.getBoundingClientRect().left -
  minuteArrow.offsetWidth / 2 +
  "px";
minuteArrow.style.top =
  baseClock.offsetTop +
  baseClock.offsetHeight / 2 -
  baseClock.getBoundingClientRect().top -
  minuteArrow.offsetHeight +
  "px";
var startA2 = secNminAngle * startTime.getMinutes();
minuteArrow.style.transformOrigin =
  minuteArrow.offsetWidth / 2 + "px " + minuteArrow.offsetHeight + "px";
minuteArrow.style.transform = "rotate(" + startA2 + "deg)";

//часовая
var hourArrow = document.createElement("div");
hourArrow.setAttribute("id", "hour");
hourArrow.style.position = "absolute";
hourArrow.style.background = "black";
hourArrow.style.width = diamBase / 30 + "px"; //линейные размеры
hourArrow.style.height = diamBase / 3.2 + "px"; //линейные размеры
hourArrow.style.borderRadius = hourArrow.style.height;
baseClock.appendChild(hourArrow);
hourArrow.style.left =
  baseClock.offsetLeft +
  baseClock.offsetWidth / 2 -
  baseClock.getBoundingClientRect().left -
  hourArrow.offsetWidth / 2 +
  "px";
hourArrow.style.top =
  baseClock.offsetTop +
  baseClock.offsetHeight / 2 -
  baseClock.getBoundingClientRect().top -
  hourArrow.offsetHeight +
  "px";
var startA3 = hAngle * startTime.getHours() + hAngle * (startA2 / 360);
hourArrow.style.transformOrigin =
  hourArrow.offsetWidth / 2 + "px " + hourArrow.offsetHeight + "px";
hourArrow.style.transform = "rotate(" + startA3 + "deg)";

//секундная
var secondArrow = document.createElement("div");
secondArrow.setAttribute("id", "sec");
secondArrow.style.position = "absolute";
secondArrow.style.background = "black";
secondArrow.style.width = diamBase / 70 + "px"; //линейные размеры
secondArrow.style.height = diamBase / 2.3 + "px"; //линейные размеры
secondArrow.style.borderRadius = secondArrow.style.height;
baseClock.appendChild(secondArrow);
secondArrow.style.left =
  baseClock.offsetLeft +
  baseClock.offsetWidth / 2 -
  baseClock.getBoundingClientRect().left -
  secondArrow.offsetWidth / 2 +
  "px";
secondArrow.style.top =
  baseClock.offsetTop +
  baseClock.offsetHeight / 2 -
  baseClock.getBoundingClientRect().top -
  secondArrow.offsetHeight +
  "px";
var startA1 = secNminAngle * startTime.getSeconds();
secondArrow.style.transformOrigin =
  secondArrow.offsetWidth / 2 + "px " + secondArrow.offsetHeight + "px";
secondArrow.style.transform = "rotate(" + startA1 + "deg)";
//дополнение нулями
function str0l(val, len) {
  var strVal = val.toString();
  while (strVal.length < len) strVal = "0" + strVal;
  return strVal;
}
//работа часов
function updateTime() {
  var currTime = new Date();
  //цифровые часы
  document.getElementById("digital").innerHTML =
    str0l(currTime.getHours(), 2) +
    ":" +
    str0l(currTime.getMinutes(), 2) +
    ":" +
    str0l(currTime.getSeconds(), 2);
  //секундная стрелка
  var secArrow = document.getElementById("sec");
  var a1 = secNminAngle * currTime.getSeconds();
  secArrow.style.transformOrigin =
    secondArrow.offsetWidth / 2 + "px " + secondArrow.offsetHeight + "px";
  secArrow.style.transform = "rotate(" + a1 + "deg)";
  //минутная стрелка
  var minArrow = document.getElementById("min");
  var a2 = secNminAngle * currTime.getMinutes();
  minArrow.style.transformOrigin =
    minuteArrow.offsetWidth / 2 + "px " + minuteArrow.offsetHeight + "px";
  minArrow.style.transform = "rotate(" + a2 + "deg)";
  //Яасовая стрелка
  var hArrow = document.getElementById("hour");
  var a3 = hAngle * currTime.getHours() + hAngle * (a2 / 360);
  hArrow.style.transformOrigin =
    hourArrow.offsetWidth / 2 + "px " + hourArrow.offsetHeight + "px";
  hArrow.style.transform = "rotate(" + a3 + "deg)";
}

setInterval(updateTime, 1000);
