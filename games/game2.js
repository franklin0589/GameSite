var c2 = function( p ) { 
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
    p.setup=function() {
        
        let c2 = p.createCanvas(500,500);
        c2.parent("gamebox");
          p.textAlign(p.CENTER);
    }
    let step = false;
    
    let char ={
        x:50,
        y:210,
        draw: function(){
            p.fill(225,0,0);
            p.rect(this.x,this.y,75,175);
        },
        walking: function(){
            p.stroke(255,0,255);
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
            p.fill("green");
            p.rect(this.x,this.y,500,300)     
        }
        
    }
    let road={
        x:0,
        y:325,
        length:1000,
        draw:function(){
            p.fill("black");
            p.rect(this.x,this.y,this.length,50);
        }
    }
    
    let stripes={
        x:road.x,
        y:345,
        length:30,
        numberStripes:75,
        width:10,
        draw:function(){
            p.fill("white"); 
            for(i=0;i<road.length/this.numberStripes;i++)
            p.rect(i*this.numberStripes+this.x, this.y,this.length,this.width);                         
        }
    }
    let enemy = {
        x:50,
        y:185,
        draw: function(){
            p.stroke(225,225,0);
        let j =0;
            if(j%5===0){
                walking(this.x,this.y);
            }
            else{
            standing(this.x,this.y);
            }
        j+=1;
        },
        a:this.x+75,
        b:this.y+175
    }
    
    let finishLine={
        x:road.x+road.length,    
        y:325,
        length:40,
        draw:function(){
            p.fill("yellow");
            p.rect(this.x,this.y,this.length,50);
        }        
    }  
    let gameState={
        intro: function(){
            p.background(0,124,134);
            p.textSize(50);
            p.fill(0,255,0);
           p.text("Race",250,200);
              p.textSize(15);
              p.text("Press Space to Play",250,275);
              p.text("Press Control for instructions",250,300);
              if(instructions===true){
                p.text("Repeatedly Press J and H \nin sequence, starting with J \nto take steps forward and try to \nwin the race",250,325);
            }
        },
        gaming:function (){
             p.background("blue");
             p.textSize(18);
             p.fill(0);
             if(levelNum===1){
                  p.text("Press J and H to Run. Don't trip!",250,50);
               
             }
              p.text("Level: " + levelNum,450,75);
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
            p.background("white");
            p.textSize(50);
            p.fill(200,200,0);
            p.text("Good Job",250,200);
               p.textSize(20);
            p.text("Press Space to Next Level",250,300);     
        },
        lost:function(){
            p.background("black")
            p.textSize(50);
            p.fill("red");
            p.text("You lost",250,200);
            p.textSize(20);
            p.text("Press Space to Restart",250,300);                                                   
        },
          finalWin:function(){
            p.background("white");
            p.textSize(50);
            p.fill(200,200,0);
            p.text("You WIN!!!",250,200);
               p.textSize(20);
            p.text("You only lost " + lostCounter+" times \n You can try again for a better score",250,300);     
        
        
        }
        
        
    }
    p.draw= function(){
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
    
    p.keyReleased= function() {
          if (p.keyCode === 17&&intro==true) {
            instructions=true;
        }   
        //Lose
            if (p.keyCode === 74&&paststep[0]==="J"||p.keyCode === 72&&paststep[0]==="H") {
                game=false;
            lose=true;
            lostCounter++;
        }
        
        //J
        if (p.keyCode === 74&&paststep[0]==="H") {
            step=true;
            walk=true;
            paststep.pop();
            paststep.push("J");
        }   
        //H
        if (p.keyCode === 72&&paststep[0]==="J") {
            walk=false;
            step=true;
            paststep.pop();
            paststep.push("H");
        }
       //Space
        if(p.keyCode ===32&&lose===true||p.keyCode ===32&&intro===true){
            game=true;
              intro=false;
            lose=false;
            road.x=0;
            enemy.x=0;
            stripes.x=0;
            finishLine.x=road.x+road.length;
        }
          if(p.keyCode ===32&&win===true){
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
    
    function walking (x,y){
        p.noFill();
       p.strokeWeight(5);
    //Head
    p.ellipse(x,y,50);
    //Body
    p.line(x,y+25,x,y+100);
    //LeftArm
    p.line(x,y+35,x-15,y+60);
    p.line(x-15,y+60,x-5,y+70);
    //RightArm
    p.line(x,y+35,x+10,y+70);
    p.line(x+10,y+70,x+25,y+35);
    //RigtLeg
    p.line(x,y+100,x+25,y+125);
    p.line(x+25,y+155,x+25,y+125);
    //LeftLeg
    p.line(x,y+100,x-5,y+125);
    p.line(x-5,y+125,x-25,y+155);
    p.strokeWeight(1);
    p.stroke(0);
    }
    function standing (x,y){
      p.strokeWeight(5);
    //Head
    p.ellipse(x,y,50);
    //Body
    p.line(x,y+25,x,y+100);
    //LeftArm
    p.line(x,y+35,x-15,y+80);
    
    //RightArm
    p.line(x,y+35,x+15,y+80);
    
    //RigtLeg
    p.line(x,y+100,x+15,y+155);
    //LeftLeg
    p.line(x,y+100,x-15,y+155);
    p.strokeWeight(1);
    p.stroke(0);
    }
  };
  