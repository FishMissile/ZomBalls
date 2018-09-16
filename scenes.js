//intro Screen

function Intro() {
  this.preload = function() {};
  this.setup = function() {
    setupIntroScreen();
    music = loadSound("audio/music.mp3");
  };
  //Initialize Intro scene
  function setupIntroScreen() {
    startbutton = createButton("Start");
    startbutton.position(width / 2 - 30, height / 2 - 8);
    startbutton
      .style("background-color", "green")
      .style("border-color", "black")
      .style("font-size", "30px")
      .style("cursor", "pointer")
      .style("border-radius", "8px");

    startbutton.show();
  }

  musicbutton = createButton("Music");
  musicbutton.position(20, height - 50);
  musicbutton
    .style("background-color", "green")
    .style("border-color", "black")
    .style("font-size", "30px")
    .style("cursor", "pointer")
    .style("border-radius", "8px");

  musicbutton.show();

  sfxbutton = createButton("SFX");
  sfxbutton.position(130, height - 50);
  sfxbutton
    .style("background-color", "green")
    .style("border-color", "black")
    .style("font-size", "30px")
    .style("cursor", "pointer")
    .style("border-radius", "8px");

  sfxbutton.show();

  this.draw = function() {
    drawIntroScreen();
  };
  //Draw intro scene
  function drawIntroScreen() {
    background(bg);
    stroke(20);
    textStyle(BOLD);
    textAlign(CENTER);

    function SfxHover() {
      if (sfxtoggle == 1) {
        sfxbutton.style("background-color", "lime");
      }
      if (musictoggle == 0) {
        sfxbutton.style("background-color", "red");
      }
    }
    function SfxHoverOut() {
      if (sfxtoggle == 1) {
        sfxbutton.style("background-color", "green");
      }
      if (sfxtoggle == 0) {
        sfxbutton.style("background-color", "maroon");
      }
    }

    function MusicHover() {
      if (musictoggle == 1) {
        musicbutton.style("background-color", "lime");
      }
      if (musictoggle == 0) {
        musicbutton.style("background-color", "red");
      }
    }
    function MusicHoverOut() {
      if (musictoggle == 1) {
        musicbutton.style("background-color", "green");
      }
      if (musictoggle == 0) {
        musicbutton.style("background-color", "maroon");
      }
    }
    function StartHover() {
      startbutton.style("background-color", "lime");
    }
    function StartHoverOut() {
      startbutton.style("background-color", "green");
    }
    startbutton.mouseClicked(Start);

    function ToggleMusic() {
      if (musictoggle == 1) {
        musictoggle = 0;
        music.setVolume(0);
        musicbutton.style("background-color", "red");
      } else {
        musictoggle = 1;
        music.setVolume(0.5);
        musicbutton.style("background-color", "lime");
      }
    }

    function ToggleSfx() {
      if (sfxtoggle == 1) {
        sfxtoggle = 0;
        impactsound1.setVolume(0);
        impactsound2.setVolume(0);
        impactsound3.setVolume(0);
        impactsound4.setVolume(0);
        impactsound5.setVolume(0);
        zombiedeath1.setVolume(0);
        zombiedeath2.setVolume(0);
        zombiedeath3.setVolume(0);
        zombiedeath4.setVolume(0);
        zombiedeath5.setVolume(0);
        smgfire.setVolume(0);
        pistolfire.setVolume(0);
        arfire.setVolume(0);
        magnumfire.setVolume(0);
        sfxbutton.style("background-color", "red");
      } else {
        sfxtoggle = 1;
        impactsound1.setVolume(0.5);
        impactsound2.setVolume(0.5);
        impactsound3.setVolume(0.5);
        impactsound4.setVolume(0.5);
        impactsound5.setVolume(0.5);
        zombiedeath1.setVolume(0.5);
        zombiedeath2.setVolume(0.5);
        zombiedeath3.setVolume(0.5);
        zombiedeath4.setVolume(0.5);
        zombiedeath5.setVolume(0.5);
        smgfire.setVolume(0.5);
        pistolfire.setVolume(0.5);
        arfire.setVolume(0.5);
        magnumfire.setVolume(0.5);
        sfxbutton.style("background-color", "lime");
      }
    }

    sfxbutton.mouseClicked(ToggleSfx);
    musicbutton.mouseClicked(ToggleMusic);

    musicbutton.mouseOver(MusicHover);
    musicbutton.mouseOut(MusicHoverOut);

    sfxbutton.mouseOver(SfxHover);
    sfxbutton.mouseOut(SfxHoverOut);

    startbutton.mouseOver(StartHover);
    startbutton.mouseOut(StartHoverOut);

    function Start() {
      mgr.showScene(Game);
    }
    textSize(36);

    fill("green");
    text("ZomBalls", width / 2, 200);

    textStyle(BOLD);
    textSize(20);
    textStyle("text-shadow", "4px 4px");
    text(
      "Use WASD keys to move and use Left Click to fire.",
      width / 2,
      height / 2 - 60
    );
    text(
        "Use SPACE BAR to throw grenades.",
        width / 2,
        height / 2 - 30
      );
    text("How long can you survive the ZomBalls?", width / 2, height / 2 + 50);
  }
}

//Game Over screen
function Outro() {
  this.setup = function() {
    setupOutroScreen();
  };
  //Setup Game Over scene
  function setupOutroScreen() {
    music.stop();
    restart = createButton("Restart");
    restart.position(width / 2 - 50, height / 2);
    restart.mouseClicked(Restart);
    restart.mousePressed(BeginLoop);
    restart
      .style("background-color", "green")
      .style("border-color", "black")
      .style("font-size", "30px")
      .style("cursor", "pointer")
      .style("border-radius", "8px");
    restart.show();
  }
  this.draw = function() {
    drawOutroScreen();
  };
  //Draw Game Over scene
  function drawOutroScreen() {
    restart.show();
    background(bg);
    translate(camera.position.x - width / 2, camera.position.y - height / 2);
    textSize(36);
    textStyle(BOLD);
    textAlign(CENTER);

    restart.mouseOver(Hover);
    restart.mouseOut(HoverOut);
    function Hover() {
      restart.style("background-color", "lime");
    }
    function HoverOut() {
      restart.style("background-color", "green");
    }
    fill("black");
    // rect(width/2 - 83, height/2 - 70, 160, 25 )
    stroke(20);
    fill("red");
    text("Game Over", width / 2, 150);
    textSize(20);
    textStyle("text-shadow", "4px 4px");
    var finalscore = text("Final Score: ", width / 2 - 20, height / 2 - 50);
    finalscore.textStyle("text-shadow", "2px 2px 4px #000000");
    text(counter, width / 2 + 65, height / 2 - 49);
    text("You fucked up.", width / 2, height / 2 - 120);
  }

  //Reset EVERYTHING before starting a new game
  function Restart() {
    restart.hide();
    counter = 0;
    playerHealth = 100;
    currentgun = 0;
    player1.position.x = width / 2;
    player1.position.y = height / 2 - 100;
    zeds.removeSprites();
    bullets.removeSprites();
    smgbullets.removeSprites();
    magnumbullets.removeSprites();
    arbullets.removeSprites();
    smgs.removeSprites();
    magnums.removeSprites();
    ars.removeSprites();
    meds.removeSprites();
    speedboosts.removeSprites();
    mgr.showScene(Game);
  }
}
