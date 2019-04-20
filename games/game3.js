var c3 = function( p ) { 
    
    p.setup=function() {
        let c3 =p.createCanvas(400, 400);
        c3.parent('gamebox');
      }
      let counter=false;
      let score =0;
      let firstScore=false;
      let scoreArray=[0];
      let circleX=200;
      let circleY=200;
      let circleW=200;
      let ax=1;
      let ay=1;
      let xdir=0;
      let ydir=0;
      p.draw= function() {
          p.background(220);
          p.textSize(20);
          p.textAlign(p.CENTER);
          p.text("Press and Hold the button",210,50);
          p.text("Simple in concept difficult in practice",200,350);
          if(counter===true){
          p.fill(200,0,0);
          p.strokeWeight(20);
          p.stroke(100);
          
          score+=0.05;
          }else{
              p.fill(255,0,0);
              p.strokeWeight(20);
              p.stroke(150);
          }
        
          p.ellipse(circleX,circleY,circleW);
          p.noStroke();
          p.fill(0);
          p.textSize(20);
          p.text(Math.floor(score/10),40,40);
          if(score>=30&&score<31){
                      ax=2;
                  xdir=ax;
                }
                if(score>100&& score<101){
                  ax=p.random()*2+3;
                  ay=p.random()*2+3;
                }
                if(score>120&& circleW>75){
                   circleW-=0.5;
                }
                if(score>=70&&circleW>150){
                    circleW-=1;
                }
                if(score>=50&&score<51){
                    ay=2;
                  ydir=ay;
                }
                if(score>=40&&score<41){
                    ax=3;
                }
                if(circleX-(circleW/2)<0){
                    xdir=ax;
                }
                if(circleX+(circleW/2)>400){
                    xdir=-ax;
                }
                if(circleY-(circleW/2)<0){
                    ydir=ay;
                }
                if(circleY+(circleW/2)>400){
                    ydir=-ay;
                    
                }
              if(firstScore===true){
              p.text(Math.max.apply(Math,scoreArray), 40,110);
                }
                circleX+=xdir;
                circleY+=ydir;
                if(p.mouseIsPressed&&p.dist(p.mouseX,p.mouseY,circleX,circleY)>(circleW/2)){
                    counter=false;
                    scoreArray.push(Math.floor(score/10));
                    score=0;
                    xdir=0;
                    ydir=0;
                    ax=1;
                    ay=1;
                    circleX=200;
                    circleY=200;
                    circleW=200;
                }
      }
      p.mousePressed= function(){
          if(p.dist(p.mouseX,p.mouseY,circleX,circleY)<(circleW/2)){
          counter=true;
          }
      
          
      }
      p.mouseReleased= function(){
          if(p.dist(p.mouseX,p.mouseY,200,200)<(circleW/2)){
          counter=false;
                firstScore=true;
          scoreArray.push(Math.floor(score/10));
          score=0;
                xdir=0;
                ydir=0;
                ax=1;
                ay=1;
                circleX=200;
                circleY=200;
                circleW=200;
          }else{
          counter=false;
          score=0;
                xdir=0;
                ydir=0;
                ax=1;
                ay=1;
                circleX=200;
                circleY=200;
                circleW=200;
                }
        }
    
}