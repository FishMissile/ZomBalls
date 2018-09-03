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
    createCanvas(1400, 800);
    background(bg);
    frameRate(120);
    textAlign(CENTER);
    zombieImg = loadImage("img/zombie2.png");
    survivorImg = loadImage("img/survivor.png");
    smgImg = loadImage("img/smg.png");
    medImg = loadImage("img/med.png");
    arImg = loadImage("img/ar.png");
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
        SpawnPlayer()
        SpawnZed();
        BeginLoop();
        currentgun = 0;
        startbutton.remove()
    }

    this.draw = function () {
        StaticRender();
        FixedUpdate();
        MouseControls();
        Update();
        LateUpdate();
        Render();
    }
}

function StaticRender() {
    background(bg);
    fill(75, 10, 10);
    rect(7, 8, 107, 27)
    fill(150, 10, 10);
    rect(11, 11, playerHealth, 22)
    textSize(20)
    textStyle(BOLD)
    text("Score: ", 50, 60);
    text(counter, 98, 61)
    text("phase: ", width/2 - 38, 31)
    text(phase, width/2, 31)
}

function FixedUpdate() {
    Shadow();
    function Shadow() {
        noStroke()
        fill(0, 0, 0, 40);
        ellipse(player1.position.x,player1.position.y+5, 40, 40)
        for (i = 0; i < zeds.length; i++) {
            ellipse(zeds[i].position.x,zeds[i].position.y+5, 40, 40)
        }
      }
}

function Update() {
    Controls();
    HandleHealthbar();

}

function LateUpdate() {
    HitDetection();
    Attack();
    PlayerUpdate();
    updateSprites();
    PauseControl();
}

function Render() {
    drawSprites(zeds);
    drawSprites();
    GameOver();
    Hud()

}

