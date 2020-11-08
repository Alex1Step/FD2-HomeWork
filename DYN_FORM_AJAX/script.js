'use strict'

function setA(elem, attrHash){
    for (var key in attrHash) elem.setAttribute(key, attrHash[key]);
    return elem;
}

function forLtxtNumStxt(newLine){
  var txtVar = document.createElement("input");
  setA(txtVar, {type: 'text', name: newLine.name});
  return txtVar;
}

function forCombo(newLine){
  var txtVar = document.createElement("select");
  txtVar.setAttribute('name', newLine.name);
  var optionsArr=newLine.variants;
  for (var i=0; i<newLine.variants.length; i++){
    var txtOption = document.createElement("option");
    setA(txtOption, {value: optionsArr[i].value, label: optionsArr[i].text})
    txtVar.appendChild(txtOption);
  }
  return txtVar;
}

function forRadio(newLine){
  var txtVar = document.createElement("div");
  var optionsArr=newLine.variants;
  for (var i=0; i<newLine.variants.length; i++){
    var txtRadio=document.createElement("input");
    setA(txtRadio, {type: 'radio', name: newLine.name, value: optionsArr[i].value})
    txtVar.appendChild(txtRadio);
    var txtSpan=document.createElement("span");
    txtSpan = document.createTextNode(optionsArr[i].text);
    txtVar.appendChild(txtSpan);
  }
  return txtVar;
}

function forCheck(newLine){
  var txtVar = document.createElement("input");
  txtVar.setAttribute('type', 'checkbox')
  txtVar.setAttribute('name', newLine.name);
  return txtVar;
}

function forTextArea(newLine){
  var txtVar = document.createElement("textarea");
  txtVar.setAttribute('name', newLine.name);
  return txtVar;
}

function forSubmitBtn(newLine){
  var txtVar = document.createElement("input");
  txtVar.setAttribute('type', 'submit');
  txtVar.setAttribute('value', newLine.label);
  return txtVar;
}

function formBuilder(formArrGet){
  var formArr = formArrGet.formDef
  var tagForm=document.createElement("form");
  tagForm.setAttribute('action', "https://fe.it-academy.by/TestForm.php")
  var tabVar = document.createElement("table"); tagForm.appendChild(tabVar);
  var tabBodyVar = document.createElement("tbody"); tabVar.appendChild(tabBodyVar);
  for (var i=0; i<(formArr.length-1); i++){
    var trT = document.createElement("tr");
    var td1T = document.createElement("td");
    td1T = document.createTextNode(formArr[i].label)
    var td2T = document.createElement("td");
    switch(formArr[i].kind) {
      case 'longtext': {
        var tmp=forLtxtNumStxt(formArr[i]);
        break;
        }
      case 'shorttext': {
        var tmp=forLtxtNumStxt(formArr[i]);
        break;
        }
      case 'number': {
        var tmp=forLtxtNumStxt(formArr[i]);
        break;
        }
      case 'combo': {
        var tmp=forCombo(formArr[i]);
        break;
        }
      case 'radio': {
        var tmp=forRadio(formArr[i]);
        break;
        }
      case 'check': {
        var tmp=forCheck(formArr[i]);
        break;
        }
      case 'memo': {
        var tmp=forTextArea(formArr[i]);
        break;
        }
    }
    td2T.appendChild(tmp);
    trT.appendChild(td1T);
    trT.appendChild(td2T);
    tabBodyVar.appendChild(trT);
  }
  var submitBtn = forSubmitBtn(formArr[(formArr.length-1)]);
  tagForm.appendChild(submitBtn);
  document.body.appendChild(tagForm);
}

$.ajax("/formDef1.json", { type:'GET', dataType:'json', success:formBuilder});
$.ajax("/formDef2.json", { type:'GET', dataType:'json', success:formBuilder});