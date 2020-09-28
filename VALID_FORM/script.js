"use strict";

function emptyField(EO) {
  if (!EO.target.nextSibling) {
    var errElement = document.createElement("span");
    errElement.setAttribute("id", "error");
    errElement.innerHTML = '<font color="red">   Вы не ввели значение</font>';
    var par = EO.target.parentNode;
    par.appendChild(errElement);
    return false;
  }
  EO.target.nextSibling.innerHTML =
    '<font color="red">   Вы не ввели значение</font>';
  return false;
}

function otherConditions(EO, errStr) {
  if (!EO.target.nextSibling) {
    var errElement = document.createElement("span");
    errElement.setAttribute("id", "error");
    errElement.innerHTML = "<font color='red'>   " + errStr + "</font>";
    var par = EO.target.parentNode;
    par.appendChild(errElement);
    return false;
  }
  EO.target.nextSibling.innerHTML =
    "<font color='red'>   " + errStr + "</font>";
  return false;
}

//сама валидация даты
//тут можно конечно ещё много проверок добавить, но пока думаю хватит и так =)
function dateIsValid(value) {
  var arrD = value.split(".");
  arrD[1] -= 1;
  var d = new Date(arrD[2], arrD[1], arrD[0]);
  if (
    d.getFullYear() == arrD[2] &&
    d.getMonth() == arrD[1] &&
    d.getDate() == arrD[0]
  ) {
    return true;
  } else {
    return false;
  }
}

function textFieldValidator(EO) {
  var EO = EO || window.event;
  var finishValue = EO.target.value.trim();
  EO.target.value = finishValue;
  var fieldName = EO.target.name;
  //поле осталось не заполненным
  if (!finishValue) return emptyField(EO);
  //другие условия
  switch (fieldName) {
    case "author":
      if (finishValue.length > 30)
        return otherConditions(EO, "Вы ввели слишком длинное значение.");
      break;
    case "sitetitle":
      if (finishValue.length > 30)
        return otherConditions(EO, "Вы ввели слишком длинное значение.");
      break;
    case "siteURL":
      if (
        finishValue.trim().toLowerCase().split(".")[0] !== "www" &&
        finishValue.trim().toLowerCase().slice(0, 8) !== "https://" &&
        finishValue.trim().toLowerCase().slice(0, 7) !== "http://"
      )
        return otherConditions(
          EO,
          "Адрес сайта должен начинаться с www или https:// или http://"
        );
      break;
    case "startdate":
      if (!dateIsValid(finishValue)) {
        return otherConditions(EO, "Необходимый формат даты ДД.ММ.ГГ");
      }
      break;
    case "persons":
      if (!Number(finishValue)) {
        return otherConditions(EO, "Необходимо ввести число");
      }
      break;
    case "mail":
      if (finishValue.indexOf("@") === -1) {
        return otherConditions(EO, "Email должен содержать символ @");
      }
      break;
  }
  if (EO.target.nextSibling) EO.target.nextSibling.remove();
  return true;
}

function emptyGroup(el) {
  if (!el.nextSibling) {
    var errElement = document.createElement("span");
    errElement.setAttribute("id", "error");
    errElement.innerHTML =
      '<font color="red">   Вы не выбрали ни одного параметра</font>';
    var par = el.parentNode;
    par.appendChild(errElement);
    return false;
  }
  el.nextSibling.innerHTML =
    '<font color="red">   Вы не выбрали ни одного параметра</font>';
  return false;
}

function radioAndCheckValidator(EO) {
  var EO = EO || window.event;
  var radioArr = document.getElementsByName("public");
  //поле осталось не заполненным
  var count = 0;
  for (var i = 0; i < radioArr.length; i++) {
    if (radioArr[i].checked === true) count += 1;
  }
  if (count === 0) return emptyGroup(radioArr[radioArr.length - 1]);
  if (radioArr[radioArr.length - 1].nextSibling)
    radioArr[radioArr.length - 1].nextSibling.remove();
  return true;
}

function allFormValid(EO) {
  var tagForm = document.forms.validForm;
  var authorField = tagForm.elements.author;
  authorField.addEventListener("focus", textFieldValidator, false);
  authorField.focus();
  var titleField = tagForm.elements.sitetitle;
  titleField.addEventListener("focus", textFieldValidator, false);
  titleField.focus();
  var siteURLField = tagForm.elements.siteURL;
  siteURLField.addEventListener("focus", textFieldValidator, false);
  siteURLField.focus();
  var startDateField = tagForm.elements.startdate;
  startDateField.addEventListener("focus", textFieldValidator, false);
  startDateField.focus();
  var personsField = tagForm.elements.persons;
  personsField.addEventListener("focus", textFieldValidator, false);
  personsField.focus();
  var mailField = tagForm.elements.mail;
  mailField.addEventListener("focus", textFieldValidator, false);
  mailField.focus();
  var articleField = tagForm.elements.article;
  articleField.addEventListener("focus", textFieldValidator, false);
  articleField.focus();
  var radioGroup = document.getElementsByName("radiogr")[0];
  console.log(radioGroup);
  radioGroup.addEventListener("focus", radioAndCheckValidator, false);
  radioGroup.focus();
  var checkGroup = document.getElementsByName("comments");

  if (document.getElementById("error")) EO.preventDefault();
}

var tagForm = document.forms.validForm;

var authorField = tagForm.elements.author;
authorField.addEventListener("blur", textFieldValidator, false);
var titleField = tagForm.elements.sitetitle;
titleField.addEventListener("blur", textFieldValidator, false);
var siteURLField = tagForm.elements.siteURL;
siteURLField.addEventListener("blur", textFieldValidator, false);
var startDateField = tagForm.elements.startdate;
startDateField.addEventListener("blur", textFieldValidator, false);
var personsField = tagForm.elements.persons;
personsField.addEventListener("blur", textFieldValidator, false);
var mailField = tagForm.elements.mail;
mailField.addEventListener("blur", textFieldValidator, false);
var articleField = tagForm.elements.article;
articleField.addEventListener("blur", textFieldValidator, false);

var radioGroup = document.getElementsByName("radiogr")[0];
console.log(radioGroup);
radioGroup.addEventListener("click", radioAndCheckValidator, false);

var submitBtn = tagForm.elements.submitbutton;
submitBtn.addEventListener("click", allFormValid, false);
