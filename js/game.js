// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var increase = true;
canvas.width = 1300;
canvas.height = 620;
document.body.appendChild(canvas);

// Background_base image (will be stationary)
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background_base.png";

// Background_objects image (will be moving)
var bg2Ready = false;
var bg2Image = new Image();
bg2Image.onload = function () {
	bg2Ready = true;
};
bg2Image.src = "images/background2xLength.png";

// Owl image
var owlReady = false;
var owlImage = new Image();
owlImage.onload = function () {
	owlReady = true;
};
owlImage.src = "images/owl.png"; //need to replace with actual owl image

//Obstacle_brick
var obstacleBrickReady = false;
var obstacleBrickImage = new Image();
obstacleBrickImage.onload = function () {
	obstacleBrickReady = true;
};
obstacleBrickImage.src = "images/obstacle_brick.png";

//Obstacle_THead
var obstacleTHeadReady = false;
var obstacleTHeadImage = new Image();
obstacleTHeadImage.onload = function () {
	obstacleTHeadReady = true;
};
obstacleTHeadImage.src = "images/obstacle_trumphead.png";

//Obstacle_TreeA
var obstacleTreeAReady = false;
var obstacleTreeAImage = new Image();
obstacleTreeAImage.onload = function () {
	obstacleTreeAReady = true;
};
obstacleTreeAImage.src = "images/obstacle_treea.png";

//Obstacle_TreeB
var obstacleTreeBReady = false;
var obstacleTreeBImage = new Image();
obstacleTreeBImage.onload = function () {
	obstacleTreeBReady = true;
};
obstacleTreeBImage.src = "images/obstacle_treeb.png";

//Obstacle_CloudA
var obstacleCloudAReady = false;
var obstacleCloudAImage = new Image();
obstacleCloudAImage.onload = function () {
	obstacleCloudAReady = true;
};
obstacleCloudAImage.src = "images/obstacle_clouda.png";

//Obstacle_CloudB
var obstacleCloudBReady = false;
var obstacleCloudBImage = new Image();
obstacleCloudBImage.onload = function () {
	obstacleCloudBReady = true;
};
obstacleCloudBImage.src = "images/obstacle_cloudb.png";

// Mouse image
var mouseReady = false;
var mouseImage = new Image();
mouseImage.onload = function () {
	mouseReady = true;
};
mouseImage.src = "images/mouse.png"; //need to replace with actual mouse image

// Game objects
var owl = {
	speed: 400/*256*/ // movement in pixels per second
};

//image x y coordinate variables
var bg2 = {}
var obstacleBrick = {};
var obstacleTHead = {};
var obstacleTreeA = {};
var obstacleTreeB = {};
var obstacleCloudA = {};
var obstacleCloudB = {};
var mouse = {};

var score = 0;
var spawnObstacleInterval;
var whichObstacle;

var brickSpawned = 0;
var tHeadSpawned = 0;
var treeASpawned = 0;
var treeBSpawned = 0;
var cloudASpawned = 0;
var cloudBSpawned = 0;

var spawnMouseInterval;
var mouseSpawned = 0;

var xDistance;
var yDistance;
var obstacleSpeed = 3;

var owlDead = false;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Initializes variables; Resets the game to the initial defaults
var reset = function () {
	bg2.x = 0;
	bg2.y = 0;
	owl.x = 0;
	owl.y = canvas.height / 2;
	obstacleBrick.x = canvas.width;
	obstacleBrick.y = 380;
	obstacleTHead.x = canvas.width;
	obstacleTHead.y = 150;
	obstacleTreeA.x = canvas.width;
	obstacleTreeA.y = 180;
	obstacleTreeB.x = canvas.width;
	obstacleTreeB.y = 230;
	obstacleCloudA.x = canvas.width;
	obstacleCloudA.y = 20;
	obstacleCloudB.x = canvas.width;
	obstacleCloudB.y = 150;
	mouse.x = 1400;
	mouse.y = 700;
};

// Update game objects
var update = function (modifier) {
	bg2.x-=1;
	if (bg2.x <= -1300){
		bg2.x = 0;
	}
	
	if (38 in keysDown) { // Player holding up
		owl.y -= owl.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		owl.y += owl.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		owl.x -= owl.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		owl.x += owl.speed * modifier;
	}
	
	console.log("X: " + owl.x + "Y: " + owl.y);	
	if(owl.x > canvas.width - 30){
		owl.x = canvas.width - 30;
	}
	if(owl.y > canvas.height - 30){
		owl.y = canvas.height - 30;
	}
	if(owl.x < -10){
		owl.x = -10;
	}
	if(owl.y < -2){
		owl.y = -2;
	}
	
	
	//Spawn Obstacles code
	timeSinceLastObstacle = timer - timerObstacle;
	spawnObstacleInterval = 1 + (Math.random() * 4); //interval >0 sec, <5 sec (0 = min, 5 = max - min)
	if (timeSinceLastObstacle > spawnObstacleInterval){ //setting up stuff so render() will draw obstacle
		whichObstacle = Math.floor(Math.random() * (5)) + 1;
		//whichObstacle = 5;
		switch(whichObstacle){
			case 1:
				if (brickSpawned == 0){
					brickSpawned = 1;
					timerObstacle = timer;
				}
				break;
			case 2:
				if (timer > 7 && (timer - timeSinceLastTHead) > 7){ //value in seconds, 7 only as a test value
					if (tHeadSpawned == 0){
						tHeadSpawned = 1;
						timerObstacle = timer;
					}
				}
				break;
			case 3:
				if (treeASpawned == 0){
					treeASpawned = 1;
					timerObstacle = timer;
				}
				break;
			case 4:
				if (treeBSpawned == 0){
					treeBSpawned = 1;
					timerObstacle = timer;
				}
				break;
			case 5:
				if (cloudASpawned == 0){
					cloudASpawned = 1;
					timerObstacle = timer;
				}
				break;
			case 6: // cloudB vertices not added, so case not complete yet
				if (cloudBSpawned == 0){
					cloudBSpawned = 1;
					timerObstacle = timer;
				}
				break;
		}
	}
	if (brickSpawned == 1){
		obstacleBrick.x-=obstacleSpeed;
		if (obstacleBrick.x <= -85){ //resets obstacle variables
			obstacleBrick.x = canvas.width;
			brickSpawned = 0;
			//obstacleSpawned = 0;
			timerObstacle = timer;
		}
	}
	if (tHeadSpawned == 1){
		obstacleTHead.x-=obstacleSpeed;
		if (obstacleTHead.x <= -75){ //resets obstacle variables
			obstacleTHead.x = canvas.width;
			tHeadSpawned = 0;
			timeSinceLastTHead = timer;
			//obstacleSpawned = 0;
			timerObstacle = timer;
		}
	}
	if (treeASpawned == 1){
		obstacleTreeA.x-=obstacleSpeed;
		if (obstacleTreeA.x <= -305){ //resets obstacle variables
			obstacleTreeA.x = canvas.width;
			treeASpawned = 0;
			timerObstacle = timer;
		}
	}
	if (treeBSpawned == 1){
		obstacleTreeB.x-=obstacleSpeed;
		if (obstacleTreeB.x <= -255){ //resets obstacle variables
			obstacleTreeB.x = canvas.width;
			treeBSpawned = 0;
			timerObstacle = timer;
		}
	}
	if (cloudASpawned == 1){
		obstacleCloudA.x-=obstacleSpeed;
		if (obstacleCloudA.x <= -305){ //resets obstacle variables
			obstacleCloudA.x = canvas.width;
			cloudASpawned = 0;
			timerObstacle = timer;
		}
	}
	if (cloudBSpawned == 1){
		obstacleCloudB.x-=obstacleSpeed;
		if (obstacleCloudB.x <= -305){ //resets obstacle variables
			obstacleCloudB.x = canvas.width;
			cloudBSpawned = 0;
			timerObstacle = timer;
		}
	}

	// Is the owl touching an obstacle?
	// Is the owl touching the wall?
	if (brickSpawned == 1){
		for (var i = obstacleBrick.x + 10; i <= (obstacleBrick.x + 80 - 10); i+=10){ // 80 is brickImage width
			for (var k = obstacleBrick.y + 20; k <= (obstacleBrick.y + 240); k+=20){ // 240 is brickImage height
				xDistance = Math.abs(i - (owl.x + 25)); //25 is owlImage width / 2
				yDistance = Math.abs(k - (owl.y + 25)); //25 is owlImage height /2
				if (
					xDistance <= 20
					&& yDistance <= 20
				) {
					owlDead = true;
				}
			}
		}
	}
	// Is the owl touching the Trump head?
	if (tHeadSpawned == 1){
		for (var i = obstacleTHead.x; i <= (obstacleTHead.x + 70); i+=10){ // 80 is brickImage width
			for (var k = obstacleTHead.y + 5; k <= (obstacleTHead.y + 90); k+=5){ // 240 is brickImage height
				xDistance = Math.abs(i - (owl.x + 25)); //25 is owlImage width / 2
				yDistance = Math.abs(k - (owl.y + 25)); //25 is owlImage height /2
				if (
					xDistance <= 20
					&& yDistance <= 20
				) {
					owlDead = true;
				}
			}
		}
	}
	
	if (treeASpawned == 1){
		var treeAVerticesX = [150, 125, 160, 110, 175, 80,  200, 100, 190, 65,  220, 70,  225, 40,  250, 40,  250, 10,  50,  90,  210, 250, 290, 100, 100, 90,  180, 180, 180, 70,  200]; // array of vertice x-coordinates
		var treeAVerticesY = [45,  75,  75,  105, 105, 145, 145, 180, 180, 220, 220, 260, 260, 290, 290, 320, 320, 350, 350, 350, 350, 350, 350, 360, 395, 430, 360, 395, 430, 450, 450]; // array of vertice y-coordinates
		for (var i = 1; i <= treeAVerticesX.length; i++){
			xDistance = Math.abs(obstacleTreeA.x + treeAVerticesX[i] - (owl.x + 25)); //25 is owlImage width / 2 //this is to get the centre of the owl
			yDistance = Math.abs(obstacleTreeA.y + treeAVerticesY[i] - (owl.y + 25)); //25 is owlImage height /2
			if (
				xDistance <= 20
				&& yDistance <= 20
			) {
				owlDead = true;
			}
		}
	}
	
	if (treeBSpawned == 1){
		var treeBVerticesX = [95, 70, 55, 35, 45, 40, 25, 30, 35, 10, 5, 10, 20, 45, 35, 25, 20, 40, 70, 90, 90, 90, 85, 80, 70, 60, 55, 150, 140, 135, 135, 135, 150, 180, 205, 230, 240, 240, 230, 230, 235, 240, 215, 215, 235, 240, 220, 200, 210, 215, 195, 160, 145, 120, 95]; // array of vertice x-coordinates
		var treeBVerticesY = [15, 25, 40, 50, 64, 80, 90, 105, 115, 120, 135, 160, 170, 165, 195, 215, 230, 250, 255, 250, 280, 305, 320, 350, 365, 390, 400, 400, 360, 330, 310, 280, 255, 235, 245, 250, 250, 235, 215, 200, 185, 160, 140, 135, 100, 95, 80, 65, 50, 40, 30, 35, 20, 15, 15]; // array of vertice y-coordinates
		for (var i = 1; i <= treeBVerticesX.length; i++){
			xDistance = Math.abs(obstacleTreeB.x + treeBVerticesX[i] - (owl.x + 25)); //25 is owlImage width / 2 //this is to get the centre of the owl
			yDistance = Math.abs(obstacleTreeB.y + treeBVerticesY[i] - (owl.y + 25)); //25 is owlImage height /2
			if (
				xDistance <= 20
				&& yDistance <= 20
			) {
				owlDead = true;
			}
		}
	}
	if (cloudASpawned == 1){
		var cloudAVerticesX = [130, 100, 80, 45, 10, 35, 20, 30,  55,  80,  110, 140, 180, 220, 260, 280, 270, 280, 250, 275, 240, 200, 165]; // array of vertice x-coordinates
		var cloudAVerticesY = [0,   15,  25, 30, 30, 55, 75, 100, 115, 115, 120, 120, 130, 130, 125, 100, 80,  60,  45,  20,  20,  20,  15]; // array of vertice y-coordinates
		for (var i = 1; i <= cloudAVerticesX.length; i++){
			xDistance = Math.abs(obstacleCloudA.x + cloudAVerticesX[i] - (owl.x + 25)); //25 is owlImage width / 2 //this is to get the centre of the owl
			yDistance = Math.abs(obstacleCloudA.y + cloudAVerticesY[i] - (owl.y + 25)); //25 is owlImage height /2
			if (
				xDistance <= 20
				&& yDistance <= 20
			) {
				owlDead = true;
			}
		}
	}
	//cloudB needed
	


	// Is the owl touching a mouse?
	if (mouseSpawned == 1){
		if(
			owl.x <= (mouse.x + 32)
			&& mouse.x <= (owl.x + 32)
			&& owl.y <= (mouse.y + 32)
			&& mouse.y <= (owl.y + 32)
		){
			score+=100;
			mouseSpawned = 0;
			timerMouse = timer;
		}
	}
	//Spawning mice code
	if (mouseSpawned == 0){
		timeSinceLastMouse = timer - timerMouse;
		spawnMouseInterval = 2 + (Math.random() * 8); //interval >2 sec, <10 sec
		if (timeSinceLastMouse > spawnMouseInterval){ //setting up stuff so render() will draw obstacle
			if (timer > 5){ //value in seconds, 5 only as a test value
				mouseSpawned = 1;
				timerMouse = timer;
				
				mouse.x = 100 + (Math.random() * 1100);
				mouse.y = 500 + (Math.random() * 50); //adjust the min and max values for the y-axis to change difficulty
			}
		}
		
	}
	else if(mouseSpawned == 1){
		timeSinceLastMouse = timer - timerMouse;
		if (timeSinceLastMouse > 3){ //resets obstacle variables
			mouseSpawned = 0;
			timerMouse = timer;
			mouse.x = 1400;
			mouse.y = 700;
		}
	}
};

// Draw everything
var render = function () {
//	if (bgReady) {
//		ctx.drawImage(bgImage, 0, 0);
//	}
	
	if(bg2Ready){
		ctx.drawImage(bg2Image, bg2.x, bg2.y);
	}
	
	if (owlReady) {
		ctx.drawImage(owlImage, owl.x, owl.y);
	}
	
	if (brickSpawned == 1){
		ctx.drawImage(obstacleBrickImage, obstacleBrick.x, obstacleBrick.y);
	}
	if (tHeadSpawned == 1){
		ctx.drawImage(obstacleTHeadImage, obstacleTHead.x, obstacleTHead.y);
	}
	if (treeASpawned == 1){
		ctx.drawImage(obstacleTreeAImage, obstacleTreeA.x, obstacleTreeA.y);
	}
	if (treeBSpawned == 1){
		ctx.drawImage(obstacleTreeBImage, obstacleTreeB.x, obstacleTreeB.y);
	}
	if (cloudASpawned == 1){
		ctx.drawImage(obstacleCloudAImage, obstacleCloudA.x, obstacleCloudA.y)
	}
	if (cloudBSpawned == 1){
		ctx.drawImage(obstacleCloudBImage, obstacleCloudB.x, obstacleCloudB.y)
	}
	
	if (mouseSpawned == 1){
		ctx.drawImage(mouseImage, mouse.x, mouse.y);
		//ctx.fillText("mouse drawn", 500, 32);
	}


	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Score: " + score, 32, 32);
	//ctx.fillText(brickSpawned, 1000, 30)
	//ctx.fillText(treeASpawned, 1000, 60);
	//ctx.fillText(treeBSpawned, 1000, 90);
	//ctx.fillText(cloudASpawned, 1000, 120);
	//ctx.fillText(tHeadSpawned, 1000, 150);
	//ctx.fillText(obstacleSpeed, 1000, 32);
};

// The main game loop
var main = function () {
	
	//start audio
	window.onload = function(){
		document.getElementById("aud").play();
	}
	
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	
	
	if (owlDead == true){
		//ask for username and save score
		var username = prompt("You got a score of " + score + ". Enter a username to save your score: ");
		if(username == "" || username == null || username == false){
			window.location = "/end.html";
			return;
		}
		var scoreobj = JSON.parse(localStorage.getItem('scores'));
		
		if(jQuery.isEmptyObject(scoreobj)){
	  		scoreobj = {};
	  	
		}
			  
		scoreobj[username] = score;
			  
		console.log(JSON.stringify(scoreobj));
			  
		localStorage.setItem('scores', JSON.stringify(scoreobj));
		
		//redirect to ending page
		window.location = "/end.html";
		return;
	}
	
	//Timer & Score calculation
	timer += delta / 1000;
	if (Math.round(timer) > oldTimer){
		score+=10;
		oldTimer = Math.round(timer);
	}
	if (Math.round(timer) % 5 == 0 && increase == true)
	{
		obstacleSpeed++;
		increase = false;
	}
	if (Math.round(timer) % 5 != 0)
	{
		increase = true;	
	}
	
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
var timer = 0;
var oldTimer = 0;
var timeSinceLastObstacle = 0;
var timeSinceLastMouse = 0;
var timeSinceLastTHead = 0;
var timerObstacle = 0;
var timerMouse = 0;
reset();
main();



