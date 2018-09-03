//Spawns a random zombie
var zeds = [];
var spots1;
var topspots;
var sidespots;

function SpawnZed() {
  //   Border zones
  var firstcoord;
  var secondcoord;
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

  spots1 = [returnTop, returnBottom, returnLeft, returnRight];
  topspots = [returnTop, returnBottom];
  sidespots = [returnLeft, returnRight];

  function returnCoords() {

    get_random = function(list) {
      return list[Math.floor(Math.random() * list.length)];//get a random item from an array
    };
    firstcoord = get_random(spots1); //get a random object from the spots array
    secondcoord;
    
    if (firstcoord.location === "top") {
      secondcoord = get_random(topspots);
    } else if (firstcoord.location === "left") {
      secondcoord = get_random(sidespots);
    } else if (firstcoord.location === "right") {
      secondcoord = get_random(sidespots);
    } else if (firstcoord.location === "bottom") {
      secondcoord = get_random(topspots);
    }

  }
  returnCoords();
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
  zed.health -= 20;
  smgbullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//Zombie is hit by a pistol
function BulletHit(zed, bullet) {
  zed.health -= 20;
  bullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//Zombie is hit by a Magnum
function MagnumHit(zed, magnumbullet) {
  zed.health -= 80;
  magnumbullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//Zombie is hit by an Assault Rifle
function ArHit(arbullet, zed) {
  zed.health -= 20;
  arbullet.remove();
  if (zed.health < 1) {
    zed.remove();
  }
}
//zombie contacts a player
function HitDetection() {
  for (i = 0; i < zeds.length; i++) {
    if (
      player1.position.x - zeds[i].position.x <= 55 &&
      player1.position.y - zeds[i].position.y <= 55 &&
      player1.position.x - zeds[i].position.x >= -55 &&
      player1.position.y - zeds[i].position.y >= -55
    ) {
      player1.maxSpeed = 0.1;
      playerHealth -= 0.07;
      zeds[i].maxSpeed = 0.1;
      contact = true;
    } else {
      player1.maxSpeed = player1.currentSpeed;
      zeds[i].maxSpeed = zeds[i].normalSpeed;
      contact = false;
    }
  }
}
