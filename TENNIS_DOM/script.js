"use strict";
var RAF=
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };
//РАЗМЕРЫ ИГРОВОГО ПОЛЯ
var areaPlay={
    width : 700,
    height : 400
}
//поле
var playFloor = document.createElement("div");
playFloor.style.position = "relative";
playFloor.style.backgroundColor = "yellow";
playFloor.style.width = areaPlay.width + "px";
playFloor.style.height = areaPlay.height + "px";
playFloor.style.border = "1px solid black";
document.body.appendChild(playFloor);
//мяч
var ball = document.createElement("div");
ball.style.position = "absolute";
ball.style.backgroundColor = "red";
ball.style.width = "30px";
ball.style.height = "30px";
ball.style.borderRadius = "50%";
playFloor.appendChild(ball);
ball.style.left = playFloor.getBoundingClientRect().width/2 - ball.offsetWidth/2 + "px";
ball.style.top = playFloor.getBoundingClientRect().height/2 - ball.offsetHeight/2 + "px";
//ОБЪЕКТ МЯЧ
var ballPlay={
    posX : playFloor.getBoundingClientRect().width/2 - ball.offsetWidth/2,
    posY : playFloor.getBoundingClientRect().height/2 - ball.offsetHeight/2,
    speedX : 2,
    speedY: 1,
    width : 30,
    height: 30,
    update : function() {
        ball.style.left=this.posX+"px";
        ball.style.top=this.posY+"px";
        }
    }

//игрок 1
var player1 = document.createElement("div");
player1.style.position = "absolute";
player1.style.backgroundColor = "blue";
player1.style.width = "15px";
player1.style.height = "100px";
playFloor.appendChild(player1);
player1.style.left = "0px";
player1.style.top = playFloor.getBoundingClientRect().height/2 - player1.offsetHeight/2 + "px";
//РАКЕТКА 1
var pl1={
    posY : playFloor.getBoundingClientRect().height/2 - player1.offsetHeight/2,
    speedY: 5,
    update : function() {
        player1.style.top=this.posY+"px";
        }
    }
    
//игрок 2
var player2 = document.createElement("div");
player2.style.position = "absolute";
player2.style.backgroundColor = "green";
player2.style.width = "15px";
player2.style.height = "100px";
playFloor.appendChild(player2);
player2.style.left = playFloor.getBoundingClientRect().width - player2.offsetWidth + "px";
player2.style.top = playFloor.getBoundingClientRect().height/2 - player2.offsetHeight/2 + "px";
//РАКЕТКА 2
var pl2={
    posY : playFloor.getBoundingClientRect().height/2 - player2.offsetHeight/2,
    speedY: 5,
    update : function() {
        player2.style.top=this.posY+"px";
        }
    }

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
    ballPlay.posX = playFloor.getBoundingClientRect().width/2 - ball.offsetWidth/2;
    ballPlay.posY = playFloor.getBoundingClientRect().height/2 - ball.offsetHeight/2;
    ballPlay.speedX = 2;
    ballPlay.speedY = 1;
    pl1.posY = playFloor.getBoundingClientRect().height/2 - player1.offsetHeight/2;
    pl2.posY = playFloor.getBoundingClientRect().height/2 - player2.offsetHeight/2;
    //УПРАВЛЕНИЕ РАКЕТКАМИ ИГРОКОВ
    document.addEventListener('keydown', function(event) {
        if (event.code == "KeyZ" && pl1.posY<(playFloor.getBoundingClientRect().height - player1.getBoundingClientRect().height)) {
            pl1.posY += pl1.speedY;
            if (pl1.posY>(playFloor.getBoundingClientRect().height - player1.getBoundingClientRect().height)) pl1.posY = playFloor.getBoundingClientRect().height - player1.getBoundingClientRect().height
        } 
        else if (event.code == "KeyA" && pl1.posY>0) {
            pl1.posY -= pl1.speedY;
            if (pl1.posY<0) pl1.posY = 0;
        }
        if (event.code == "ArrowDown" && pl2.posY<(playFloor.getBoundingClientRect().height - player2.getBoundingClientRect().height)) {
            pl2.posY += pl2.speedY;
            if (pl2.posY>(playFloor.getBoundingClientRect().height - player2.getBoundingClientRect().height)) pl2.posY = playFloor.getBoundingClientRect().height - player1.getBoundingClientRect().height
        } 
        else if (event.code == "ArrowUp" && pl2.posY>0) {
            pl2.posY -= pl2.speedY;
            if (pl2.posY<0) pl2.posY = 0;
        }
        pl1.update();
        pl2.update();
    });
    pl1.update();
    pl2.update();
    RAF(game);
}

function game() {
    ballPlay.posX+=ballPlay.speedX;
        // вылетел ли мяч правее стены?   ГОЛ!
        if ( ballPlay.posX+ballPlay.width>areaPlay.width ) {
            countPl1 += 1;
            counter.innerHTML = countPl1 + " : " + countPl2;
            ballPlay.speedX = 0;
            ballPlay.speedY = 0;
            ballPlay.posX -= 2;
            return cancelAnimationFrame(game);
        }
        //ОТБИЛ ПРАВЫЙ ИГРОК
        if ((ballPlay.posX+ballPlay.width >= areaPlay.width-player2.offsetWidth)&&(ballPlay.posY>=pl2.posY-ballPlay.height/2)&&(ballPlay.posY<=pl2.posY+player2.offsetHeight+ballPlay.height/2)) {
            ballPlay.speedX=-ballPlay.speedX;
            ballPlay.posX=areaPlay.width-player2.offsetWidth-ballPlay.width;
        }
        // вылетел ли мяч левее стены? ГОЛ!
        if ( ballPlay.posX<0 ) {
            countPl2 += 1;
            counter.innerHTML = countPl1 + " : " + countPl2;
            ballPlay.speedX = 0;
            ballPlay.speedY = 0;
            ballPlay.posX += 2;
            return cancelAnimationFrame(game);
        }
        //ОТБИЛ ЛЕВЫЙ ИГРОК
        if ((ballPlay.posX <= player2.offsetWidth)&&(ballPlay.posY>=pl1.posY-ballPlay.height/2)&&(ballPlay.posY<=pl1.posY+player1.offsetHeight+ballPlay.height/2)) {
            ballPlay.speedX=-ballPlay.speedX;
            ballPlay.posX=player2.offsetWidth;
        }

        ballPlay.posY+=ballPlay.speedY;
        // вылетел ли мяч ниже пола?
        if ( ballPlay.posY+ballPlay.height>areaPlay.height ) {
            ballPlay.speedY=-ballPlay.speedY;
            ballPlay.posY=areaPlay.height-ballPlay.height;
        }
        // вылетел ли мяч выше потолка?
        if ( ballPlay.posY<0 ) {
            ballPlay.speedY=-ballPlay.speedY;
            ballPlay.posY=0;
        }

    ballPlay.update();

    return RAF(game);
}
