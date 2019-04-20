//Sketch 1
var c1 = function( p ) { // p could be any variable name
    let c1;
    
    p.setup=function () {
        c1=p.createCanvas(400,400);
          c1.parent("gamebox");
          p.textAlign(p.CENTER);
    }
     function bullet(x,y){
        this.x=100*x+50;
       this.dir=1;
     this.ydir=1;
     this.speed= Math.random()+1.5;
     this.y=100*y+50;
       this.draw=function(){
       p.fill(255,0,0);
           p.ellipse(this.x,this.y,8);
           
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
       if(p.dist(this.x,this.y,obj.x,obj.y)<=14){
            p.background(255,0,0);
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
           p.fill(0,0,255);
           p.stroke(0,0,200);
           p.strokeWeight(5);
           p.ellipse(this.x,this.y,this.width);
           p.noStroke();
       },
       move:function(x,y){
        distance = p.dist(this.x,this.y,200,200);
        if(distance>250&&this.x<200){
            this.x++;
    
        }
        if(distance>250&&this.x<200){
            this.x--;
    
        }
        if(distance>250&&this.y<200){
            this.y++;
    
        }
        if(distance>250&&this.y>200){
            this.y--;
    
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
    let c1intro=true;
    let playGame=false;
    let c1lose=false;
    for(i=0;i<20;i++){
    fire.push(new bullet(Math.random()*2,Math.random()*2)); 
    }
    p.draw = function() {
        if(c1intro===true){
            p.background(0);
            p.fill(0,255,0);
            p.textSize(50);
            p.text("Dodge",200,150);
            p.textSize(25);
            p.text("Press Space to Start",200,250);
    
    }
     if (playGame===true){
           p.noStroke();
            p.textSize(24);
                if(player.health<0){
                    c1lose=true;
                    playGame=false;
                
                }
            p.background(0);
            for(i=0;i<20;i++){
            fire[i].draw();
            fire[i].update();
            fire[i].check(player);
            fire[i].speed+=0.0000001;
            }
            player.draw();
            player.move(p1x,p1y)
            p.fill(255,0,0);
            p.rect(260,20,100,20);
    
            p.fill(0,255,0);
            p.rect(260,20,player.health,20);
    
            p.fill(0,255,0);
            p.text("Score: "+Math.floor(score),75,40);
            score+=0.03;
    }   
        if(c1lose===true){
            p.background(255,0,0);
            p.fill(0)
            
            p.text("You Lose",200,170);
            p.text("Your Score is: "+Math.floor(score),200,210);
           
            p.text("Press R to Restart",200,250);
        }
    }
    p.keyReleased= function(){
       if(p.keyCode===p.LEFT_ARROW||p.keyCode===p.RIGHT_ARROW){
    p1x=0;
       }
       if(p.keyCode===p.UP_ARROW||p.keyCode===p.DOWN_ARROW){
           p1y=0;
       }
       if(p.keyCode===32){
           c1intro=false;
           playGame=true;
       }
        if(p.keyCode===82){
            playGame=true;
            c1lose=false;
            player.x=40;
            score=0;
            player.health=100;
            player.y=40;
            fire=[];
            for(i=0;i<20;i++){
                fire.push(new bullet(Math.random()*2,Math.random()*2)); 
            }
        }
    }
    p.keyPressed = function(){
       if(p.keyCode===p.LEFT_ARROW){
       p1x= -1;
       }	
       if(p.keyCode===p.RIGHT_ARROW){
       p1x= 1;
       }	
       if(p.keyCode===p.UP_ARROW){
       p1y= -1;
       }	
       if(p.keyCode===p.DOWN_ARROW){
       p1y= 1;
       }	
    }
  };

