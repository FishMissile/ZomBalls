var bullets = [];
var smg;
var smgs = [];
var smgbullets = [];
var smgbullet;
var guns = [];
var magnums = [];
var magnumbullets = [];
var smgbulletinterval;
var arbulletinterval;
var smgloop;
var magnumloop;
var arloop;
var ars = [];
var arbullets = [];
var cooldown = 1;
var fragcount = 20;
var frags = [];
var shrap;
var grenades = [];
var nadecooldown = 1

window.addEventListener("contextmenu", function(e) {
  e.preventDefault();
});


//Fires the pistol
function PistolFire() {
  var bullet = createSprite(player1.position.x, player1.position.y);

  bullet.draw = function() {
    fill(255, 255, 255);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    rect(0, 0, 5, 2);
  };
  bullet.setSpeed(10, player1.rotation - random(3, -3));
  bullet.debug = false;
  bullet.setCollider("rectangle", 0, 0, 5, 5);
  bullet.mass = 0;
  bullet.damage = 20;
  pistolfire.play();
  bullet.addToGroup(bullets);
  //remove bullet after 1 second
  setTimeout(Remover, 1000, bullet); //remove bullet after 1 second
  setTimeout(CoolIt, 200); //Cooldown after firing
}

//Fires the SMG
function SmgFire() {
  var smgbullet = createSprite(player1.position.x, player1.position.y);
  smgbullet.draw = function() {
    fill(255, 200, 200);
    ellipse(0, 0, 6, 6);
  };

  smgbullet.setSpeed(10, player1.rotation - random(10, -10));
  smgbullet.debug = false;
  smgbullet.setCollider("rectangle", 0, 0, 5, 5);
  smgbullet.mass = 0.1;
  smgbullet.damage = 20;
  smgfire.play();
  smgbullet.addToGroup(smgbullets);

  setTimeout(Remover, 1000, smgbullet);
  setTimeout(CoolIt, 300);
}

//Fires the Magnum
function MagnumFire() {
  var magnumbullet = createSprite(player1.position.x, player1.position.y);
  magnumbullet.draw = function() {
    fill(255, 255, 255);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    rect(0, 0, 9, 6);
  };
  magnumbullet.setSpeed(10, player1.rotation - random(10, -10));
  magnumbullet.debug = false;
  magnumbullet.setCollider("rectangle", 0, 0, 10, 10);
  magnumbullet.mass = 7;
  magnumbullet.damage = 80;
  magnumfire.play();
  magnumbullet.addToGroup(magnumbullets);

  setTimeout(Remover, 1000, magnumbullet);

  setTimeout(CoolIt, 500);
}

function ArFire() {
  var arbullet = createSprite(player1.position.x, player1.position.y);
  arbullet.draw = function() {
    fill(255, 255, 255);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    rect(0, 0, 5, 2);
  };

  arbullet.setSpeed(10, player1.rotation - random(5, -5));
  arbullet.debug = false;
  arbullet.setCollider("rectangle", 0, 0, 5, 5);
  arbullet.mass = 0.1;
  arbullet.damage = 20;
  arfire.play();
  arbullet.addToGroup(arbullets);

  setTimeout(Remover, 1000, arbullet);
  setTimeout(CoolIt, 300);
}

function GrenadeFire() {
  var grenade = createSprite(player1.position.x, player1.position.y);

  grenade.draw = function() {
    fill(32, 193, 32);
    stroke(1);
    rotate(atan2(pmouseY - player1.position.y, pmouseX - player1.position.x));
    ellipse(0, 0, 8, 8);
  };
  grenade.setSpeed(2, player1.rotation - random(2, -2));
  grenade.debug = false;
  grenade.setCollider("rectangle", 0, 0, 8, 8);
  grenade.addToGroup(grenades);
  grenade.mass = 2;
  player1.nadecount -= 1
  setTimeout(() => {
    Shrapnel(grenade);

    grenade.remove();
  }, 700);

  //remove grenade after 1 second

  setTimeout(()=>{
    nadecooldown = 1
  }, 1000); //Cooldown after throwing
}
function Shrapnel(grenade) {
  for (let i = 0; i < fragcount; i++) {
    grenadesound.setVolume(0.2)
    grenadesound.play()
    var shrap = createSprite(grenade.position.x, grenade.position.y);
    shrap.setSpeed(7, random(0, 359));
    shrap.setCollider("circle", 0, 0, 7, 7);
    shrap.mass = 0.1;
    shrap.damage = 50;
    shrap.addToGroup(frags);
    shrap.draw = () => {
      for (let i = 0; i < frags.length; i++) {
        fill(255, 255, 255);
        ellipse(0, 0, 3, 3);
      }
    };
  }
  setTimeout(() => {
    frags.removeSprites()
  }, 250);
}
//Player walks on an SMG
function SmgPickup(player1, smg) {
  if ((currentgun = 1)) {
    clearInterval(smgloop);
  }
  currentgun = 1;
  smg.remove();
  smgloop = setInterval(SmgLoop, 20000);
  clearInterval(arbulletinterval);
}

function GrenadePickup(player1, grenadeitem) {
  player1.nadecount += 3
  grenadeitem.remove();

}
//Player walks on a Magnum
function MagnumPickup(player1, magnum) {
  if ((currentgun = 3)) {
    clearInterval(magnumloop);
  }
  currentgun = 3;
  magnum.remove();
  clearInterval(smgbulletinterval);
  clearInterval(arbulletinterval);
  magnumloop = setInterval(MagnumLoop, 20000);
}
//Player walks on an AssaultRifle
function ArPickup(player1, ar) {
  if ((currentgun = 4)) {
    clearInterval(arloop);
  }
  currentgun = 4;
  ar.remove();
  arloop = setInterval(ArLoop, 20000);
  clearInterval(smgbulletinterval);
}

//SMG runs out after 20 seconds
function SmgLoop() {
  if (currentgun == 1) {
    currentgun = 0;
    clearInterval(smgloop);
    clearInterval(smgbulletinterval);
  }
}

//Magnum runs out after 20 seconds
function MagnumLoop() {
  if (currentgun == 3) {
    currentgun = 0;
    clearInterval(magnumloop);
  }
}
//SMG runs out after 20 seconds
function ArLoop() {
  if (currentgun == 4) {
    currentgun = 0;
    clearInterval(arloop);
    clearInterval(arbulletinterval);
  }
}

var Remover = thisbullet => {
  thisbullet.remove();
};

function CoolIt() {
  cooldown = 1;
}