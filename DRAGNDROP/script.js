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
  }
}
