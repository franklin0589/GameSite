
function setup() {
    let c4 = createCanvas(700, 500);
    textAlign(CENTER);
    
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
  
  function draw() {
    if (game4State[0] === true) {
      intro4();
    }
    if (game4State[1] === true) {
      background(0)
  
      fill(225);
      
     
      borders();
      textSize(15);
      strokeWeight(5);
      stroke(175);
      noFill();
      ellipse(ballX, ballY, 25);
      fill(0);
      paddle(50, paddle1Y);
      paddle(650, paddle2Y);
      fill(0);
      text("W/S and UP and DOWN arrows to move. First to Ten wins!!", 350, 475);
      keyTyped();
      paddle2Move();
      scoring();
      fill(255);
      noStroke();
      textSize(30);
      text(playerScore[0], 75, 100);
      text(playerScore[1], 625, 100);
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
    stroke(255);
    noFill();
    strokeWeight(15);
    line(350,0,350,600);
    ellipse(350,250,150);
    fill(255);
    noStroke();
    rect(-25,55,50,380);
    rect(675,55,50,380);
    fill(175);
    
    rect(0, 0, 700, 55);
    rect(0, 435, 700, 70);
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
    fill(175);
    stroke(100);
    strokeWeight(2);
    rect(x, y, 10, 100);
  
  
  
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
    if (keyIsDown(87) && paddle1Y > 70) {
      paddle1Y -= paddleSpeed;
    }
    if (keyIsDown(83) && paddle1Y + 100 < 420) {
      paddle1Y += paddleSpeed;
    }
  
  }
  
  function paddle2Move() {
    if (keyIsDown(UP_ARROW) && paddle2Y > 70) {
      paddle2Y -= paddleSpeed;
    }
    if (keyIsDown(DOWN_ARROW) && (paddle2Y + 100) < 420) {
      paddle2Y += paddleSpeed;
    }
  
  
  }
  
  function paddleCollision() {
    return1Strength = abs(ballY - (paddle1Y + 50)) / 50;
    return2Strength = abs(ballY - (paddle2Y + 50)) / 25;
  
    //Top Half of Paddle1
    if (ballX > 63 && ballX < 73 && ballY > paddle1Y - 13 && ballY < paddle1Y + 50) {
      ballXSpeed = globalXSpeed * return1Strength + 2;
      ballYSpeed = -globalYSpeed;
      ballX=70;
  
    }
    //Bottom Half of Paddle1
    if (ballX > 63 && ballX < 73 && ballY >= paddle1Y + 50 && ballY < paddle1Y + 113) {
      ballXSpeed = globalXSpeed * return1Strength + 2;
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
    background(0);
    fill(255);
    textSize(49)
    text("Player 1 Won", 350, 250);
    textSize(25);
    text("Press Space for a Rematch", 350, 350);
  }
  
  function Player2won() {
    background(0);
    fill(255);
    textSize(49)
    text("Player 2 Won", 350, 250);
    textSize(25);
    text("Press Space for a Rematch", 350, 350);
  
  }
  
  function intro4() {
    background(0);
    fill(255);
    textSize(49)
    text("Paddle Ball Hit Game", 350, 250);
    rect(300, 400, 100, 50);
    fill(0);
    textSize(28)
    text("Play", 350, 437.5);
  }
  
  function mouseReleased() {
    if (mouseX > 300 && mouseX < 400 && mouseY > 400 && mouseY < 450) {
      game4State[1] = true;
      game4State[0] = false;
    }
  }
  
  function keyReleased() {
    if (keyCode === 32 && gameState[2] === true || keyCode === 32 && gameState[3]===true) {
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
