"use strict";

    // model

    function LocStorage(kind) {
        var self = this;
        var contin = window.localStorage.getItem(kind);
        if (contin) var storage=JSON.parse(contin);
        else if (self.stForAjax) storage = self.stForAjax
        else var storage = {};
        self.name = null;
        self.about = null;
        self.flag = false;
        self.stForAjax = storage;
        
        var myView = null;
        var myAJAX = null;

        self.start=function(view, ajaxV) {
            myView=view;
            myAJAX=ajaxV;
        };

        self.updateView=function() {
            if ( myView ) myView.update();
        };

        self.saveOnAJAX=function() {
            if ( myAJAX ) myAJAX.storeInfo();
        };

        self.addValue = function(key, value) {
            storage[key] = value;
            window.localStorage.setItem(kind,JSON.stringify(storage));
            self.stForAjax = storage;
            self.saveOnAJAX();
        };

        self.getValue = function(key) {
            return storage[key];
        };

        self.deleteValue = function(key) {
            if (!(key in storage)) return false
            delete storage[key];
            window.localStorage.setItem(kind,JSON.stringify(storage));
            self.stForAjax = storage;
            self.saveOnAJAX();
            return true;
        };

        self.getKeys = function() {
            return (Object.keys(storage));
        };

        self.printInfo = function(cname, cabout){
            self.name = cname;
            self.about = cabout;
            self.updateView();
        }

        self.printAll = function(cflag) {
            self.flag = cflag;
            self.updateView();
        }
    };

    // view

    function HashStorageView() {
        var self = this;
        var myModel = null;
        var myField = null;
        var drink = null;
        var alco = null;
        var recipe = null;
        var ingr = null;
        var drinklist = null;

        self.start=function(model,field) {
            myModel=model;
            myField=field;

            // ищем и запоминаем интересные нам элементы DOM
            drink=myField.querySelector('#drink');
            alco=myField.querySelector('#alco');
            recipe=myField.querySelector('#recipe');
            ingr=myField.querySelector('#ingr');
            drinklist=myField.querySelector('#drinklist');
        }

        self.update=function() {
            if (myModel.about && myModel.name) {
                drink.hidden = false
                drink.innerHTML = "Напиток: " + myModel.name;
                alco.hidden = false
                alco.innerHTML = "Алкогольный: " +  myModel.about["alko"];
                recipe.hidden = false
                recipe.innerHTML = "Рецепт приготовления: " + myModel.about["recipe"];
                ingr.hidden = false
                ingr.innerHTML = "Ингридиенты: " + myModel.about["ingredients"];
            }

            if (myModel.flag === true) {
                drinklist.hidden = false;
                drinklist.innerHTML = myModel.getKeys(); 
            }
        }

    };

    // controller

    function HashStorageController() {
        var self = this;
        var myModel = null; 
        var myField = null;

        self.start=function(model,field) {
            myModel=model;
            myField=field;

            var eInf=myField.querySelector('#enterInf');
            eInf.addEventListener('click',self.enterInf);
            var gInf=myField.querySelector('#getInf');
            gInf.addEventListener('click',self.getInf);
            var dInf=myField.querySelector('#delInf');
            dInf.addEventListener('click',self.delInf);
            var aInf=myField.querySelector('#allDrinksList');
            aInf.addEventListener('click',self.allDrinksList);
        }

        self.enterInf=function() {
            var drinkName = prompt("Введите название напитка");
            var drinkIsAlko = prompt("Напиток алкогольный? ДА/НЕТ");
            var drinkRecipe = prompt("Введите рецепт напитка");
            var drinkIngr = prompt("Введите ингридиенты для напитка");
            myModel.addValue(drinkName, {"alko":drinkIsAlko, "recipe":drinkRecipe, "ingredients":drinkIngr});
        }

        self.getInf=function() {
            var reqDrinkName = prompt("Введите название напитка");
            var currentCoctail = myModel.getValue(reqDrinkName);
            if (currentCoctail) {
                myModel.printInfo(reqDrinkName, currentCoctail);
            }
            else alert("Выбранного коктейля нет в списке!")
        }

        self.delInf=function() {
            var reqDrinkName = prompt("Введите название напитка");
            if (myModel.deleteValue(reqDrinkName)) return alert("Коктейль удалён из списка!")
            else return alert("Такого коктейля нет в списке");
        }

        self.allDrinksList=function() {
            myModel.printAll(true);
        }

    }