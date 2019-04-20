var c4 = function( p ){
    
p.setup= function() {
    let c4 = p.createCanvas(700, 500);
    c4.parent("gamebox");
    p.textAlign(p.CENTER);
    
  }
  let ballX = 250;
  let ballY = 250;
  let globalYSpeed = 5;
  let ballYSpeed = globalYSpeed;
  let globalXSpeed = 2;
  let ballXSpeed = globalXSpeed;
  let paddle1Y = 100;
  let paddle2Y = 100;
  let return1Strength, return2Strength;
  let paddleSpeed = 7.5;
  let globalSpeed = 4;
  let playerScore = [0, 0];
  let game4State = [true, false, false, false]
  
  p.draw=function() {
    if (game4State[0] === true) {
      intro4();
    }
    if (game4State[1] === true) {
      p.background(0)
  
      p.fill(225);
      
     
      borders();
      p.textSize(15);
      p.strokeWeight(5);
      p.stroke(175);
      p.noFill();
      p.ellipse(ballX, ballY, 25);
      p.fill(0);
      paddle(50, paddle1Y);
      paddle(650, paddle2Y);
      p.fill(0);
      p.text("W/S and UP and DOWN arrows to move. First to Ten wins!!", 350, 475);
      keyTyped();
      paddle2Move();
      scoring();
      p.fill(255);
      p.noStroke();
      p.textSize(30);
      p.text(playerScore[0], 75, 100);
      p.text(playerScore[1], 625, 100);
      paddleCollision();
      winning();
      ballX += ballXSpeed;
      ballY += ballYSpeed;
    }
    if (game4State[2] === true) {
      Player1won();
    }
    if (game4State[3] === true) {
      Player2won();
    }
  }
  
  function borders() {
    p.stroke(255);
    p.noFill();
    p.strokeWeight(15);
    p.line(350,0,350,600);
    p.ellipse(350,250,150);
    p.fill(255);
    p.noStroke();
    p.rect(-25,55,50,380);
    p.rect(675,55,50,380);
    p.fill(175);
    
    p.rect(0, 0, 700, 55);
    p.rect(0, 435, 700, 70);
    if (ballY > 420) {
      ballYSpeed = -globalSpeed;
    }
    if (ballY < 70) {
      ballYSpeed = globalSpeed;
    }
  }
  
  function scoring() {
    if (ballX < 0) {
      playerScore[1]++;
      ballX = 350;
      globalSpeed = 5;
      ballXSpeed = 5;
      ballYSpeed = 0;
      paddle1Y = 200;
      paddle2Y = 200;
      ballY = 250;
  
    }
    if (ballX > 700) {
      playerScore[0]++;
      ballX = 350;
      globalSpeed = 5;
      ballXSpeed = -5;
      ballYSpeed = 0;
      paddle1Y = 200;
      paddle2Y = 200;
      ballY = 250;
    }
  }
  
  function paddle(x, y) {
    p.fill(175);
    p.stroke(100);
    p.strokeWeight(2);
   p.rect(x, y, 10, 100);
  
  
  
  }
  
  function winning() {
    if (playerScore[0] > 9) {
      game4State[2] = true;
      game4State[1] = false;
    }
    if (playerScore[1] > 9) {
      game4State[3] = true;
      game4State[1] = false;
    }
  }
  
  function keyTyped() {
    if (p.keyIsDown(87) && paddle1Y > 70) {
      paddle1Y -= paddleSpeed;
    }
    if (p.keyIsDown(83) && paddle1Y + 100 < 420) {
      paddle1Y += paddleSpeed;
    }
  
  }
  
  function paddle2Move() {
    if (p.keyIsDown(p.UP_ARROW) && paddle2Y > 70) {
      paddle2Y -= paddleSpeed;
    }
    if (p.keyIsDown(p.DOWN_ARROW) && (paddle2Y + 100) < 420) {
      paddle2Y += paddleSpeed;
    }
  
  
  }
  
  function paddleCollision() {
    return1Strength = p.abs(ballY - (paddle1Y + 50)) / 50;
    return2Strength = p.abs(ballY - (paddle2Y + 50)) / 25;
  
    //Top Half of Paddle1
    if (ballX > 63 && ballX < 73 && ballY > paddle1Y - 13 && ballY < paddle1Y + 50) {
      ballXSpeed = globalXSpeed * return1Strength + 2;
      ballYSpeed = -globalYSpeed;
      ballX=70;
  
    }
    //Bottom Half of Paddle1
    if (ballX > 63 && ballX < 73 && ballY >= paddle1Y + 50 && ballY < paddle1Y + 113) {
      ballXSpeed = globalXSpeed * return2Strength + 2;
      ballYSpeed = globalYSpeed;
      ballX=70;
  
    }
    //Top Half of Paddle 2
    if (ballX < 652 && ballX > 642 && ballY > paddle2Y - 13 && ballY < paddle2Y + 50) {
      ballXSpeed = -(globalSpeed * return2Strength + 2);
      ballYSpeed = -globalSpeed;
        ballX=642;
    }
    //Bottom Half of Paddle 2
    if (ballX < 652 && ballX > 642 && ballY >= paddle2Y + 50 && ballY < paddle2Y + 113) {
      ballXSpeed = -(globalSpeed * return2Strength + 2);
      ballYSpeed = globalSpeed;
         ballX=642;
    }
  }
  
  function Player1won() {
    p.background(0);
    p.fill(255);
    p.textSize(49)
    p.text("Player 1 Won", 350, 250);
    p.textSize(25);
    p.text("Press Space for a Rematch", 350, 350);
  }
  
  function Player2won() {
    p.background(0);
    p.fill(255);
    p.text("Player 2 Won", 350, 250);
    p.textSize(25);
    p.text("Press Space for a Rematch", 350, 350);
  
  }
  
  function intro4() {
    p.background(0);
    p.fill(255);
    p.textSize(49)
    p.text("Paddle Ball Hit Game", 350, 250);
    p.rect(300, 400, 100, 50);
    p.fill(0);
    p.textSize(28)
    p.text("Play", 350, 437.5);
  }
  
  p.mouseReleased= function() {
    if (p.mouseX > 300 && p.mouseX < 400 && p.mouseY > 400 && p.mouseY < 450) {
      game4State[1] = true;
      game4State[0] = false;
    }
  }
  
    p.keyReleased= function() {
    if (p.keyCode === 32 && game4State[2] === true || p.keyCode === 32 && game4State[3]===true) {
      game4State[2] = false;
      game4State[3] = false;
      game4State[1] = true;
      playerScore[0] = 0;
      playerScore[1] = 0;
      ballX = 350;
      globalSpeed = 5;
      ballXSpeed = -5;
      ballYSpeed = 0;
      paddle1Y = 200;
      paddle2Y = 200;
      ballY = 250;
    }
  }







}