var contact;

function SpawnPlayer() {
  player1 = createSprite(width / 2, height / 2 - 100);
  var zombieImg = loadImage("img/zombie2.png");
  player1.addImage(survivorImg);
  player1.debug = false;
  player1.friction = 0.1;
  player1.maxSpeed = player1.currentSpeed; // .maxSpeed is manipulated by zombie collision.
  player1.currentSpeed = 2.2; //default speed is 2.2 this number is manipulated by speed boosts
  player1.setCollider("circle", 0, 0, 25);
  player1.position.y = constrain(player1.position.y, 20, height - 20);
  player1.position.x = constrain(player1.position.x, 20, width - 20);
  player1.mass = 500;
  player1.nadecount = 0;
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
  zeds.displace(player1, HandleCollide); //handled below in player1.js
  zeds.bounce(bullets, BulletHit); //collisions in zombie.js
  smgbullets.bounce(zeds, SmgHit); //collisions in zombie.js
  zeds.bounce(magnumbullets, MagnumHit); //collisions in zombie.js
  arbullets.bounce(zeds, ArHit); //collisions in zombie.js
  frags.bounce(zeds, FragHit); //collisions in zombie.js
  grenades.bounce(zeds);
  player1.collide(grenadeitems, GrenadePickup); //collisions in pickups.js
  player1.collide(smgs, SmgPickup); //collisions in pickups.js
  player1.collide(magnums, MagnumPickup); //collisions in pickups.js
  player1.collide(ars, ArPickup); //collisions in pickups.js
  player1.collide(meds, MedPickup); //collisions in pickups.js
  player1.collide(speedboosts, SpeedBoostPickup); //collisions in pickups.js
  // player1.overlap(guns, GunSwitch)
}

//Keyboard controls for WASD
function Controls() {
  if (keyIsDown(80)) {
    // P pause
  }

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
  if (keyIsDown(32)) {
    //move left
    if (nadecooldown == 1) {
      if (player1.nadecount > 0) {
        nadecooldown = 0;
        GrenadeFire();
      }
    }
  }
  /*   var pausestate = false

  function keyTyped() {
    console.log("Pause Button Pressed: " + pausestate)
    if (key == ESCAPE) {
      if(pausestate== false){
        pausestate = true
        noLoop();
    }
    if(pausestate == true){
      pausestate = false
      loop();
    }
    } 
  } */
}

//Handle the HealthBar and Hud
function Hud() {
  fill(200, 200, 255);
  stroke(10);
  switch (currentgun) {
    case 1:
      push();
      scale(0.8);
      image(smgImg, 24, 90);
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
      image(arImg, 24, 93);
      pop();
      break;
    default:
  }
}

//Check to see wich weapon is active before firing

function MouseControls() {
  mouseClicked = function() {
    switch (currentgun) {
      case 1:
        clearInterval(smgbulletinterval); //
        clearInterval(arbulletinterval);
        break;
      default:
        clearInterval(smgbulletinterval);
        clearInterval(arbulletinterval);
    }
  };
  mousePressed = function() {
    switch (currentgun) {
      case 1:
        if (mouseButton == LEFT) {
          if (cooldown == 1) {
            cooldown = 0;
            SmgFire(); //fire a single shot on click
          }
          smgbulletinterval = setInterval(SmgFire, 200); //continue to fire a bullet every 0.2 seconds if the button is held down
        }
        break;
      case 0:
        if (cooldown == 1) {
          cooldown = 0;
          PistolFire();
        }
        break;
      case 3:
        if (cooldown == 1) {
          cooldown = 0;
          MagnumFire();
        }
        break;
      case 4:
        if (mouseButton == LEFT) {
          if (cooldown == 1) {
            cooldown = 0;
            ArFire();
          }
          arbulletinterval = setInterval(ArFire, 100); //fire a bullet every 0.1 seconds if the button is held down
        }
        break;
      default:
        clearInterval(smgbulletinterval);
        clearInterval(arbulletinterval);
    }
  };

  mouseReleased = function() {
    switch (currentgun) {
      case 1:
        clearInterval(smgbulletinterval);
        break;
      case 4:
        clearInterval(arbulletinterval);
        break;
      default:
        clearInterval(smgbulletinterval);
    }
    //Clear bullet intervals to stop firing
    mouseReleased = function() {
      switch (currentgun) {
        case 1:
          clearInterval(smgbulletinterval);
          break;
        case 4:
          clearInterval(arbulletinterval);
          break;
        default:
          clearInterval(smgbulletinterval);
          clearInterval(arbulletinterval);
      }
    };
  };
}
function HandleHealthbar() {
  if (playerHealth > 0) {
    if (contact === true) {
      push();
      fill(255, 0, 0);
      textSize(20);
      textStyle(BOLD);
      text(Math.round(playerHealth), 30, 30);
      pop();
    } else {
      push();
      fill(200, 200, 255);
      textSize(20);
      textStyle(BOLD);
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
