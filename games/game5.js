var c5= function ( p ){
    p.setup=function() {
        let c5= p.createCanvas(400, 400);
        c5.parent("gamebox")
        
      }
      
      let x = 0;
      let y=0;
      let mouseClick=true;
      let v=0;
      let vx=0;
      let score=0;
      let game=false;
      let pastscore=[0];
      p.draw= function() {
        
        if(game){
        p.background(0);
        p.textSize(50);
        p.noStroke();
        p.textAlign(p.CENTER);
        p.fill(255);
        p.text(score,360,50);
        var max = pastscore.reduce(function(a, b) {
          return Math.max(a, b);
      });
        p.text(max,40,50);
        p.textSize(15);
       p.text("Click the ball to keep it in the air",200,350);
        p.fill(255,0,0);
        p.stroke(205);
        p.strokeWeight(3);
        if(mouseClick){
          p.ellipse(p.mouseX,p.mouseY,60);
        } 
        else{
          p.ellipse(x,y,60);
          y+=v;
          v+=0.5;
          if(y>370){
            y=370;
            v= -v + 5;
            pastscore.push(score);
            score=0;
            
            mouseClick=true;
            
          }
          if(x>370||x<30){
            vx=-vx;
          }
          x+=vx;
          
        }
        }
        else{
          p.background(0);
          p.textSize(50);
          p.noStroke();
          p.textAlign(p.CENTER);
          p.fill(255);
          p.text("Keep Up",200,200);
          p.textSize(15);
          p.text("Press Space to Start", 200, 300);
        }
      }
      p.mousePressed= function(){
        if(mouseClick){
        mouseClick=false;
        x=p.mouseX;
        y=p.mouseY;
        vx=3;
        }
        if(p.dist(x,y,p.mouseX,p.mouseY)<30){
          v=-10;
          vx=-(p.mouseX-x)/5;
          score++;
        }
        
      }
    p.keyReleased=function(){
        if(p.keyCode===32){
          game=true;
        
        }
      }

}