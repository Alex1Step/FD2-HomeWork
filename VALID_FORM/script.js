"use strict";

var combicWasChanghed = false;

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
//валидация текстовых полей
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
        return otherConditions(EO, "Необходимо ввести именно число");
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
//валидация textarea отдельно, потому что условие if (!EO.target.nextSibling) как в emptyField для textarea не срабатывало
function textAreaValidator(EO) {
  var EO = EO || window.event;
  var finishValue = EO.target.value.trim();
  if (finishValue === "") {
    var parN = EO.target.parentNode;
    if (!(parN.lastChild.id === "error")) {
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
  var textAParent = EO.target.parentNode;
  if (textAParent.lastChild.id === "error") textAParent.lastChild.remove();
  return true;
}

//валидация всех полей по нажатию кнопки "Опубликовать"
function allFormValid(EO) {
  //очистка сообщений валидации combobox
  var combicParent = document.querySelector("#combicDiv");
  if (combicParent.lastChild.id === "error") combicParent.lastChild.remove();
  //очистка сообщений валидации radio input
  var radioParent = document.querySelector("#RGroup");
  if (radioParent.lastChild.id === "error") radioParent.lastChild.remove();
  //очистка сообщений валидации checkbox
  var chckParent = document.querySelector("#chckB");
  if (chckParent.lastChild.id === "error") chckParent.lastChild.remove();
  //валидация текстовых полей
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
  articleField.addEventListener("click", textAreaValidator, false);
  articleField.click();
  //валидация radio input
  var checkedRadio = document.querySelector(".rad:checked");
  if (!checkedRadio) {
    var errRadio = document.createElement("span");
    errRadio.setAttribute("id", "error");
    errRadio.innerHTML =
      '<font color="red">   Пожалуйста, выберите расположение</font>';
    document.getElementById("RGroup").appendChild(errRadio);
  }
  //валидация checkbox`a
  var checkedChckBx = document.querySelector(".chkBx:checked");
  if (!checkedChckBx) {
    var errChck = document.createElement("span");
    errChck.setAttribute("id", "error");
    errChck.innerHTML = '<font color="red">   Вы не разрешили отзывы</font>';
    document.getElementById("chckB").appendChild(errChck);
  }
  //валидация combobox
  if (combicWasChanghed === false) {
    var errCombi = document.createElement("span");
    errCombi.setAttribute("id", "error");
    errCombi.innerHTML =
      '<font color="red">   Вы не изменяли "Рубрику каталога"</font>';
    document.getElementById("combicDiv").appendChild(errCombi);
  }

  if (document.getElementById("error")) {
    //при наличии хотябы одной ошибки - отмена стандартного поведения браузера
    EO.preventDefault();
    //и перемещение фокуса к первому полю с ошибкой
    var errorSpan = document.getElementById("error");
    var errorParent = errorSpan.parentNode;
    errorParent.firstChild.focus();
  }
}

//если всё-таки в radio input выбрано какое-то значение убираем сообщение об ошибке
function radioValid(EO) {
  var EO = EO || window.event;
  var checkedRadio = document.querySelector(".rad:checked");
  if (checkedRadio) {
    var radioParent = document.querySelector("#RGroup");
    if (radioParent.lastChild.id === "error") radioParent.lastChild.remove();
  }
}

//если всё-таки в checkbox`е поставили галочку сообщение об ошибке удаляем
function chckBxValid(EO) {
  var EO = EO || window.event;
  var checkedBOX = document.querySelector(".chkBx:checked");
  if (checkedBOX) {
    var chckParent = document.querySelector("#chckB");
    if (chckParent.lastChild.id === "error") chckParent.lastChild.remove();
  }
}
//если в combobox`e выбрали пустое значение
function selValid(EO) {
  combicWasChanghed = true;
  var combicParent = document.querySelector("#combicDiv");
  if (combicParent.lastChild.id === "error") combicParent.lastChild.remove();
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
articleField.addEventListener("blur", textAreaValidator, false);

var radioDiv = document.querySelector("#RGroup");
radioDiv.addEventListener("click", radioValid, false);

var checkBx = document.querySelector(".chkBx");
checkBx.addEventListener("click", chckBxValid, false);

var selectBox = document.getElementsByName("rubric")[0];
selectBox.addEventListener("click", selValid, false);

var submitBtn = tagForm.elements.submitbutton;
submitBtn.addEventListener("click", allFormValid, false);
