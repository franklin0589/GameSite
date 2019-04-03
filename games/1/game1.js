function setup() {
    let c1=createCanvas(400,400);
      c1.parent("gamebox");
      textAlign(CENTER);
  }
function bullet(x,y){
    this.x=100*x+50;
   this.dir=1;
 this.ydir=1;
 this.speed= Math.random()+1.5;
 this.y=100*y+50;
   this.draw=function(){
   fill(255,0,0);
       ellipse(this.x,this.y,8);
       
   }
   this.update=function(){
       
   if(this.x>400){this.dir=-this.speed}
   else if(this.x<0){this.dir=this.speed;}
     this.x+= this.dir;
   if(this.y>400){this.ydir=-this.speed;}
   if(this.y<0){this.ydir=this.speed;}
   this.y+= this.ydir;
   }
 this.check=function(obj){
   if(dist(this.x,this.y,obj.x,obj.y)<=14){
        background(255,0,0);
     obj.health-=5;
   }
 }
   
}
let player={
   x:40,
   y:40,
   width:20,
 health:100,
   speed:4,
   draw:function(){
       fill(0,0,255);
       stroke(0,0,200);
       strokeWeight(5);
       ellipse(this.x,this.y,this.width);
       noStroke();
   },
   move:function(x,y){
    distance = dist(this.x,this.y,200,200);
    if(distance>250&&x<200){
        x++;

    }
    if(distance>250&&x<200){
        x--;

    }
    if(distance>250&&y<200){
        y++;

    }
    if(distance>250&&y>200){
        y--;

    }
   if(x===1&&this.x<400){
       this.x+=this.speed;
   }
   if(x===-1&&this.x>0){
       this.x-=this.speed;
   }
   if(y===-1&&this.y>0){
       this.y-=this.speed;
   }
   if(y===1&&this.y<400){
       this.y+=this.speed;
   }
   if(y===0){
       this.x+=0;
   }
   if(y===0){
       this.y+=0;
   }
   }
}

let score=0;
let p1x=0;
let p1y=0;
let fire= [];
let intro=true;
let playGame=false;
let lose=false;
for(i=0;i<20;i++){
fire.push(new bullet(Math.random()*2,Math.random()*2)); 
}
function draw() {
    if(intro===true){
        background(0);
        fill(0,255,0);
        textSize(50);
        text("Dodge",200,150);
        textSize(25);
        text("Press Space to Start",200,250);

}
 if (playGame===true){
        noStroke();
        textSize(24);
            if(player.health<0){
                lose=true;
                playGame=false;
            
            }
        background(0);
        for(i=0;i<20;i++){
        fire[i].draw();
        fire[i].update();
        fire[i].check(player);
        fire[i].speed+=0.0000001;
        }
        player.draw();
        player.move(p1x,p1y)
        fill(255,0,0);
        rect(260,20,100,20);

        fill(0,255,0);
        rect(260,20,player.health,20);

        fill(0,255,0);
        text("Score: "+Math.floor(score),75,40);
        score+=0.03;
}   
    if(lose===true){
        background(255,0,0);
        fill(0)
        
        text("You Lose",200,170);
        text("Your Score is: "+Math.floor(score),200,210);
        text("Press R to Restart",200,250);
    }
}
function keyReleased(){
   if(keyCode===LEFT_ARROW||keyCode===RIGHT_ARROW){
p1x=0;
   }
   if(keyCode===UP_ARROW||keyCode===DOWN_ARROW){
       p1y=0;
   }
   if(keyCode===32){
       intro=false;
       playGame=true;
   }
    if(keyCode===82){
        playGame=true;
        lose=false;
        player.x=40;
        player.health=100;
        player.y=40;
        fire=[];
        for(i=0;i<20;i++){
            fire.push(new bullet(Math.random()*2,Math.random()*2)); 
        }
    }
}
function keyPressed(){
   if(keyCode===LEFT_ARROW){
   p1x=-1;
   }	
   if(keyCode===RIGHT_ARROW){
   p1x=1;
   }	
   if(keyCode===UP_ARROW){
   p1y=-1;
   }	
   if(keyCode===DOWN_ARROW){
   p1y=1;
   }	
}
