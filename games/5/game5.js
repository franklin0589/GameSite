function obstaclespawner(){
    this.obstacles=[];
    this.spawndelay=0;
    this.difficulty=1;
    this.spawn=function(){
        if(this.spawndelay>=500){
        this.obstacles.push(new obstacle());
        this.spawndelay=0;
        }
        for(i=0;i<this.obstacles.length;i++){
            this.obstacles[i].draw();
            this.obstacles[i].move();
        }
        this.spawndelay+=this.difficulty;
        this.difficulty+=0.001;
            
    }
    this.destroy=function(){
        for(i=0;i<this.obstacles.length;i++){
        if(this.obstacles[i].y<0){
            this.obstacles.shift();
        }
    }
    }
}
function obstacle(){
    this.dist=Math.floor(Math.random()*50)+50;
    this.x = 1050;
    this.y = 450;
    this.accel=0.25;
    this.velocity=0;
    this.move = function(){
        this.x-= this.velocity;
        this.velocity+=this.accel;
    }
    this.draw=function(){
        fill(255,0,0);
        stroke(255,0,255)
        strokeWeight(5);
        line(this.x,this.y-this.dist,this.x,this.y);
        noStroke();
    }
}
function clouds(speed,height,fluff){
    this.x = 1050;
    this.y = 50;
    this.draw=function(){
        fill(225);
        ellipse(this.x-50,this.y*height,100,fluff*5+25);
        ellipse(this.x,this.y*height,100,25+5*fluff);
        ellipse(this.x+50,this.y*height,100,25+5*fluff);
    }
    this.move= function(){
        this.x-= 3*1/height;
        if(this.x<-50){
            this.x=1050;
        }
    }
}
function jumper(){
    this.x = 150;
    this.y = 380;
    this.delta =0;
    this.jumped=false;
    this.falling=false;
    this.ground=false;
    this.velocity=0;
    this.show =function(){
        fill('red');
        rect(this.x,this.y,70,70);
    }
    this.gravity=function(){
        this.y+=this.velocity;
        this.velocity+=4;
        if(this.y>380){
            this.ground=true;
            this.velocity= 0;
            this.y=380;
        }

    }
    this.jump= function(){
        if(this.ground===true&&keyIsDown(32)&&this.y>200&&delay<15){
            this.jumped=true;
            this.velocity= -10;
            delay++;
        }
        if(!keyIsDown(32)){
            this.ground=false;
            delay=0;
        }
    }
}
function stripes(i){
    this.x = 200*i;
    this.y = 425;
    this.draw=function(){
        fill(225,225,0);
        rect(this.x,this.y,75,10);
    };
    this.move= function(){
        this.x-= 5;
        if(this.x<-50){
            this.x=1100;
        }
    }
}
var startbutton;
var restartbutton;
function setup(){
    let canvas = createCanvas(1000,600);
    canvas.parent("gamebox");
    startbutton = createButton('Start');
   
    
}
const player= new jumper();
const cloud= [];
const stripe=[];
const spawner= new obstaclespawner();
let score=0;
let game =[true,false,false,false,false];
for(i=0;i<5;i++){
    const speed=Math.floor(Math.random()*4)+1;
    const height=Math.floor(Math.random()*4)+1;
    const fluff=Math.floor(Math.random()*4)+1;
    cloud.push(new clouds(speed,height,fluff));
}
for(i=0;i<6;i++){
    stripe.push(new stripes(i));
}
function draw(){
    noStroke();
    if(game[0]===true){
        startScreen();
    }
    if(game[2]===true){
        loseScreen();
    }
    if(game[1]===true){
        inGame();
    }
}

function startScreen(){
        background('lightgreen')
        textSize(36);
        text("Hopper",450,275);
        startbutton.position(650, 650);
       startbutton.size(50,50);
        startbutton.mouseReleased(function(){
            game[0]=false;
            game[1]=true;
            startbutton.remove();
        });
}
function loseScreen(){
    background('lightgreen')
    textSize(36);
    text("Your Score is "+Math.floor(score),375,275);
    const restartbutton= createButton("restart");
    restartbutton.position(650, 650);
    restartbutton.size(80,50);
    restartbutton.mouseReleased(function(){
        spawner.difficulty=1;
        spawner.obstacles=[];
        spawner.spawndelay=0;
        score=0;
        game[2]=false;
        game[1]=true;
        removeElements();
        loop();
    });
    noLoop();
}
function inGame(){
    background("blue");
    //ground
    fill('green')
    rect(0,375,1000,225);
    //road
    fill(0)
    rect(0,390,1000,100);
    for(i=0;i<5;i++){
    cloud[i].move();
    cloud[i].draw();
    }
    for(i=0;i<stripe.length;i++){
        stripe[i].move();
        stripe[i].draw();
    }
    player.show();
    player.jump();
    player.gravity();
    spawner.spawn();
    spawner.destroy();
    score+=0.01;
    text(`${Math.floor(score)}`,825,75);
    for(i=0;i<spawner.obstacles.length;i++){
    if(spawner.obstacles[i].x>player.x-70&&spawner.obstacles[i].x<player.x&&spawner.obstacles[i].y-spawner.obstacles[i].dist<player.y+70){
        game[1]=false;
        game[2]=true;
    }
}
    
}