var player1;

function SpawnPlayer() {
  player1 = createSprite(width / 2, height / 2 - 100);
  var zombieImg = loadImage("img/zombie2.png");
  player1.addImage(survivorImg);
  player1.debug = false;
  player1.friction = 0.1;
  player1.maxSpeed = player1.currentSpeed;// .maxSpeed is manipulated by zombie collision.
  player1.currentSpeed = 2.2; //default speed is 2.2 this number is manipulated by speed boosts
  player1.setCollider("circle", 0, 0, 25);
  player1.position.y = constrain(player1.position.y, 20, height - 20);
  player1.position.x = constrain(player1.position.x, 20, width - 20);
  player1.mass = 500;
  player1.addToGroup(player1);
}

function PlayerUpdate() {
  //rotate player to mouse

  player1.rotation =
    (atan2(pmouseY - player1.position.y, pmouseX - player1.position.x) * 180) /
    Math.PI;
  //block players walls of canvas
  if (player1.position.x > width - 30) player1.position.x = width - 30;
  if (player1.position.y > height - 30) player1.position.y = height - 30;
  if (player1.position.x < 30) player1.position.x = 30;
  if (player1.position.y < 30) player1.position.y = 30;


  //Handle collisions
  zeds.bounce(zeds);
  zeds.displace(player1, HandleCollide);//handled below in player1.js
  zeds.bounce(bullets, BulletHit);//collisions in shooter.js
  smgbullets.bounce(zeds, SmgHit);//collisions in shooter.js
  zeds.bounce(magnumbullets, MagnumHit);//collisions in shooter.js
  arbullets.bounce(zeds, ArHit);//collisions in shooter.js
  player1.collide(smgs, SmgPickup);//collisions in shooter.js
  player1.collide(magnums, MagnumPickup);//collisions in shooter.js
  player1.collide(ars, ArPickup);//collisions in shooter.js
  player1.collide(meds, MedPickup);//collisions in pickups.js
  player1.collide(speedboosts, SpeedBoostPickup);//collisions in pickups.js
  // player1.overlap(guns, GunSwitch)
}
//Keyboard controls for WASD
function Controls() {
  if (keyIsDown(87)) {
    //move up
    player1.addSpeed(0.6, 270);
  }
  if (keyIsDown(83)) {
    //move down
    player1.addSpeed(0.6, 90);
  }
  if (keyIsDown(65)) {
    //move right
    player1.addSpeed(0.6, 180);
  }
  if (keyIsDown(68)) {
    //move left
    player1.addSpeed(0.6, 0);
  }
}
//Handle the HealthBar and Hud
function Hud() {
  fill(200, 200, 255);
  stroke(10);
  switch (currentgun) {
    case 1:
      push();
      scale(0.75);
      image(smgImg, 20, 85);
      pop();
      break;
    case 0:
      break;
    case 3:
      push();
      scale(0.5);
      image(magnumImg, 20, 130);
      pop();
      break;
    case 4:
      push();
      scale(0.7);
      image(arImg, 20, 130);
      pop();
      break;
    default:
  }
}
function HandleHealthbar() {
  if (playerHealth > 0) {
    if (contact === true) {
      push();
      fill(255, 0, 0);
      text(Math.round(playerHealth), 30, 30);
      pop();
    } else {
      push();
      fill(200, 200, 255);
      text(Math.round(playerHealth), 30, 30);
      pop();
    }
  }
  contact = false;
}

HandleCollide = (zed, player1) => {
  contact = true;
  player1.maxSpeed = 0.1;
  playerHealth -= 0.07;
  zed.maxSpeed = 0.1;
  setTimeout(() => {
    player1.maxSpeed = player1.currentSpeed;
    zed.maxSpeed = zed.normalSpeed;
    contact = false;
  }, 500);
};
