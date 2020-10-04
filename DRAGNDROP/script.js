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
  var globalTarget = EO.target; // !!!!! это переменная, которая запоминает, какой объект начал двигаться
  //чтобы при потере его в mmF продолжать работать именно с ним, а не с тем на который он перешел, например body
  var relPosX = EO.clientX - EO.target.getBoundingClientRect().left;
  var relPosY = EO.clientY - EO.target.getBoundingClientRect().top;

  //прослушиваем события движения мыши и отпускания клавиши мыши
  document.addEventListener("mousemove", mmF, false);
  EO.target.addEventListener("mouseup", muF, false);

  //обработка отпускания левой клавиши мыши
  function muF(EO) {
    var EO = EO || window.event;
    EO.preventDefault();
    EO.target.style.zIndex = zIndexCount;
    zIndexCount += 1;
    document.removeEventListener("mousemove", mmF);
    EO.target.removeEventListener("mouseup", muF);
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
      if (
        coordX > minLimitX &&
        coordX < maxLimitX - globalTarget.offsetWidth &&
        coordY > minLimitY &&
        coordY < maxLimitY - globalTarget.offsetHeight
      ) {
        globalTarget.style.left = coordX + "px"; //продолжаем работать именно с перетаскиваемым объектом
        globalTarget.style.top = coordY + "px"; //продолжаем работать именно с перетаскиваемым объектом
      }
    } else return false;
  }
}
