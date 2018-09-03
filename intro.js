function Intro(){
    this.draw = function()    {
        drawIntroScreen();        
    }

    this.keyPressed = function()
    {
        if ( key === "32" )
        {
            console.log("KeyLOGGGGGEd")
            // Invoke the Game scene passing as argument the string '1' or '2'
            this.sceneManager.showScene( Game );
        }
    } 

    function drawIntroScreen()
    {
        background(50)
        
        textSize(24);
        textAlign(CENTER);
        fill("green");
        text("Use WASD to move", width / 2, 50);

        fill("white");
        textSize(18);

        text("Aim with the mouse and click to shoot.", width / 2, height / 2 - 30);
        text("Press Space Bar to begin.", width / 2, height / 2 + 20);
        

    }

}
