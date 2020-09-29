"use strict";

function addObj() {
  var areaForAction = document.getElementById("DRnDRarea");
  var quantityOfObj = document.getElementById("qOfObj").value;
  for (var i = 0; i < quantityOfObj; i++) {
    var objDND = document.createElement("img");
    objDND.src = "pic/win.png";
    objDND.setAttribute("class", "DRAGme");
    objDND.style.left = Math.floor(Math.random() * 300) + "px";
    objDND.style.top = Math.floor(Math.random() * 300) + "px";
    areaForAction.appendChild(objDND);
    objDND.onmousedown = mdF;
    objDND.onmouseup = muF;
    objDND.onmousemove = mmF;
  }
}

var mousePosX = 0;
var mousePosY = 0;

function mdF(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  EO.target.style.position = "absolute";
  EO.target.style.zIndex = 1000;
  //   console.log(EO);
  mousePosX = EO.pageX;
  mousePosY = EO.pageY;
}

function muF(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  EO.target.style.zIndex = 0;
  //   console.log(EO.target);
}

function mmF(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  EO.target.style.left = EO.target.pageX - mousePosX + "px";
  EO.target.style.top = EO.target.pageY - mousePosY + "px";
}
