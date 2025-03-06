let circleY=10;
let armLimit=500;
let ceilingLimit=10;
let grabDistance=70;
let circleDropRate = 4;
let circleRaiseRate = 4;

let squareX = 50;
let squareY = 520;
let squareR = 50;
let squarePts=50;

let squareX2 = 222;
let squareY2 = 520;
let squareR2 = 100;
let squarePts2=100;

let spaceKeyPressed =false;
let gravityRate=4;
let totalPoints=0;
let bigBlock=false;
let smallBlock=false;


// for given shape coords, return distance from cranehand
function DistancefromCrane(shapeX,shapeY){

  // we know crane hand is always at mouseX, circleY (using distance formula)
  return sqrt( (shapeX - mouseX)** 2 + (shapeY - circleY) ** 2 );
}

//is space pressed? yes
function keyPressed() {
  if (keyCode === 32) {
    console.log("spacedown")
    spaceKeyPressed = true;
  }
}

//load images
function preload() {
  img = loadImage('/images/carmClosed.png');
  img2 = loadImage('/images/carmOpen.png');
  img3 = loadImage('/images/cHead.png');
  img4 = loadImage('/images/background.jpg');
}

function setup() {
  createCanvas(800, 600);

  
  
}
// Occurs every frame
function draw() {
  
  //when 150 points is reached end the game
  if(totalPoints == 150){
    textSize(80);
    text('YOU WIN!',300,300); 
    return;
  }
  //background image
  image(img4,0,0);
  fill('white')

  text("Get the yellow squares in to the red zone to collect Points",50,25)
  text("Left mouse click to go down and space to grab",50,50)
  text("Current Score = " + totalPoints, 50, 75)

  // pt text when square 1 is within red area
  if(squareX>710 && squareY>400 && !smallBlock){
    totalPoints += 50;
    smallBlock = true;
  }

  // pt text when square 2 is within red area
  if(squareX2>710 && squareY2>400 && !bigBlock){
    totalPoints += 100;
    bigBlock = true;
  }
 
  fill('yellow');
  square(squareX, squareY, squareR);
  square(squareX2, squareY2, squareR2);


  line(mouseX,40,mouseX,40+circleY);
  image(img3,mouseX-25,10);
  image(spaceKeyPressed ?img2 : img,mouseX-25,40+circleY);
  
  //test for key pressed
  if (keyIsPressed === true) {
    console.log("it's pressed");
  }

  if (keyIsPressed === false) {
    spaceKeyPressed = false;
    console.log("spaceup")
  }

  if (mouseIsPressed && circleY<armLimit){
    circleY = circleY + circleDropRate; // go down
  }
  else if (circleY>ceilingLimit && !mouseIsPressed){
    circleY = circleY - circleRaiseRate; // go up
  }

//square 1 pick up how?
  if (DistancefromCrane(squareX,squareY)<grabDistance && spaceKeyPressed === true){
    squareX=mouseX-squareR/2 // grabit
    squareY=circleY+23  
  }
  else if (squareY<armLimit-squareR){
    squareY= squareY + gravityRate
  }

//square 2 pick up how?
  if (DistancefromCrane(squareX2,squareY2)<grabDistance && spaceKeyPressed === true){
    squareX2=mouseX-squareR2/2 // grabit
    squareY2=circleY+23  
  }
  else if (squareY2<armLimit-squareR2){
    squareY2= squareY2 + gravityRate
  }

  

  // console.log(DistancefromCrane(squareX,squareY))

  fill('red');
  rect(710, 400, 100, 200);

  

}