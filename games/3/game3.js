
function setup() {
    let c3 =createCanvas(400, 400);
   c3.parent("gamebox")
  }
  let counter=false;
  let g3score =0;
  let scoreArray=[];
  function draw() {
    background(220);
      if(counter===true){
      fill(200,0,0);
      score+=0.05;
      }else{fill(255,0,0);}
      ellipse(200,200,200);
      fill(0);
      textSize(20);
      text(Math.floor(g3score),40,40);
      
      for(i=0;i<scoreArray.length;i++){
          text(scoreArray[i], 40,20*i+90);
      }
      if(scoreArray.length>1){
          scoreArray.shift();
      }
      textSize(25);
      text("Press and Hold the button",100,50);
      text("How long can you hold on??",50,350);
  }
  function mousePressed(){
      if(dist(mouseX,mouseY,200,200)<100){
      counter=true;
      }
  
      
  }
  function mouseReleased(){
      if(dist(mouseX,mouseY,200,200)<100){
      counter=false;
      scoreArray.push(Math.floor(g3score));
      g3score=0;
      }else{
      counter=false;
      g3score=0;
      }
  }
