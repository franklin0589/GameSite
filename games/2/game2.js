let paststep=["H"];
let intro = true;
let game = false;
let win= false;
let lose=false;
let walk=false;
let finalWin=false;
let instructions=false;
let stepdist=20;
let levelNum=1;
let lostCounter=0;
function setup() {
    
    let c2 = createCanvas(500,500);
    c2.parent("gamebox");
  	textAlign(CENTER);
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
        background(0,124,134);
        textSize(50);
        fill(0,255,0);
        text("Run",250,200);
      	textSize(15);
      	text("Press Space to Play",250,275);
      	text("Press Control for instructions",250,300);
      	if(instructions===true){
        	text("Repeatedly Press J and H \nin sequence, starting with J \nto take steps forward and try to \nwin the race",250,325);
        }
    },
    gaming:function (){
         background("blue");
         textSize(18);
         fill(0);
         if(levelNum===1){
      		text("Press J and H to Run. Don't trip!",250,50);
      	 
         }
      	text("Level: " + levelNum,450,75);
         ground.draw();
         road.draw();
         stripes.draw();
         finishLine.draw();
         enemy.draw();
         char.walking();
         
         enemy.x+=2;
         if(step===true){
             road.x-=stepdist;
             enemy.x-=stepdist;
             stripes.x-=stepdist;
             finishLine.x-=stepdist;
             step=false;
         }
         if(char.x+75>finishLine.x&&lose===false&&levelNum<4){
            game=false; 
            win=true;
         }
      	if(char.x+75>finishLine.x&&lose===false&&levelNum>=4){
            game=false; 
            finalWin=true;
         }
         if(enemy.x+75>finishLine.x&&win===false){
            game=false; 
            lose=true;
            lostCounter++;
         }
        },
    won:function(){
        background("white");
        textSize(50);
        fill(200,200,0);
        text("Good Job",250,200);
       	textSize(20);
        text("Press Space to Next Level",250,300);     
    },
    lost:function(){
        background("black")
        textSize(50);
        fill("red");
        text("You lost",250,200);
        textSize(20);
        text("Press Space to Restart",250,300);                                                   
    },
  	finalWin:function(){
    	background("white");
        textSize(50);
        fill(200,200,0);
        text("You WIN!!!",250,200);
       	textSize(20);
        text("You only lost " + lostCounter+" times \n You can try again for a better score",250,300);     
    
    
    }
    
    
}
function draw(){
    //Game Display
  	if(intro===true){
      gameState.intro();
    }
    if(game===true){
      gameState.gaming();
    }
    if(lose===true){
  		gameState.lost();
		}
		if(win===true){
  		gameState.won();
  
    }
  	if(finalWin===true){
  		gameState.finalWin();
    }
}

function keyReleased() {
  	if (keyCode === 17&&intro==true) {
        instructions=true;
    }   
    //Lose
        if (keyCode === 74&&paststep[0]==="J"||keyCode === 72&&paststep[0]==="H") {
            game=false;
        lose=true;
        lostCounter++;
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
   //Space
    if(keyCode ===32&&lose===true||keyCode ===32&&intro===true){
        game=true;
      	intro=false;
        lose=false;
        road.x=0;
        enemy.x=0;
        stripes.x=0;
        finishLine.x=road.x+road.length;
    }
  	if(keyCode ===32&&win===true){
        game=true;
      	win=false;
        lose=false;
        road.x=0;
        enemy.x=0;
        stripes.x=0;
      	paststep=["H"];
        finishLine.x=road.x+road.length;
    		stepdist= stepdist-3;
      	levelNum=levelNum+1;
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