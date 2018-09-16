//Spawns a random zombie
function SpawnZed() {
  //   Border zones

  // function CreateSprite(){
  var returnTop = {
    location: "top",
    x: Math.floor(random(-100, width + 100)),
    y: Math.floor(random(-100, 0))
  };
  var returnLeft = {
    location: "left",
    x: Math.floor(random(-100, 0)),
    y: Math.floor(random(-100, height + 100))
  };
  var returnRight = {
    location: "right",
    x: Math.floor(random(width, width + 100)),
    y: Math.floor(random(-100, height + 100))
  };
  var returnBottom = {
    location: "bottom",
    x: Math.floor(random(-100, width + 100)),
    y: Math.floor(random(height, height + 100))
  };

  var spots1 = [returnTop, returnBottom, returnLeft, returnRight];
  var topspots = [returnTop, returnBottom];
  var sidespots = [returnLeft, returnRight];

  get_random = function(list) {
    return list[Math.floor(Math.random() * list.length)]; //get a random item from an array
  };

  firstcoord = get_random(spots1); //get a random object from the spots array

  if (firstcoord.location === "top") {
    secondcoord = get_random(topspots);
  } else if (firstcoord.location === "left") {
    secondcoord = get_random(sidespots);
  } else if (firstcoord.location === "right") {
    secondcoord = get_random(sidespots);
  } else if (firstcoord.location === "bottom") {
    secondcoord = get_random(topspots);
  }

  var zed = createSprite(firstcoord.x, secondcoord.y);

  var zombieImg = loadImage("img/zombie2.png");

  zed.addImage(zombieImg);
  zed.debug = false;
  zed.setCollider("circle", 0, 0, 20);
  zed.maxSpeed = random(0.5, 2.3);
  zed.normalSpeed = zed.maxSpeed;
  zed.health = random(80, 150);
  zed.immovable = false;
  zed.mass = 1;

  zed.addToGroup(zeds);
}

//Zombie moves towards the player
function Attack() {
  for (i = 0; i < zeds.length; i++) {
    zeds[i].attractionPoint(
      random(0.05, 0.5),
      player1.position.x,
      player1.position.y
    );
    zeds[i].rotateToDirection = true;
  }
}

//Zombie is hit by an SMG
function SmgHit(smgbullet, zed) {
  impactsounds[Math.floor(random(1, 5))].play();
  zed.health -= smgbullet.damage;
  player1.maxSpeed = player1.currentSpeed; // free player movement as soon as zed dies
  smgbullet.remove();
  if (zed.health < 1) {
    zombiedeaths[Math.floor(random(1, 5))].play();
    zed.remove();
  }
}
//Zombie is hit by a pistol
function BulletHit(zed, bullet) {
  impactsounds[Math.floor(random(1, 5))].play();
  zed.health -= bullet.damage;
  player1.maxSpeed = player1.currentSpeed;
  bullet.remove();
  if (zed.health < 1) {
    zombiedeaths[Math.floor(random(1, 5))].play();
    zed.remove();
  }
}
//Zombie is hit by a Magnum
function MagnumHit(zed, magnumbullet) {
  impactsounds[Math.floor(random(1, 5))].play();
  zed.health -= magnumbullet.damage;
  player1.maxSpeed = player1.currentSpeed;
  magnumbullet.remove();
  if (zed.health < 1) {
    zombiedeaths[Math.floor(random(1, 5))].play();
    zed.remove();
  }
}

//Zombie is hit by an Assault Rifle
function ArHit(arbullet, zed) {
  impactsounds[Math.floor(random(1, 5))].play();
  zed.health -= arbullet.damage;
  player1.maxSpeed = player1.currentSpeed;
  arbullet.remove();
  if (zed.health < 1) {
    zombiedeaths[Math.floor(random(1, 5))].play();
    zed.remove();
  }
}

function FragHit(shrap, zed){
  impactsounds[Math.floor(random(1, 5))].play();
  zed.health -= shrap.damage;
  shrap.remove();
  if (zed.health < 1) {
    zombiedeaths[Math.floor(random(1, 5))].play();
    zed.remove();
  }
}