function setup(){
    let canvas =createCanvas(700,500);
    canvas.parent('gamebox');
}
let ballX=250;
let ballY=250;
let globalYSpeed=2;
let ballYSpeed= globalYSpeed;
let globalXSpeed=2;
let ballXSpeed= globalXSpeed;
let paddle1Y=100;
let paddle2Y=100;
let paddleSpeed=5;
let playerScore=[0,0];
let gameState=[true,false,false,false]
function draw(){
if(gameState[0]===true){
intro();
}
if(gameState[1]===true){
    globalXSpeed=random(2)+3;
    globalYSpeed=random(2)+3;
    background(0)

    fill(225);
    ellipse(ballX,ballY,25);
    paddle(50,paddle1Y);
    paddle(650,paddle2Y);
    borders();
    textSize(25);
    fill(0);
    text("W/S and UP and DOWN arrows to move. First to Ten wins!!",25,475);
    keyTyped();
    paddle2Move();
    scoring();
    fill(255);
    noStroke();
    textSize(30);
    text(playerScore[0],75,100);
    text(playerScore[1],625,100);
    paddleCollision();
    winning();
    ballX+=ballXSpeed;
    ballY+=ballYSpeed;
}
if(gameState[2]===true){
    Player1won();
}
if(gameState[3]===true){
    Player2won();
}
}
function borders(){
    fill(225);
    noStroke();
    rect(0,0,700,55);
    rect(0,435,700,70);
    if(ballY>420){
        ballYSpeed=-globalYSpeed;
    }
    if(ballY<70){
        ballYSpeed=globalYSpeed;
    }
}
function scoring(){
    if(ballX<0){
        playerScore[1]++;
        ballX=350;
        ballY=250;
        
    }
    if(ballX>700){
        playerScore[0]++;
        ballX=350;
        ballY=250;
    }
}

function paddle(x,y){
    stroke(225);
    strokeWeight(12);
    line(x,y,x,y+100);
    
    

}
function winning(){
    if(playerScore[0]>9){
        gameState[2]=true;
        gameState[1]=false;
    }
    if(playerScore[1]>9){
        gameState[3]=true;
        gameState[1]=false;
    }
}
function keyTyped(){
    if(keyIsDown(87)&&paddle1Y>70){
        paddle1Y-=paddleSpeed;
    }
    if(keyIsDown(83)&&paddle1Y+100<420) {
        paddle1Y+=paddleSpeed;
    }

}
function paddle2Move(){
    if(keyIsDown(UP_ARROW)&&paddle2Y>70){
        paddle2Y-=paddleSpeed;
    }
    if(keyIsDown(DOWN_ARROW)&&(paddle2Y+100)<420){
        paddle2Y+=paddleSpeed;
    }
   

}
function paddleCollision(){
    if(ballX>37.5&&ballX<62.5&&ballY>paddle1Y&&ballY<paddle1Y+100){
        ballXSpeed=globalXSpeed;
    }
    if(ballX<662.5&&ballX>637.5&&ballY>paddle2Y&&ballY<paddle2Y+100){
        ballXSpeed= -globalXSpeed;
    }
}
function Player1won(){
    background(0);
    fill(255);
    textSize(49)
    text("Player 1 Won",200,250);
}
function Player2won(){
    background(0);
    fill(255);
    textSize(49)
    text("Player 2 Won",200,250); 
}
function intro(){
    background(0);
    fill(255);
    textSize(49)
    text("PONG",300,250);
    rect(287,400,150,50);
    fill(0);
    textSize(28)
    text("play",337.5,437.5);
}
function mouseReleased(){
    if(mouseX>287&&mouseX<287+150&&mouseY>400&&mouseY<450){
        gameState[1]= true;
        gameState[0]=false;
    }
}