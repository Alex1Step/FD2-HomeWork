"use strict";
var RAF=
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };
//CANVAS
var playFloor = document.createElement("canvas");
playFloor.style.position = "relative";
playFloor.setAttribute("width", "700px");
playFloor.setAttribute("height", "400px");
document.body.appendChild(playFloor);
var ctx = playFloor.getContext('2d');

//ИГРОВОЕ ПОЛЕ
var areaPlay={
    width : 700,
    height : 400,
    update : function() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fill();
    }
}
areaPlay.update();

//ОБЪЕКТ МЯЧ
var ballPlay={
    posX : areaPlay.width/2,
    posY : areaPlay.height/2,
    speedX : 2,
    speedY: 1,
    radius : 15,
    update : function() {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.radius, 0, 2*Math.PI,true);
        ctx.fillStyle='red';
        ctx.fill();
        }
    }
    ballPlay.update();
var plHeight = 100;
var plWidth = 15;
//РАКЕТКА 1
var pl1={
    width : 15,
    height : 100,
    posX : 0,
    posY : areaPlay.height/2-plHeight/2,
    speedY: 0,
    update : function() {
        ctx.fillStyle = "green";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        }
    }
    pl1.update();

//РАКЕТКА 2
var pl2={
    width : 15,
    height : 100,
    posX : areaPlay.width-15,
    posY : areaPlay.height/2-plHeight/2,
    speedY: 0,
    update : function() {
        ctx.fillStyle = "blue";
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
        }
    }
    pl2.update();
//СЧЁТ
var countPl1 = 0;
var countPl2 = 0;
var counter = document.createElement("span");
counter.innerHTML = countPl1 + " : " + countPl2;
counter.style.position = "absolute";
document.body.appendChild(counter);
counter.style.left = playFloor.getBoundingClientRect().left + "px";
counter.style.top = playFloor.getBoundingClientRect().top/2 + "px";

//кнопка СТАРТ!
var startBtn = document.createElement("input");
startBtn.setAttribute("type", "button");
startBtn.style.position = "absolute";
startBtn.style.width = "60px";
startBtn.style.height = "20px";
startBtn.setAttribute("value", "СТАРТ!");
document.body.appendChild(startBtn);
startBtn.style.left = playFloor.getBoundingClientRect().left + "px";
startBtn.style.top = playFloor.getBoundingClientRect().top/1.4 + "px";

//НАЧАЛО ИГРЫ ПО НАЖАТИЮ ЭТОЙ КНОПКИ
startBtn.addEventListener("click", startGame, false);

//СТАРТ ИГРЫ
function startGame() {
    //ВОССТАНАВЛИВАЕМ ПЕРВОНАЧАЛЬНОЕ ПОЛОЖЕНИЕ
    ballPlay.posX = areaPlay.width/2;
    ballPlay.posY = areaPlay.height/2;
    ballPlay.speedX = 2;
    ballPlay.speedY = 1;
    pl1.posY = areaPlay.height/2-pl1.height/2
    pl2.posY = areaPlay.height/2-pl2.height/2
    //УПРАВЛЕНИЕ РАКЕТКАМИ ИГРОКОВ
    document.addEventListener('keydown', function(event) {
        if (event.code === "ControlLeft" && pl1.posY<(areaPlay.height - pl1.height)) {
            pl1.speedY = 1;
        } 
        else if (event.code === "ShiftLeft" && pl1.posY>0) {
            pl1.speedY = -1;
        }
        if (event.code === "ArrowDown" && pl2.posY<(areaPlay.height - pl2.height)) {
            pl2.speedY = 1;
        } 
        else if (event.code === "ArrowUp" && pl2.posY>0) {
            pl2.speedY = -1;
        }
    });

    document.addEventListener('keyup', function(event) {
        if (event.code === "ControlLeft") {
            pl1.speedY = 0;
        } 
        else if (event.code === "ShiftLeft") {
            pl1.speedY = 0;
        }
        if (event.code === "ArrowDown") {
            pl2.speedY = 0;
        } 
        else if (event.code === "ArrowUp") {
            pl2.speedY = 0;
        }
    });

    RAF(game);
}

function game() {
    pl1.posY += pl1.speedY;
    pl2.posY += pl2.speedY;
    if (pl1.posY>areaPlay.height-pl1.height) {pl1.posY = areaPlay.height-pl1.height; pl1.speedY = 0;}
    if (pl1.posY<0) {pl1.posY = 0; pl1.speedY = 0;}
    if (pl2.posY>areaPlay.height-pl2.height) {pl2.posY = areaPlay.height-pl2.height; pl2.speedY = 0;}
    if (pl2.posY<0) {pl2.posY = 0; pl2.speedY = 0;}

    ballPlay.posX+=ballPlay.speedX;
        // вылетел ли мяч правее стены?   ГОЛ!
        if ( ballPlay.posX+ballPlay.radius>=areaPlay.width ) {
            countPl1 += 1;
            counter.innerHTML = countPl1 + " : " + countPl2;
            ballPlay.speedX = 0;
            ballPlay.speedY = 0;
            ballPlay.posX -= 2;
            return cancelAnimationFrame(game);
        }
        //ОТБИЛ ПРАВЫЙ ИГРОК
        if ((ballPlay.posX+ballPlay.radius >= areaPlay.width-pl2.width)&&(ballPlay.posY>=pl2.posY)&&(ballPlay.posY<=pl2.posY+pl2.height)) {
            ballPlay.speedX=-ballPlay.speedX;
            ballPlay.posX=areaPlay.width-pl2.width-ballPlay.radius;
        }
        // вылетел ли мяч левее стены? ГОЛ!
        if ( ballPlay.posX-ballPlay.radius<=0 ) {
            countPl2 += 1;
            counter.innerHTML = countPl1 + " : " + countPl2;
            ballPlay.speedX = 0;
            ballPlay.speedY = 0;
            ballPlay.posX += 2;
            return cancelAnimationFrame(game);
        }
        //ОТБИЛ ЛЕВЫЙ ИГРОК
        if ((ballPlay.posX-ballPlay.radius <= pl1.width)&&(ballPlay.posY>=pl1.posY)&&(ballPlay.posY<=pl1.posY+pl1.height)) {
            ballPlay.speedX=-ballPlay.speedX;
            ballPlay.posX=pl1.width+ballPlay.radius;
        }
        ctx.clearRect(0, 0, areaPlay.width, areaPlay.height);
        ballPlay.posY+=ballPlay.speedY;
        // вылетел ли мяч ниже пола?
        if ( ballPlay.posY+ballPlay.radius>areaPlay.height ) {
            ballPlay.speedY=-ballPlay.speedY;
            ballPlay.posY=areaPlay.height-ballPlay.radius;
        }
        // вылетел ли мяч выше потолка?
        if ( ballPlay.posY-ballPlay.radius<0 ) {
            ballPlay.speedY=-ballPlay.speedY;
            ballPlay.posY=ballPlay.radius;
        }
    
   
    areaPlay.update();
    ballPlay.update();
    pl1.update();
    pl2.update();

    return RAF(game);
}