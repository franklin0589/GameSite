function setup(){
    let canvas =createCanvas(500,500);
    canvas.parent("gamebox");
}
let playerturn=[false,true];
let rows=['','',''];
for(i=0;i<3;i++){
    rows[i]=[];
    for(j=0;j<3;j++){
        rows[i].push('');
    }
}
function draw(){
    background(225);
    grid();
    
    for(j=0;j<3;j++){
        for(i=0;i<3;i++){
        drawLetter(i,j,i,j);
        }
    }
    if(Xwins()===true){
        Xwon();
    }
    if(Owins()===true){
        Owon();
    }
    
}
function drawLetter(x,y,i,j){
    textSize(50);
    text(rows[i][j], x*150+75,y*150+125);
    
}

function grid(){
    for(i=1;i<3;i++){
        fill(0);
        strokeWeight(12);
        line(i*150,50,i*150,400);
    }
    for(i=1;i<3;i++){
        fill(0);
        strokeWeight(12);
        line(50,i*150,400,i*150);
    }
}
function squareSelect(x,y,i,j){
    if(mouseX>x*150&&mouseX<x*150+150&&mouseY>y*150&&mouseY<y*150+150&&playerturn[0]===true&&rows[i][j]==""){
        rows[i][j]='X';
    }
    if(mouseX>x*150&&mouseX<x*150+150&&mouseY>y*150&&mouseY<y*150+150&&playerturn[1]===true&&rows[i][j]==''){
        rows[i][j]='O';
    }
}
function Xwins(){
    if(rows[0][0]==='X'&&rows[0][1]==='X'&&rows[0][2]==="X"){
        return true;
    }
    if(rows[1][0]==='X'&&rows[1][1]==='X'&&rows[1][2]==="X"){
        return true;
    }
    if(rows[2][0]==='X'&&rows[2][1]==='X'&&rows[2][2]==="X"){
        return true;
    }
    if(rows[0][0]==='X'&&rows[1][0]==='X'&&rows[2][0]==="X"){
        return true;
    }
    if(rows[0][1]==='X'&&rows[1][1]==='X'&&rows[2][1]==="X"){
        return true;
    }
    if(rows[0][2]==='X'&&rows[1][2]==='X'&&rows[2][2]==="X"){
        return true;
    }
    if(rows[0][0]==='X'&&rows[1][1]==='X'&&rows[2][2]==="X"){
        return true;
    }
    if(rows[0][2]==='X'&&rows[1][1]==='X'&&rows[2][0]==="X"){
        return true;
    }
    return false;


}
function Owins(){
    if(rows[0][0]==='O'&&rows[0][1]==='O'&&rows[0][2]==='O'){
        return true;
    }
    if(rows[1][0]==='O'&&rows[1][1]==='O'&&rows[1][2]==='O'){
        return true;
    }
    if(rows[2][0]==='O'&&rows[2][1]==='O'&&rows[2][2]==='O'){
        return true;
    }
    if(rows[0][0]==='O'&&rows[1][0]==='O'&&rows[2][0]==='O'){
        return true;
    }
    if(rows[0][1]==='O'&&rows[1][1]==='O'&&rows[2][1]==='O'){
        return true;
    }
    if(rows[0][2]==='O'&&rows[1][2]==='O'&&rows[2][2]==='O'){
        return true;
    }
    if(rows[0][0]==='O'&&rows[1][1]==='O'&&rows[2][2]==='O'){
        return true;
    }
    if(rows[0][2]==='O'&&rows[1][1]==='O'&&rows[2][0]==='O'){
        return true;
    }
    return false;

}
function Owon(){
background(225);
textSize(50);
text("O won",150,250);
}
function Xwon(){
    background(225);
textSize(50);
text("X won",150,250);
}
function mouseReleased(){
  for(j=0;j<3;j++){
    for(i=0;i<3;i++){
    squareSelect(i,j,i,j);
    }
}
if(playerturn[1]===true){
    playerturn[0]=true;
    playerturn[1]=false;
    return'';
}
if(playerturn[0]===true){
    playerturn[1]=true;
    playerturn[0]=false;
    
}

}
