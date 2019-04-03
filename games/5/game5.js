
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
function stripes5(i){
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
    let c5 = createCanvas(1000,600);
    c5.parent("gamebox");
    textAlign(CENTER);
    
    
}
let player5= new jumper();
let cloud= [];
let stripe=[];
let spawner= new obstaclespawner();
let score5=0;
let game5 =[true,false,false,false,false];
for(i=0;i<5;i++){
    let speed=Math.floor(Math.random()*4)+1;
    let height=Math.floor(Math.random()*4)+1;
    let fluff=Math.floor(Math.random()*4)+1;
    cloud.push(new clouds(speed,height,fluff));
}
for(i=0;i<6;i++){
    stripe.push(new stripes5(i));
}
function draw(){
    noStroke();
    if(game5[0]===true){
        startScreen();
    }
    if(game5[2]===true){
        loseScreen();
    }
    if(game5[1]===true){
        ingame5();
    }
}

function startScreen(){
        background('lightgreen')
        textSize(36);

        text("Hopper",500,275);
        textSize(24);
        text("Press to Start",500,350);
        
}
function mouseReleased(){
    if(game5[0]===true){
    game5[0]=false;
    game5[1]=true;
    }
    if(game5[2]){
        spawner.difficulty=1;
        spawner.obstacles=[];
        spawner.spawndelay=0;
        score5=0;
        game5[2]=false;
        game5[1]=true;
        loop();  
    }
}
function loseScreen(){
    background(255,220,220)
    textSize(36);
    fill(255,0,0);
    strokeWeight(8);
    text("Your Score is "+Math.floor(score5),500,275);
    text(`Click to restart`,500,350);
    noLoop();
}
function ingame5(){
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
    player5.show();
    player5.jump();
    player5.gravity();
    spawner.spawn();
    spawner.destroy();
    score5+=0.01;
    stroke(6);
    fill(255);
    strokeWeight(8);
    textSize(40);
    text(`${Math.floor(score5)}`,825,75);
    
    for(i=0;i<spawner.obstacles.length;i++){
    if(spawner.obstacles[i].x>player5.x-70&&spawner.obstacles[i].x<player5.x&&spawner.obstacles[i].y-spawner.obstacles[i].dist<player5.y+70){
        game5[1]=false;
        game5[2]=true;
    }
}
    
}
