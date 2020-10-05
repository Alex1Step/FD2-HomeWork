"use strict";

window.addEventListener("load", documentReady, false);

function documentReady() {
  var mainElem = document.getElementById("PICcontrol");
  mainElem.style.position = "absolute";
  mainElem.style.left = "500px";
  mainElem.style.top = "150px";
  var res1 = document.getElementById("1");
  res1.style.top = "0px";
  res1.style.left = mainElem.offsetWidth / 2 - res1.offsetWidth / 2 + "px";
  res1.addEventListener("mousemove", changeCursor, false);
  res1.addEventListener("mousedown", resizeFunc, false);
  var res2 = document.getElementById("2");
  res2.style.top = mainElem.offsetHeight / 2 - res2.offsetHeight / 2 + "px";
  res2.style.left = "0px";
  res2.addEventListener("mousedown", resizeFunc, false);
  res2.addEventListener("mousemove", changeCursor, false);
  var res3 = document.getElementById("3");
  res3.style.bottom = "0px";
  res3.style.right = mainElem.offsetWidth / 2 - res3.offsetWidth / 2 + "px";
  res3.addEventListener("mousedown", resizeFunc, false);
  res3.addEventListener("mousemove", changeCursor, false);
  var res4 = document.getElementById("4");
  res4.style.bottom = mainElem.offsetHeight / 2 - res4.offsetHeight / 2 + "px";
  res4.style.right = "0px";
  res4.addEventListener("mousedown", resizeFunc, false);
  res4.addEventListener("mousemove", changeCursor, false);
  var rot1 = document.getElementById("5");
  rot1.style.top = "0px";
  rot1.style.left = "0px";
  rot1.addEventListener("mousemove", changeCursor, false);
  var rot2 = document.getElementById("6");
  rot2.style.bottom = "0px";
  rot2.style.left = "0px";
  rot2.addEventListener("mousemove", changeCursor, false);
  var rot3 = document.getElementById("7");
  rot3.style.bottom = "0px";
  rot3.style.right = "0px";
  rot3.addEventListener("mousemove", changeCursor, false);
  var rot4 = document.getElementById("8");
  rot4.style.top = "0px";
  rot4.style.right = "0px";
  rot4.addEventListener("mousemove", changeCursor, false);
  mainElem.addEventListener("mousedown", mdF, false);
}

//перемещение объекта
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

function resizeFunc(EO) {
  var EO = EO || window.event;
  EO.preventDefault();
}
