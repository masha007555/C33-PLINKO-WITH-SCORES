const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];
var divisions =[];

var divisionHeight=300;
var score = 0;
var count = 5;
var gameState ="start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  for (var k = 0; k <=width; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }
  for (var j = 60; j <=width; j=j+60) {
    plinkos.push(new Plinko(j,75));
  }
  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,175));
  }
  for (var j = 60; j <=width; j=j+60) {
    plinkos.push(new Plinko(j,275));
  }
  for (var j = 50; j <=width-10; j=j+50) {
    plinkos.push(new Plinko(j,375));
  } 
}
 
function draw() {
  background("black");
  Engine.update(engine);

  ground.display();
    
  if (count<= 0) {
    gameState ="end";
    push();
    textSize(80);
    strokeWeight(4);
    stroke("white");
    text("GameOver", 200, 470);
    textSize(40);
    strokeWeight(2);
    text("Use 'SPACE BAR' for another chance", 80,230)
    pop();
  }else {
    gameState = "play";
  }

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();  
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
      
    if (particles[i].body.position.x > 1 && particles[i].body.position.x < 80 && particles[i].body.position.y>760) {
      score=score+500;
      particles.pop();
    }else if (particles[i].body.position.x < 800 && particles[i].body.position.x >720 && particles[i].body.position.y > 760){
      score = score+500;
      particles.pop();
    }
    else if (particles[i].body.position.x < 160 && particles[i].body.position.x > 81 && particles[i].body.position.y > 760) {
      score = score + 200;
      particles.pop();
    }else if (particles[i].body.position.x < 719 && particles[i].body.position.x > 630 && particles[i].body.position.y > 760){
      score = score + 200;
      particles.pop();
    }
    else if (particles[i].body.position.x <230 && particles[i].body.position.x > 161 && particles[i].body.position.y > 760) {
      score = score + 100;
      particles.pop();
    }else if (particles[i].body.position.x <629 && particles[i].body.position.x > 570 && particles[i].body.position.y > 760) {
      score = score + 100;
      particles.pop();
    }
    else if (particles[i].body.position.x < 628 && particles[i].body.position.x > 231 && particles[i].body.position.y > 760){
      score = score+10;
      particles.pop();
    }
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  textSize(35);
  strokeWeight("2");
  stroke("orange")
  fill("White");
  text("Score : "+score,20,40);
  text("Chance: "+count,600,40);
  fill("white");
  textSize(35)
  stroke("red")
  text("500",10,550);
  text("200",90,550);
  text("100",170,550);
  text("10",260,550);
  text("10",340,550);
  text("10",420,550);
  text("10",500,550);
  text("100",570,550);
  text("200",650,550);
  text("500",730,550);
}

function mousePressed(){
  if(gameState!=="end"){
    count--;
    particles.push(new Particle(mouseX, 10, 10, 10));
  }
}

function keyPressed(){
  if (gameState === "end"){
    if (keyCode === 32){
      count=5;
      score=0;
      particles.pop();
    }
  }
}