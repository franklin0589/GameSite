var c6 = function ( p ){
    p.setup=function() {
        let c6=p.createCanvas(400, 400);
        c6.parent("gamebox");

      }
      
      let y = 0;
      let mouseClick = true;
      let v = 0;
      let score = 0;
      let game = false;
      let won=false;
      let pastscore=[0];
      let bucket={
        x:0,
        y:350,
        d:3,
        move:function(){
          
          
          if(this.x>320||this.x<0){
            this.d= -this.d;
            if(this.x>320){
              this.x=320;
            }
            if(this.x<0){
              this.x=0;
            }
          }
          this.x+=this.d;
        },
        draw:function(){
          p.rect(this.x,this.y,80,50);
        }
      }
      
      p.draw= function() {
       if(game){ 
        p.background(0);
        p.textSize(50);
        p.noStroke();  p.textAlign(p.CENTER);
        p.fill(255);
        let score = 2*(p.abs(bucket.d)-3);
        p.text(score,350,50);
      var max = pastscore.reduce(function(a, b) {
          return Math.max(a, b);
      });
        p.text(max,50,50);
        
        p.textSize(15);
        p.text("Click to drop the ball in the bucket to score points \n Ten points to win!!",200,300);
         if(score>=10){
         game=false;
          won=true;
         }
         
        
        p.fill(0,0,255);
        if (mouseClick) {
          p.ellipse(200, 100, 15);
        } else {
          p.ellipse(200, y, 15);
          y += v;
          v += 0.5;
          if (y > 375){
            if(bucket.x-10<200&&200<10+(bucket.x+80)){
            v = -v + 5;
            if(bucket.d>0){
            bucket.d=bucket.d+0.5;
            }
            else{
              bucket.d-=0.5;
            }
            mouseClick = true;
          }
            else{
              pastscore.push(score);
              bucket.d=3;
              bucket.x=160;
              mouseClick=true;
            }
          
          }
          
        }
      p.fill(255,0,0);
          bucket.move();
          bucket.draw();
      }
      else if(won){
           p.background(0);
          p.textSize(50);
          p.noStroke();
          p.textAlign(p.CENTER);
          p.fill(255);
          p.text("You Won!!!",200,200);
          p.textSize(15);
          p.text("Refresh to play again", 200, 300);
          p.noLoop();
      }
      else{
          p.background(0);
          p.textSize(50);
          p.noStroke();
          p.textAlign(p.CENTER);
          p.fill(255);
          p.text("CatchBall",200,200);
          p.textSize(15);
         p.text("Press Space to Start", 200, 300);
        }
      }
      
      p.mousePressed=function() {
        if (mouseClick) {
          mouseClick = false;
           y=100;
          v=0;
        }
       
      
      }
     p.keyReleased=function(){
        if(p.keyCode===32){
          game=true;
        
        }
      }


}