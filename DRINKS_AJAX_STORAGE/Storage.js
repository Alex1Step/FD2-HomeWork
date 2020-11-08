"use strict";

    // model

    function LocStorage(kind) {
        var contin = window.localStorage.getItem(kind);
        if (contin) var storage=JSON.parse(contin);
        else var storage = {};
        this.name = null;
        this.about = null;
        this.flag = false;
        
        var myView = null;
        var myAJAX = null;

        this.start=function(view, ajaxV) {
            myView=view;
            myAJAX=ajaxV;
        };

        this.updateView=function() {
            if ( myView ) myView.update();
        };

        this.saveOnAJAX=function() {
            if ( myAJAX ) myAJAX.storeInfo();
        };

        this.addValue = function(key, value) {
            storage[key] = value;
            window.localStorage.setItem(kind,JSON.stringify(storage));
            this.saveOnAJAX();
        };

        this.getValue = function(key) {
            return storage[key];
        };

        this.deleteValue = function(key) {
            if (!(key in storage)) return false
            delete storage[key];
            window.localStorage.setItem(kind,JSON.stringify(storage));
            this.saveOnAJAX();
            return true;
        };

        this.getKeys = function() {
            return (Object.keys(storage));
        };

        this.printInfo = function(cname, cabout){
            this.name = cname;
            this.about = cabout;
            this.updateView();
        }

        this.printAll = function(cflag) {
            this.flag = cflag;
            this.updateView();
        }
    };

    // view

    function HashStorageView() {
        var myModel = null;
        var myField = null;
        var drink = null;
        var alco = null;
        var recipe = null;
        var ingr = null;
        var drinklist = null;

        this.start=function(model,field) {
            myModel=model;
            myField=field;

            // ищем и запоминаем интересные нам элементы DOM
            drink=myField.querySelector('#drink');
            alco=myField.querySelector('#alco');
            recipe=myField.querySelector('#recipe');
            ingr=myField.querySelector('#ingr');
            drinklist=myField.querySelector('#drinklist');
        }

        this.update=function() {
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
        var myModel = null; 
        var myField = null;

        this.start=function(model,field) {
            myModel=model;
            myField=field;

            var eInf=myField.querySelector('#enterInf');
            eInf.addEventListener('click',this.enterInf);
            var gInf=myField.querySelector('#getInf');
            gInf.addEventListener('click',this.getInf);
            var dInf=myField.querySelector('#delInf');
            dInf.addEventListener('click',this.delInf);
            var aInf=myField.querySelector('#allDrinksList');
            aInf.addEventListener('click',this.allDrinksList);
        }

        this.enterInf=function() {
            var drinkName = prompt("Введите название напитка");
            var drinkIsAlko = prompt("Напиток алкогольный? ДА/НЕТ");
            var drinkRecipe = prompt("Введите рецепт напитка");
            var drinkIngr = prompt("Введите ингридиенты для напитка");
            myModel.addValue(drinkName, {"alko":drinkIsAlko, "recipe":drinkRecipe, "ingredients":drinkIngr});
        }

        this.getInf=function() {
            var reqDrinkName = prompt("Введите название напитка");
            var currentCoctail = myModel.getValue(reqDrinkName);
            if (currentCoctail) {
                myModel.printInfo(reqDrinkName, currentCoctail);
            }
            else alert("Выбранного коктейля нет в списке!")
        }

        this.delInf=function() {
            var reqDrinkName = prompt("Введите название напитка");
            if (myModel.deleteValue(reqDrinkName)) return alert("Коктейль удалён из списка!")
            else return alert("Такого коктейля нет в списке");
        }

        this.allDrinksList=function() {
            myModel.printAll(true);
        }

    }