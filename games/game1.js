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
   x:20,
   y:20,
   width:20,
 health:100,
   speed:4,
   draw:function(){
       fill(0,0,255);
       ellipse(this.x,this.y,this.width);
   },
   move:function(x,y){
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
function setup() {
 var game=createCanvas(400, 400);
 let body=document.body;
    game.parent(body);
}
let score=0;
let p1x=0;
let p1y=0;
let fire= [];
for(i=0;i<20;i++){
fire.push(new bullet(Math.random()*2,Math.random()*2)); 
}
function draw() {
 noStroke();
 textSize(24);
 if(player.health<0){
      background(255,0,0);
   fill(0)
   
   text("You lose",125,170);
   text("Your score is "+Math.floor(score),100,210);
   return;
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
   text("Score: "+Math.floor(score),20,40);
 score+=0.03;
}
function keyReleased(){
   if(keyCode===LEFT_ARROW||keyCode===RIGHT_ARROW){
p1x=0;
   }
   if(keyCode===UP_ARROW||keyCode===DOWN_ARROW){
       p1y=0;
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
