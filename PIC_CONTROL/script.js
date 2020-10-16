"use strict";

window.addEventListener("load", documentReady, false);

function documentReady() {
  var mainElem = document.getElementById("PICcontrol");
  mainElem.style.position = "absolute";
  mainElem.style.left = "10%";
  mainElem.style.top = "10%";
  //ищем элементы управления и вешаем на них обработчики
  var res1 = document.getElementById("1");
  res1.style.top = "0%";
  res1.style.left = "50%";
  res1.addEventListener("mousedown", mdResizeFunc, false);
  res1.addEventListener("mousemove", changeCursor, false);
  var res2 = document.getElementById("2");
  res2.style.top = "50%";
  res2.style.left = "0%";
  res2.addEventListener("mousedown", mdResizeFunc, false);
  res2.addEventListener("mousemove", changeCursor, false);
  var res3 = document.getElementById("3");
  res3.style.top =
    100 - 100 * (res3.offsetHeight / mainElem.offsetHeight) + "%";
  res3.style.left = "50%";
  res3.addEventListener("mousedown", mdResizeFunc, false);
  res3.addEventListener("mousemove", changeCursor, false);
  var res4 = document.getElementById("4");
  res4.style.top = "50%";
  res4.style.left = 100 - 100 * (res4.offsetWidth / mainElem.offsetWidth) + "%";
  res4.addEventListener("mousedown", mdResizeFunc, false);
  res4.addEventListener("mousemove", changeCursor, false);
  var rot1 = document.getElementById("5");
  rot1.style.top = "0%";
  rot1.style.left = "0%";
  rot1.addEventListener("mousedown", mdResizeFunc, false);
  rot1.addEventListener("mousemove", changeCursor, false);
  var rot2 = document.getElementById("6");
  rot2.style.bottom = "0%";
  rot2.style.left = "0%";
  rot2.addEventListener("mousedown", mdResizeFunc, false);
  rot2.addEventListener("mousemove", changeCursor, false);
  var rot3 = document.getElementById("7");
  rot3.style.bottom = "0%";
  rot3.style.right = "0%";
  rot3.addEventListener("mousedown", mdResizeFunc, false);
  rot3.addEventListener("mousemove", changeCursor, false);
  var rot4 = document.getElementById("8");
  rot4.style.top = "0%";
  rot4.style.right = "0%";
  rot4.addEventListener("mousedown", mdResizeFunc, false);
  rot4.addEventListener("mousemove", changeCursor, false);

  mainElem.addEventListener("mousedown", mdF, false);
}

//обработка перемещение объекта как в предыдущем задании
function mdF(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  if (EO.target.id === "PICcontrol") {
    EO.target.style.cursor = "move";
    var globalTarget = EO.target;
    var relPosX = EO.clientX - EO.target.getBoundingClientRect().left;
    var relPosY = EO.clientY - EO.target.getBoundingClientRect().top;
    document.addEventListener("mousemove", mmF, false);
    EO.target.addEventListener("mouseup", muF, false);

    function muF(EO) {
      var EO = EO || window.event;
      EO.preventDefault();
      document.removeEventListener("mousemove", mmF);
      EO.target.removeEventListener("mouseup", muF);
    }

    function mmF(EO) {
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
          globalTarget.style.left =
            coordX -
            globalTarget.parentNode.getBoundingClientRect().left +
            "px";
          globalTarget.style.top =
            coordY - globalTarget.parentNode.getBoundingClientRect().top + "px";
        }
      } else return false;
    }
  }
}
//изменение курсора при наведении на элемент управления
function changeCursor(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  var cursorHash = {
    1: "n-resize",
    2: "w-resize",
    3: "s-resize",
    4: "e-resize",
    5: "nw-resize",
    6: "sw-resize",
    7: "se-resize",
    8: "ne-resize",
  };
  EO.target.style.cursor = cursorHash[EO.target.id];
}
//обработка событий элементов управления
function mdResizeFunc(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
  var targetDiv = EO.target.parentNode;
  var tDleft = EO.target.parentNode.getBoundingClientRect().left;
  var tDrigth = EO.target.parentNode.getBoundingClientRect().right;
  var tDtop = EO.target.parentNode.getBoundingClientRect().top;
  var tDbottom = EO.target.parentNode.getBoundingClientRect().bottom;
  var tDheight = EO.target.parentNode.getBoundingClientRect().height;
  var tDwidth = EO.target.parentNode.getBoundingClientRect().width;
  var targetObj = EO.target;
  var startPosX = EO.clientX;
  var startPosY = EO.clientY;

  document.addEventListener("mousemove", mmResizeFunc, false);
  document.addEventListener("mouseup", muResizeFunc, false);

  function muResizeFunc(EO) {
    var EO = EO || window.event;
    EO.preventDefault();
    // var w = targetDiv.getBoundingClientRect().width;
    // var h = targetDiv.getBoundingClientRect().height;
    // var t =
    //   targetDiv.getBoundingClientRect().top -
    //   targetDiv.parentNode.getBoundingClientRect().top;
    // var l =
    //   targetDiv.getBoundingClientRect().left -
    //   targetDiv.parentNode.getBoundingClientRect().left;
    // targetDiv.style = null;
    // targetDiv.style.position = "absolute";
    // targetDiv.style.width = w + "px";
    // targetDiv.style.height = h + "px";
    // targetDiv.style.top = t + "px";
    // targetDiv.style.left = l + "px";
    document.getElementById("3").style.top =
      100 -
      100 *
        (document.getElementById("3").offsetHeight / targetDiv.offsetHeight) +
      "%";
    document.getElementById("4").style.left =
      100 -
      100 * (document.getElementById("4").offsetWidth / targetDiv.offsetWidth) +
      "%";
    document.removeEventListener("mousemove", mmResizeFunc);
    document.removeEventListener("mouseup", muResizeFunc);
  }

  function mmResizeFunc(EO) {
    if (EO.which === 1) {
      var EO = EO || window.event;
      EO.preventDefault();
      var currentPosX = EO.clientX;
      var currentPosY = EO.clientY;
      switch (targetObj.id) {
        //изменение размеров по ширине и высоте отдельно
        case "1": {
          var resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight - resizeValue + "px";
          targetDiv.style.bottom = tDbottom + "px";  //фиксация грани на противоположной действию стороне
          break;
        }
        case "2": {
          var resizeValue = currentPosX - startPosX;
          targetDiv.style.width = tDwidth - resizeValue + "px";
          targetDiv.style.right = tDrigth + "px"; //фиксация грани на противоположной действию стороне
          break;
        }
        case "3": {  //OK
          var resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight + resizeValue + "px";
          break;
        }
        case "4": {  //OK
          var resizeValue = currentPosX - startPosX;
          targetDiv.style.width = tDwidth + resizeValue + "px";
          break;
        }
        //изменение размеров при помощи угловых элем. управления
        case "5": {  //not OK
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight - resizeValue + "px";
          targetDiv.style.width = tDwidth - resizeValue + "px";
          targetDiv.style.bottom = tDbottom + "px";   //фиксация точки на противоположном действию углу
          targetDiv.style.right = tDrigth + "px";     //фиксация точки на противоположном действию углу
          break;
        }
        case "6": {   //not OK
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight - resizeValue + "px";
          targetDiv.style.width = tDwidth - resizeValue + "px";
          targetDiv.style.right = tDrigth + "px";   //фиксация точки на противоположном действию углу, top остаётся
          break;
        }
        case "7": {  //OK
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight + resizeValue + "px";
          targetDiv.style.width = tDwidth + resizeValue + "px"; 
          break;
        }
        case "8": {   //not OK
          if (
            Math.abs(startPosX + currentPosX) >
            Math.abs(startPosY - currentPosY)
          )
            var resizeValue = currentPosX - startPosX;
          else resizeValue = currentPosY - startPosY;
          targetDiv.style.height = tDheight + resizeValue + "px";
          targetDiv.style.width = tDwidth + resizeValue + "px";
          targetDiv.style.bottom = tDbottom + "px"; //фиксация точки на противоположном действию углу, left остаётся
          break;
        }
      }
    } else return false;
  }
}
