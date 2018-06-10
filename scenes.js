//intro Screen
function Intro() {
    this.setup = function () {
        setupIntroScreen()
    }
    //Initialize Intro scene
    function setupIntroScreen() {
        startbutton = createButton('Start')
        startbutton.position(width / 2 - 30, height / 2 - 8)
        startbutton.style('background-color', "green")
        startbutton.style('border-color', "black")
        startbutton.style("font-size", "30px")
        startbutton.style("cursor", "pointer")
        startbutton.style("border-radius", "8px")

        startbutton.show();

    }
    this.draw = function () {
        drawIntroScreen();
    }
    //Draw intro scene
    function drawIntroScreen() {
        background(bg);
        stroke(20);
        textStyle(BOLD);
        textAlign(CENTER);
        startbutton.mouseOver(Hover)
        startbutton.mouseOut(HoverOut);
        function Hover() {
            startbutton.style('background-color', "lime")           
        }
        function HoverOut() {
            startbutton.style('background-color', "green")
        }
        startbutton.mouseClicked(Start);
        function Start() {
            mgr.showScene(Game);
            startbutton.hide();
        };
        textSize(36);

        fill("green");
        text("ZomBalls", width / 2, 200);

        textStyle(BOLD);
        textSize(12);
        textStyle("text-shadow", "4px 4px")
        text("Use WASD keys to move and use Left Click to fire.", width / 2, height / 2 - 30);
        text("How long can you survive the ZomBalls?", width / 2, height / 2 + 50);

    }

}



//Game Over screen
function Outro() {
    this.setup = function () {
        setupOutroScreen();
    }
    //Setup Game Over scene
    function setupOutroScreen() {
        restart = createButton('Restart')
        restart.position(width / 2 - 50, height / 2)
        restart.mouseClicked(Restart)
        restart.mousePressed(BeginLoop)
        restart.style('background-color', "green")
        restart.style('border-color', "black")
        restart.style("font-size", "30px")
        restart.style("cursor", "pointer")
        restart.style("border-radius", "8px")
        restart.show();
    }
    this.draw = function () {
        drawOutroScreen();
    }
    //Draw Game Over scene
    function drawOutroScreen() {
        restart.show()
        background(bg)
        textSize(36);
        textStyle(BOLD);
        textAlign(CENTER);

        restart.mouseOver(Hover)
        restart.mouseOut(HoverOut);
        function Hover() {
            restart.style('background-color', "lime")           
        }
        function HoverOut() {
            restart.style('background-color', "green")
        }
        fill("black");
        // rect(width/2 - 83, height/2 - 70, 160, 25 )
        stroke(20)
        fill("red");
        text("Game Over", width / 2, 150);
        textSize(20);
        textStyle("text-shadow", "4px 4px")
        var finalscore = text("Final Score: ", width / 2 - 20, height / 2 - 50);
        finalscore.textStyle("text-shadow", "2px 2px 4px #000000")
        text(counter, width / 2 + 65, height / 2 - 49);
        text("You fucked up.", width / 2, height / 2 - 120);
    }

    //Reset EVERYTHING before starting a new game
    function Restart() {
        restart.hide();
        counter = 0
        playerHealth = 100
        currentgun = 0;
        player1.position.x = width / 2;
        player1.position.y = height / 2 - 100;
        zeds.removeSprites();
        bullets.removeSprites();
        smgbullets.removeSprites();
        magnumbullets.removeSprites();
        mgr.showScene(Game)
    };
}