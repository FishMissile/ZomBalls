var counter = 0;
var playerHealth = 100;
var mgr;
var impactsounds;
var zombiedeaths;
var musictoggle = 1;
var sfxtoggle = 1;
var imgpos = 20;
var pausestate = false;

function preload() {
  soundFormats("mp3", "ogg");
  music = loadSound("audio/music.mp3");
  impactsound1 = loadSound("audio/bulletimpact1.mp3");
  impactsound2 = loadSound("audio/bulletimpact2.mp3");
  impactsound3 = loadSound("audio/bulletimpact3.mp3");
  impactsound4 = loadSound("audio/bulletimpact4.mp3");
  impactsound5 = loadSound("audio/bulletimpact5.mp3");
  zombiedeath1 = loadSound("audio/zombiedeath1.mp3");
  zombiedeath2 = loadSound("audio/zombiedeath2.mp3");
  zombiedeath3 = loadSound("audio/zombiedeath3.mp3");
  zombiedeath4 = loadSound("audio/zombiedeath4.mp3");
  zombiedeath5 = loadSound("audio/zombiedeath5.mp3");
  smgfire = loadSound("audio/smgfire.mp3");
  pistolfire = loadSound("audio/pistolfire.mp3");
  arfire = loadSound("audio/arfire.mp3");
  magnumfire = loadSound("audio/magnumfire.mp3");
  grenadesound = loadSound("audio/grenade.mp3");
  zombieImg = loadImage("img/zombie2.png");
  bigzombieImg = loadImage("img/zombie.png");
  survivorImg = loadImage("img/survivor.png");
  smgImg = loadImage("img/smg.png");
  medImg = loadImage("img/med.png");
  arImg = loadImage("img/ar.png");
  magnumImg = loadImage("img/magnum.png");
  grenadeimg = loadImage("img/grenade.png");

  impactsounds = [
    impactsound1,
    impactsound2,
    impactsound3,
    impactsound4,
    impactsound5
  ];
  zombiedeaths = [
    zombiedeath1,
    zombiedeath2,
    zombiedeath3,
    zombiedeath4,
    zombiedeath5
  ];
}

function setup() {
  masterVolume(0.2);
  bg = loadImage("img/background.png");
  createCanvas(1400, 800);
  background(bg);
  frameRate(60);
  textAlign(CENTER);

  useQuadTree(true);
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(Intro);
}

function Game() {
  this.setup = function() {
    startbutton.remove();
    musicbutton.remove();
    sfxbutton.remove();
    bg = loadImage("img/background.png");
    background(bg);
    frameRate(120);
    zeds = new Group();
    bullets = new Group();
    player = new Group();
    pistol = new Group();
    smgs = new Group();
    magnums = new Group();
    ars = new Group();
    zeds = new Group();
    meds = new Group();
    speedboosts = new Group();
    smgbullets = new Group();
    magnumbullets = new Group();
    arbullets = new Group();
    frags = new Group();
    grenades = new Group();
    grenadeitems = new Group();
    SpawnPlayer();
    SpawnZed();
    MainLoop();
    currentgun = 0; //Sets starting gun to pistol
    music.play();
  };

  this.draw = function() {
    StaticRender();

    FixedUpdate();
    MouseControls();
    Update();
    LateUpdate();
    Render();
  };
  this.keyPressed = function() {
    if (keyCode === 80) {
      if(pausestate == false){
        
        noLoop()
      } else {
        loop()
      }
    }
  }

}

function StaticRender() {
  GameOver();
  background(bg);
  push();
  fill(75, 10, 10);
  rect(7, 8, 107, 27); //Healthbar background
  fill(150, 10, 10);
  rect(11, 11, playerHealth, 22); //Healthbar
  textSize(20);
  textStyle(BOLD);
  fill(0, 0, 0);
  //Display score and current phase
  rect(13, 42, 110, 22);
  rect(width / 2 - 80, 13, 90, 24);
  fill(200, 10, 10);
  text("Score: ", 50, 60);
  text(counter, 105, 61);
  text("phase: ", width / 2 - 38, 31);
  text(phase, width / 2, 31);
  pop();

  var initpos = 250;
  for (let i = 0; i < player1.nadecount; i++) {
    push();
    scale(0.08);
    image(grenadeimg, initpos, 1200);
    pop();
    initpos += 150;
  }
}

function FixedUpdate() {
  Shadow();
  //Draw small shadows under player and zeds
  function Shadow() {
    noStroke();
    fill(0, 0, 0, 40);
    ellipse(player1.position.x, player1.position.y + 5, 40, 40);
    for (i = 0; i < zeds.length; i++) {
      ellipse(zeds[i].position.x, zeds[i].position.y + 5, 40, 40);
    }
  }
}

function Update() {
  Controls();
  HandleHealthbar();
}

function LateUpdate() {
  Attack();
  PlayerUpdate();
  updateSprites();
  PauseControl();
}

function Render() {
  drawSprites();

  Hud();
}
