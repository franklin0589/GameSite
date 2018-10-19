let paststep=["H"];
let game= true;
let win=false;
let lose=false;
let walk=false;
function setup() {
    const canvas = createCanvas(500,500);
    canvas.parent("gamebox");
}
let step = false;

let char ={
    x:50,
    y:210,
    draw: function(){
        fill(225,0,0);
        rect(this.x,this.y,75,175);
    },
    walking: function(){
        stroke(255,0,255);
        if(walk===true){
        walking(this.x,this.y);
    }   
    else{
    standing(this.x,this.y);
    }
},
   
 
}
let ground={
    x:0,
    y:300,
    draw: function(){
        fill("green");
        rect(this.x,this.y,500,300)     
    }
    
}
let road={
    x:0,
    y:325,
    length:1000,
    draw:function(){
        fill("black");
        rect(this.x,this.y,this.length,50);
    }
}

let stripes={
    x:road.x,
    y:345,
    length:30,
    numberStripes:75,
    width:10,
    draw:function(){
        fill("white"); 
        for(i=0;i<road.length/this.numberStripes;i++)
        rect(i*this.numberStripes+this.x, this.y,this.length,this.width);                         
    }
}
let enemy = {
    x:50,
    y:185,
    draw: function(){
        stroke(225,225,0);
    p=0;
        if(p%5===0){
            walking(this.x,this.y);
        }
        else{
        standing(this.x,this.y);
        }
    p+=1;
    },
    a:this.x+75,
    b:this.y+175
}

let finishLine={
    x:road.x+road.length,    
    y:325,
    length:40,
    draw:function(){
        fill("yellow");
        rect(this.x,this.y,this.length,50);
    }        
}  
let gameState={
    intro: function(){
        background("green");
        
    },
    gaming:function (){
         background("blue");
         textSize(18);
         fill(0);
         text("Press J and H to Run. Don't trip!",100,50);
         ground.draw();
         road.draw();
         stripes.draw();
         finishLine.draw();
         enemy.draw();
         char.walking();
         
         enemy.x+=2;
         if(step===true){
             road.x-=10;
             enemy.x-=10;
             stripes.x-=10;
             finishLine.x-=10;
             step=false;
         }
         if(char.x+75>finishLine.x&&lose===false){
            game=false; 
            win=true;
         }
         if(enemy.x+75>finishLine.x&&win===false){
            game=false; 
            lose=true;
         }
        },
    won:function(){
        background("white");
        textSize(50);
        fill("yellow");
        text("You won",150,200);
    },
    lost:function(){
        background("black")
        textSize(50);
        fill("red");
        text("You lost",150,200);
        textSize(20);
        text("Press Space to Restart",150,300);                                                   
    }    
    
    
}
function draw(){
    //Game Display
    if(game===true){
        gameState.gaming()
    }
    if(lose===true){
  gameState.lost();
}
if(win===true){
  gameState.won();
  
}
}

function keyReleased() {
    //Lose
        if (keyCode === 74&&paststep[0]==="J"||keyCode === 72&&paststep[0]==="H") {
            game=false;
        lose=true;
    }
    
    //J
    if (keyCode === 74&&paststep[0]==="H") {
        step=true;
        walk=true;
        paststep.pop();
        paststep.push("J");
    }   
    //H
    if (keyCode === 72&&paststep[0]==="J") {
        walk=false;
        step=true;
        paststep.pop();
        paststep.push("H");
    }
    if(keyCode ===32&&lose===true){
        game=true;
        lose=false;
        road.x=0;
        enemy.x=0;
        stripes.x=0;
        finishLine.x=road.x+road.length;
    }
}

function     walking(x,y){
    noFill();
    strokeWeight(5);
//Head
ellipse(x,y,50);
//Body
line(x,y+25,x,y+100);
//LeftArm
line(x,y+35,x-15,y+60);
line(x-15,y+60,x-5,y+70);
//RightArm
line(x,y+35,x+10,y+70);
line(x+10,y+70,x+25,y+35);
//RigtLeg
line(x,y+100,x+25,y+125);
line(x+25,y+155,x+25,y+125);
//LeftLeg
line(x,y+100,x-5,y+125);
line(x-5,y+125,x-25,y+155);
strokeWeight(1);
stroke(0);
}
function standing(x,y){
    noFill();
  strokeWeight(5);
//Head
ellipse(x,y,50);
//Body
line(x,y+25,x,y+100);
//LeftArm
line(x,y+35,x-15,y+80);

//RightArm
line(x,y+35,x+15,y+80);

//RigtLeg
line(x,y+100,x+15,y+155);
//LeftLeg
line(x,y+100,x-15,y+155);
strokeWeight(1);
stroke(0);
}