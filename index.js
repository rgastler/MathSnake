const canvas0 = document.getElementById('game');
const ctx0 = canvas0.getContext('2d');

const canvas3 = document.getElementById('topbar');
const ctx3 = canvas3.getContext('2d');

let health0 = 3;
let score0 = 0;
let c = "#";
let d = "#";
let tileCount0 = 20;
let tileSize0 = canvas0.width / tileCount0 - 2;

clearScreen();
drawProblem(c,d);
drawHealth(health0);
drawScore();

ctx0.fillStyle = 'white';
ctx0.font = "18px Verdana";
ctx0.fillText("Choose your level by pressing the ", 45, 40);
ctx0.fillText("corresponding # key.", 90, 60);
ctx0.fillText("Harder levels have score multipliers.", 35, 90);

ctx0.font = "28px Verdana";
ctx0.fillText("0: ", 50,150);
ctx0.fillText("1: ", 50,200);
ctx0.fillText("2: ", 50,250);
ctx0.fillText("3: ", 50,300);
ctx0.fillText("4: ", 50,350);

ctx0.fillStyle = 'yellow';
ctx0.fillText("# + #", 135,150);
ctx0.fillText("# - #", 140,200);
ctx0.fillText("-# + #", 130,250);
ctx0.fillText("# - -#", 135,300);
ctx0.fillText("Mix", 150,350);

ctx0.font = "18px Verdana";
ctx0.fillStyle = 'white';
ctx0.fillText("Score x1", 280,150);
ctx0.fillText("Score x2", 280,200);
ctx0.fillText("Score x2", 280,250);
ctx0.fillText("Score x2", 280,300);
ctx0.fillText("Score x5", 280,350);

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
	if(event.keyCode == 48){
		openMathSnake(0);
	}
	if(event.keyCode == 49){
		openMathSnake(1);
	}
	if(event.keyCode == 50){
		openMathSnake(2);
	}
	if(event.keyCode == 51){
		openMathSnake(3);
	}
	if(event.keyCode == 52){
		openMathSnake(4);
	}
}

function openMathSnake(level){
	fileName = "MathSnake" + level + ".html";
	window.open(fileName);
}

function drawProblem(a,b){
	ctx3.fillStyle = 'yellow';
	ctx3.font = "30px Verdana";
	ctx3.fillText(a + " + " + b, canvas3.width/2 - 40, 30);
}

function clearScreen(){
	ctx0.fillStyle = 'black';
	ctx0.fillRect(0,0,canvas0.width,canvas0.height);
	ctx3.fillStyle = 'black';
	ctx3.fillRect(0,0,canvas3.width,canvas3.height);
}

function drawScore(){
	ctx3.fillStyle = 'white';
	ctx3.font = "16px Verdana";
	ctx3.fillText("Score: " + score0, canvas3.width - 85, 25);
}

function drawHealth(health){
	ctx3.strokeStyle = 'white';
	for(let i=0; i<3; i++){
		ctx3.strokeRect(10+i*(tileSize0+5),9,tileSize0,tileSize0);
	}	
	ctx3.fillStyle = 'orange';
	for(let i=0; i<health; i++){
		ctx3.fillRect(10+i*(tileSize0+5),9,tileSize0,tileSize0);
	}	
}