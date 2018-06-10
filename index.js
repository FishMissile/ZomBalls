var counter = 0;
var playerHealth = 100;
var contact;
var pistolequip;
var smgequip;
var mgr;
var startbutton;
var restart;


function setup() {
    bg = loadImage("img/background.png");
    createCanvas(1000, 600);
    background(bg);
    frameRate(120);
    textAlign(CENTER);
    zombieImg = loadImage("img/zombie2.png");
    survivorImg = loadImage("img/survivor.png");
    smgImg = loadImage("img/smg.png");
    medImg = loadImage("img/med.png");
    magnumImg = loadImage("img/magnum.png");
    useQuadTree(true)
    mgr = new SceneManager();
    mgr.wire();
    mgr.showScene(Intro)
}

function Game() {
    this.setup = function () {
        bg = loadImage("img/background.png");
        background(bg);
        frameRate(120);
        objLayer = new ObjectLayer();
        zeds = new Group();
        bullets = new Group();
        player = new Group();
        pistol = new Group();
        smgs = new Group();
        magnums = new Group();
        zeds = new Group();
        meds = new Group();
        speedboosts = new Group();
        smgbullets = new Group();
        magnumbullets = new Group();
        SpawnPlayer()
        SpawnZed();
        BeginLoop();
        currentgun = 0;
    }

    this.draw = function () {
        startbutton.remove()
        StaticRender();
        FixedUpdate();
        MouseControls();
        Update();
        LateUpdate();
        drawSprites();
        Render();
        
    }
}

function StaticRender() {
    background(bg);
    fill(75, 10, 10);
    rect(7, 8, 107, 27)   
    fill(150, 10, 10);
    rect(11, 11, playerHealth, 22)   
    fill(200, 200, 255);
    stroke(10)
    switch (currentgun) {
        case 1:
            push();
            scale(.75);
            image(smgImg, 20, 85);
            pop();
          break;
        case 0:
          break;
        case 3:
        push();
        scale(.5);
        image(magnumImg, 20, 130);
        pop();  
        break;
        default:
      }
    textSize(20)
    textStyle(BOLD)
    text("Score: ", 50, 60);
    text(counter, 98, 61)
}

function FixedUpdate() {

}

function Update() {
    Controls();
    HandleHealthbar();

}

function LateUpdate() {
    HitDetection();
    Attack();
    PlayerUpdate();
    updateSprites()
    window.onblur = function () {
        clearInterval(interval)
        clearInterval(interval2)
        clearInterval(interval3)
        clearInterval(interval4)
        clearInterval(interval5)
        clearInterval(gunloop)
    }
}

function Render() {
    objLayer.Draw();
    GameOver();

}

var med;
var meds = [];
function MedSpawner() {
    var med = createSprite(random(100, 900), random(100, 600));
    var medImg = loadImage("img/med.png");
    med.addImage(medImg);
    med.debug = false;
    med.setCollider("rectangle", 0, 0, 20, 20);
    med.addToGroup(meds);
  
    meddespawn = setInterval(MedDespawn, 15000)
    function MedDespawn() {
      meds.removeSprites();
      clearInterval(meddespawn)
    }
    return med;
  }

  function MedPickup(player1, med) {
    med.remove();
    playerHealth += 10
  }

  var speedboost;
var speedboosts = [];

function SpeedBoostSpawner() {
    var speedboost = createSprite(random(100, 900), random(100, 600));
    var speedboostImg = loadImage("img/speedboost.png");
    speedboost.addImage(speedboostImg);
    speedboost.debug = false;
    speedboost.setCollider("rectangle", 0, 0, 20, 20);
    speedboost.addToGroup(speedboosts);
    speedboostdespawn = setInterval(SpeedBoostDespawn, 13000)
    function SpeedBoostDespawn() {
        speedboosts.removeSprites();
        clearInterval(speedboostdespawn)
    }

    return speedboost;
  }

  function SpeedBoostPickup(player1, speedboost) {
    speedboost.remove();
    player1.currentSpeed += 5;
    resetspeedboost = setInterval(ClearBoost, 9000)
    function ClearBoost(){
        player1.currentSpeed -= 5;
        clearInterval(resetspeedboost)
    }
  }