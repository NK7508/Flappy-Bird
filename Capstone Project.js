var PLAY = 1;
var END = 0;
var gameState = PLAY;
var t = Math.round(Math.random(25,175));
var b = Math.round(Math.random(375,225));

var bird;
var bg, invisibleGround,invisibleCeiling;

var topPipeGroup, topPipe1, topPipe2, topPipe3;
var bottomPipeGroup, bottomPipe1, bottomPipe2, bottomPipe3;

var score;
var gameOver,restart

function preload(){


  bg = loadImage("Images/FlappyBirdBackground.png");
  bird = loadImage("Images/FlappyBird.png");
  
 
  
  bottomPipe1 = loadImage("Images/FlappyBirdPipe1.png");
  bottomPipe2 = loadImage("Images/FlappyBirdPipe2.png");
  bottomPipe3 = loadImage("Images/FlappyBirdPipe3.png");
  topPipe1 = loadImage("Images/FlappyBirdPipe1.png");
  topPipe2 = loadImage("Images/FlappyBirdPipe2.png");
  topPipe3 = loadImage("Images/FlappyBirdPipe3.png");
  
  restart = loadImage("Images/restart.png")
  gameOver = loadImage("Images/gameOver.png")
  

}

function setup() {
  createCanvas(600, 200);
  
 
  t = Math.round(Math.random(50,150));
  b = Math.round(Math.random(350,250));

  bird.scale = 0.5;
  
  bg = createSprite(200,180,400,20);

  gameOver = createSprite(300,150);
  gameOver.addImage();
  
  restart = createSprite(300,200);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,600,10);
  invisibleGround.visible = false;
  invisibleCeiling = createSprite(200,10,600,10);
  invisibleCeiling.visible = false;
  
  
  bottomPipeGroup = createGroup();
  topPipeGroup = createGroup();

  
  bird.setCollider("rectangle",0,0,bird.width,bird.height);
  bird.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    bg.velocityX = -(4 + 3* score/100)
    score = score + Math.round(getFrameRate()/60);
    
    
    if (bg.x < 0){
      bg.x = bg.width/2;
    }
    
    if(keyDown("space")) {
        jump.velocityY = -12;
        
    }
    
    bird.velocityY = bird.velocityY + 0.8
  
    createtopPipes();
  
    createbottomPipes();
    
    if(bottomPipeGroup.isTouching(bird)){
        gameState = END;
      
      
    }
    if(topPipeGroup.isTouching(bird)){
        gameState = END;
      
      
    }
    if(invisibleGround.isTouching(bird)){
        gameState = END;
     
      
    }
    if(invisibleCeiling.isTouching(bird)){
        gameState = END;
       
    }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
    bottomPipeGroup.setLifetimeEach(-1);
    topPipeGroup.setLifetimeEach(-1);
     
     bottomPipeGroup.setVelocityXEach(0);
     topPipeGroup.setVelocityXEach(0);    
   }

  
}
 

  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState = PLAY
  topPipeGroup.destroyEach ()
  bottomPipeGroup.destroyEach ()
  score = 0 

}


function createbottomPipes(){
 if (frameCount % 60 === 0){
   var bottomPipe = createSprite(600,b,10,40);
   bottomPipe.velocityX = -(6 + score/100);
   
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: bottomPipe.addImage(bottomPipe1);
              break;
      case 2: bottomPipe.addImage(bottomPipe2);
              break;
      case 3: bottomPipe.addImage(bottomPipe3);
              break;
      default: break;
    }
   
    bottomPipe.scale = 0.5;
    bottomPipe.lifetime = 300;
   
    bottomPipeGroup.add(bottomPipe);
 }
}

function createtopPipes() {
    if (frameCount % 60 === 0 ){
    var topPipes = createSprite(600,t,10,40);
    topPipes.velocityX = -(6 + score/100);
    
        var rand = Math.round(random(1,3));
        switch(rand) {
        case 1: topPipes.addImage(bottomPipe1);
                break;
        case 2: topPipes.addImage(bottomPipe2);
                break;
        case 3: topPipes.addImage(bottomPipe3);
                break;
        default: break;
        }
    
        topPipes.scale = 0.5;
        topPipes.lifetime = 300;
        topPipes.rotate (180)
        topPipeGroup.add(topPipes);
    }
}

