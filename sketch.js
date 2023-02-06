var bird_img, bird
var bg_img, bg

var topPipe1, topPipe1_img, topPipe2,topPipe2_img, topPipe3,topPipe3_img;
var topPipeGroup = []
var bottomPipe1,bottomPipe1_img, bottomPipe2,bottomPipe2_img, bottomPipe3,bottomPipe3_img;
var bottomPipeGroup = []

var restart,restart_img,gameOver,gameOver_img
var ground,ceiling

var gameState = 0
var lastStage

var frameCount = 0
var score = frameCount/15


function preload (){

  bg_img = loadImage("Images/bg.jpg");
  bird_img = loadImage("Images/FlappyBird.png");

  topPipe1_img = loadImage("Images/TopPipe1.png");
  topPipe2_img = loadImage("Images/TopPipe2.png");
  topPipe3_img = loadImage("Images/TopPipe3.png");

  bottomPipe1_img = loadImage("Images/FlappyBirdPipe1.png");
  bottomPipe2_img = loadImage("Images/FlappyBirdPipe2.png");
  bottomPipe3_img = loadImage("Images/FlappyBirdPipe3.png");

  // restart_img = loadImage("Images/restart.png")
  gameOver_img = loadImage("Images/gameOver.png")
  
}


function setup(){
  createCanvas (windowWidth,400)

  // background
  bg = createSprite (0,0,width,height)
  bg.addImage ("background",bg_img)
  //bird
  bird = createSprite (50,200)
  bird.addImage("bird", bird_img)
  bird.scale = 0.08
  bird.velocityY += 3
  //restart
  // restart = createSprite (width/2,160)
  // restart.addImage("restart",restart_img)
  // restart.visible = false
   //gameOver
  gameOver = createSprite (width/2,240)
  gameOver.addImage("gameOver",gameOver_img)
  gameOver.visible = false
  //Boundaries
  ceiling = createSprite (width/2,10,width,4)
  ceiling.visible = false
  ground = createSprite (width/2,390,width,4)
  ground.visible = false
}
function draw(){
 background (50)
// Gamestates
if (gameState == 0){
  gamePlay ()
}
if (gameState == 1){
  gameEnd ()
}
 //movement
if(keyDown("up")) {
  // console.log("works")
  bird.y -= 10;
    
}
frameCount += 1

drawSprites()
}
function gameEnd(){
  bird.destroy ()
  gameOver.visible = true
  bottomPipeGroup.destroy
  topPipeGroup.destroy

}
function gamePlay (){
    //bird

  if (bird.isTouching (ground)||bird.isTouching (ceiling) ){
    gameState = 1
   }
  createbottomPipes ()
  createTopPipes ()
 
}
function createbottomPipes(){
  if (frameCount % 60 === 0){
    console.log ("Pipe")
    var bottomPipe;

    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: bottomPipe = createSprite(width,320,10,40);
               bottomPipe.velocityX = -(6 + score/100);
               bottomPipe.addImage("bottomPipe1",bottomPipe2_img);
               bottomPipe.scale = 1
               break;
       case 2: bottomPipe = createSprite(width,300,10,80);
               bottomPipe.velocityX = -(6 + score/100);
               bottomPipe.addImage("bottomPipe2",bottomPipe2_img);
               bottomPipe.scale = 1.5;
               break;
       case 3: bottomPipe = createSprite(width,280,10,120);
               bottomPipe.velocityX = -(6 + score/100);
               bottomPipe.addImage("bottomPipe3",bottomPipe3_img);
               bottomPipe.scale = 2
               break;
       default: break;
     }
    
     bottomPipe.scale = 0.5;
     bottomPipe.lifetime = 1000;
    
     bottomPipeGroup.push(bottomPipe);
  }
 }
 function createTopPipes(){
  if (frameCount % 40 === 0){
    console.log ("Pipe")
    var topPipe;

    
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: topPipe = createSprite(width,60,10,40);
               topPipe.velocityX = -(6 + score/100);
               topPipe.addImage("topipe1",topPipe2_img);
               topPipe.scale = 1
               break;
       case 2: topPipe = createSprite(width,70,10,80);
               topPipe.velocityX = -(6 + score/100);
               topPipe.addImage("topPipe2",topPipe2_img);
               topPipe.scale = 1.5;
               break;
       case 3: topPipe = createSprite(width,50,10,120);
               topPipe.velocityX = -(6 + score/100);
               topPipe.addImage("topPipe3",topPipe3_img);
               topPipe.scale = 2
               break;
       default: break;
     }
    
     topPipe.scale = 0.5;
     topPipe.lifetime = 1000;
    
     topPipeGroup.push(topPipe);
  }
 }