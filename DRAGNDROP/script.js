"use strict";

var zIndexCount = 1;

window.addEventListener("load", documentReady, false);

function documentReady() {
  var dragArea = document.getElementById("DRnDRarea");
  var allImg = dragArea.getElementsByTagName("img");
  for (var i = 0; i < allImg.length; i++) {
    // для каждого элемента: даём position:absolute и позиционируем в координаты
    var posTop = allImg[i].offsetTop;
    var posLeft = allImg[i].offsetLeft;
    allImg[i].style.top = posTop + "px";
    allImg[i].style.left = posLeft + "px";
    //подписываемся на событие нажатия левой клавиши мыши
    allImg[i].addEventListener("mousedown", mdF, false);
  }
  for (var i = 0; i < allImg.length; i++) {
    allImg[i].style.position = "absolute";
  }
}

//обработка нажатия левой клавиши мыши
function mdF(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  EO.target.style.cursor = "move";
  EO.target.style.position = "absolute";
  EO.target.style.zIndex = zIndexCount;
  var relPosX = EO.clientX - EO.target.getBoundingClientRect().left;
  var relPosY = EO.clientY - EO.target.getBoundingClientRect().top;

  //прослушиваем события движения мыши и отпускания клавиши мыши
  EO.target.addEventListener("mousemove", mmF, false);
  EO.target.addEventListener("mouseup", muF, false);

  //обработка отпускания левой клавиши мыши
  function muF(EO) {
    var EO = EO || window.event;
    EO.preventDefault();
    EO.target.style.position = "absolute";
    EO.target.style.zIndex = zIndexCount;
    zIndexCount += 1;
    EO.target.removeEventListener("mousemove", mmF);
    EO.target.removeEventListener("mouseup", muF);
    EO.target.removeEventListener("mouseout", moF, false);
  }

  //обработка резкого рывка и потери объекта
  function moF(EO) {
    var EO = EO || window.event;
    EO.preventDefault();
    EO.target.removeEventListener("mousemove", mmF);
    setTimeout(() => {
      function newCoord(EO) {
        var EO = EO || window.event;
        document.querySelector("#tempX").value = EO.pageX - 30;
        document.querySelector("#tempY").value = EO.pageY - 30;
      }
      document.addEventListener("mousemove", newCoord, false);
      EO.target.style.left = document.querySelector("#tempX").value + "px";
      EO.target.style.top = document.querySelector("#tempY").value + "px";
      EO.target.style.position = "absolute";
      EO.target.addEventListener("mousemove", mmF, false);
      EO.target.removeEventListener("mouseout", moF, false);
    }, 200);
  }

  //обработка движения мыши с зажатой левой клавишей
  function mmF(EO) {
    //определяем левая ли клавиша была нажата
    if (EO.which === 1) {
      var EO = EO || window.event;
      EO.preventDefault();
      var coordX = EO.pageX - relPosX;
      var coordY = EO.pageY - relPosY;
      var drndrArea = document.getElementById("DRnDRarea");
      var minLimitX = drndrArea.getBoundingClientRect().left / 2;
      var minLimitY = drndrArea.getBoundingClientRect().top / 2;
      var maxLimitX = drndrArea.getBoundingClientRect().right - minLimitX;
      var maxLimitY = drndrArea.getBoundingClientRect().bottom - minLimitY;
      EO.target.addEventListener("mouseout", moF, false);
      if (
        coordX > minLimitX &&
        coordX < maxLimitX - EO.target.offsetWidth &&
        coordY > minLimitY &&
        coordY < maxLimitY - EO.target.offsetHeight
      ) {
        EO.target.style.left = coordX + "px";
        EO.target.style.top = coordY + "px";
      } else muF(EO);
    } else return false;
  }
}
