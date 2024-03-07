"use strict"

let getState = 0;
let fontSizeText = 16;
let btnWidth = 70;
let btnHeight = 20;
let leftScore = 0;
let rightScore = 0;
let fieldStroke = 1;

let field = {
    width : 500,
    height : 300,
}

let leftRacquet = {
    posY : field.height/2-90/2+fieldStroke,
    speedY : 0,
    width : 10,
    height: 90,
    update : function() {
        leftRacquetElem.setAttribute("y", this.posY);
    }
}

let rightRacquet = {
    posY : field.height/2-90/2+fieldStroke,
    speedY : 0,
    width : 10,
    height: 90,
    update : function() {
        rightRacquetElem.setAttribute("y", this.posY);
    }
}

let ball={
    posX : field.width/2+fieldStroke,
    posY : field.height/2+fieldStroke,
    speedX : 0,
    speedY : 0,
    radius : 15,
    update : function() {
        ballElem.setAttribute("cx", this.posX);
        ballElem.setAttribute("cy", this.posY);
    }
}

//построение SVG
let SVGElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
SVGElem.setAttribute("width", field.width+fieldStroke*2);
SVGElem.setAttribute("height", fontSizeText*2);
SVGElem.setAttribute("viewBox",`0 0 ${field.width+fieldStroke*2} ${fontSizeText*2}`);
document.body.appendChild(SVGElem);

//построение кнопки
let btn = document.createElementNS("http://www.w3.org/2000/svg",'rect');
btn.setAttribute("width", btnWidth);
btn.setAttribute("height", btnHeight);
btn.setAttribute("fill","lightgrey");
SVGElem.appendChild(btn);

//построение текста кнопки
let textElem = document.createElementNS("http://www.w3.org/2000/svg",'text');
textElem.setAttribute("font-family","sans-serif");
textElem.setAttribute("font-size", fontSizeText);
textElem.setAttribute("fill","black");
textElem.setAttribute("text-anchor","middle");
textElem.setAttribute("x", btnWidth/2);
textElem.setAttribute("y", btnHeight*0.75);
textElem.setAttribute("style", "cursor: default");
textElem.textContent=`${"Старт!"}`;
SVGElem.appendChild(textElem);

//построение счета
let scoreElem = document.createElementNS("http://www.w3.org/2000/svg",'text');
scoreElem.setAttribute("font-family","sans-serif");
scoreElem.setAttribute("font-size", fontSizeText*2);
scoreElem.setAttribute("fill","black");
scoreElem.setAttribute("text-anchor","middle");
scoreElem.setAttribute("x",`${field.width/2}`);
scoreElem.setAttribute("y", fontSizeText*2);
scoreElem.textContent=`${leftScore}:${rightScore}`;
SVGElem.appendChild(scoreElem);

//построение SVG поля
let svgField = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgField.setAttribute("width", field.width+fieldStroke*2);
svgField.setAttribute("height", field.height+fieldStroke*2);
svgField.setAttribute("viewBox",`0 0 ${field.width+fieldStroke*2} ${field.height+fieldStroke*2}`);
svgField.setAttribute("style", "display: block");
document.body.appendChild(svgField);

//построение поля
let fieldElem = document.createElementNS("http://www.w3.org/2000/svg",'rect');
fieldElem.setAttribute("x", fieldStroke);
fieldElem.setAttribute("y", fieldStroke);
fieldElem.setAttribute("width", field.width);
fieldElem.setAttribute("height", field.height);
fieldElem.setAttribute("fill","#F0EE7E");
fieldElem.setAttribute("stroke-width", fieldStroke);
fieldElem.setAttribute("stroke","black");
svgField.appendChild(fieldElem);

//построение левой ракетки 
let leftRacquetElem = document.createElementNS("http://www.w3.org/2000/svg",'rect');
leftRacquetElem.setAttribute("x", fieldStroke);
leftRacquetElem.setAttribute("y", leftRacquet.posY);
leftRacquetElem.setAttribute("width", leftRacquet.width);
leftRacquetElem.setAttribute("height", leftRacquet.height);
leftRacquetElem.setAttribute("fill","#09AA57");
svgField.appendChild(leftRacquetElem);

//построение правой ракетки 
let rightRacquetElem = document.createElementNS("http://www.w3.org/2000/svg",'rect');
rightRacquetElem.setAttribute("x", fieldStroke+field.width-leftRacquet.width);
rightRacquetElem.setAttribute("y", rightRacquet.posY);
rightRacquetElem.setAttribute("width", rightRacquet.width);
rightRacquetElem.setAttribute("height", rightRacquet.height);
rightRacquetElem.setAttribute("fill","#191497");
svgField.appendChild(rightRacquetElem);

//построение мяча
let ballElem = document.createElementNS("http://www.w3.org/2000/svg",'circle');
ballElem.setAttribute("r", ball.radius);
ballElem.setAttribute("cx", ball.posX);
ballElem.setAttribute("cy", ball.posY);
ballElem.setAttribute("fill","#F02137");
svgField.appendChild(ballElem);

function tennis() {
    leftRacquet.posY+=leftRacquet.speedY;
    rightRacquet.posY+=rightRacquet.speedY;
    ball.posX+=ball.speedX;
    ball.posY+=ball.speedY;

    if ( leftRacquet.posY+leftRacquet.height > field.height+fieldStroke ) {
        leftRacquet.speedY = 0;
        leftRacquet.posY = field.height+fieldStroke-leftRacquet.height;
    } else if ( leftRacquet.posY < fieldStroke ) {  
        leftRacquet.speedY = 0;
        leftRacquet.posY = fieldStroke;
    } else if ( rightRacquet.posY+rightRacquet.height > field.height+fieldStroke ) {
        rightRacquet.speedY = 0;
        rightRacquet.posY = field.height+fieldStroke-rightRacquet.height;
    } else if ( rightRacquet.posY < fieldStroke ) {
        rightRacquet.speedY = 0;
        rightRacquet.posY = fieldStroke;
    }

    if ( ball.posX+ball.radius > fieldStroke+field.width-rightRacquet.width && 
         ( ball.posY > rightRacquet.posY &&
           ball.posY < (rightRacquet.posY+rightRacquet.height) ) 
        ) {
            ball.speedX=-ball.speedX;
            ball.posX=fieldStroke+field.width-rightRacquet.width-ball.radius;
    } else if ( ball.posX-ball.radius < fieldStroke+leftRacquet.width && 
         ( ball.posY > leftRacquet.posY && 
           ball.posY < (leftRacquet.posY+leftRacquet.height) ) 
        ) {
            ball.speedX=-ball.speedX;
            ball.posX=fieldStroke+leftRacquet.width+ball.radius;
    } else if ( ball.posX+ball.radius > fieldStroke+field.width ) {
            ball.posX=fieldStroke+field.width-ball.radius;
            ball.speedX = 0;
            ball.speedY = 0;
            leftRacquet.speedY = 0; 
            rightRacquet.speedY = 0;
            leftScore++;
            scoreElem.innerHTML=`${leftScore}:${rightScore}`;
            btn.addEventListener("click", start);
            textElem.addEventListener("click", start);
            getState = 0;
    } else if ( ball.posX-ball.radius<fieldStroke ) {
            ball.posX = ball.radius+fieldStroke;
            ball.speedX = 0;
            ball.speedY = 0; 
            leftRacquet.speedY = 0; 
            rightRacquet.speedY = 0;
            rightScore++;
            scoreElem.innerHTML=`${leftScore}:${rightScore}`;
            btn.addEventListener("click", start);
            textElem.addEventListener("click", start);
            getState = 0;
    } else if ( ball.posY+ball.radius > fieldStroke+field.height ) {
        ball.speedY=-ball.speedY;
        ball.posY=fieldStroke+field.height-ball.radius;
    } else if ( ball.posY-ball.radius < fieldStroke ) {
        ball.speedY=-ball.speedY;
        ball.posY=fieldStroke+ball.radius;
    }

    leftRacquet.update();
    rightRacquet.update();
    ball.update();
}

function keydownFunc(eo) {
    if (eo.key === "Shift" && getState === 1) {
        leftRacquet.speedY = -1;
    } else if (eo.key === "Control" && getState === 1) {
        leftRacquet.speedY = 1;
    } else if (eo.key === "ArrowUp" && getState === 1) {
        rightRacquet.speedY = -1;
    } else if (eo.key === "ArrowDown" && getState === 1) {
        rightRacquet.speedY = 1;
    } 
}

function keyupFunc(eo) {
    if (eo.key === "Shift") {
        leftRacquet.speedY = 0;
    } else if (eo.key === "Control") {
        leftRacquet.speedY = 0;
    } else if (eo.key === "ArrowUp") {
        rightRacquet.speedY = 0;
    } else if (eo.key === "ArrowDown") {
        rightRacquet.speedY = 0;
    }
}

function start() {
    getState = 1;
    btn.removeEventListener("click", start);
    textElem.removeEventListener("click", start);
    ball.posX = field.width/2;
    ball.posY = field.height/2;

    do {
        ball.speedX = Math.floor((Math.random() - 0.5) * 10);
    } while ( ball.speedX === 0 );
    do {
        ball.speedY = Math.floor((Math.random() - 0.5) * 10);
    } while ( ball.speedY === 0 );
}

window.addEventListener("keydown", keydownFunc);
window.addEventListener("keyup", keyupFunc);

btn.addEventListener("click", start);
textElem.addEventListener("click", start);

setInterval(tennis,60);


    