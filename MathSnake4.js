const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('topbar');
const ctx2 = canvas2.getContext('2d');

class SnakePart{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
}

class Apple{
	constructor(x,y,num,correct){
		this.x = x;
		this.y = y;
		this.num = num;
		this.correct = correct;
	}
}

let speed = 7;
let health = 3;

let level = 0;
let multiplier = 5;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = []; 
let tailLength = 2;
const colors = ['#146CF6', '#00B7D8', '#00D4B0', '#00F800']; 
let snakeColor = colors[0];

const apples = [];
let appleX = 5;
let appleY = 5;
xlist = [];
ylist = [];

let a = 0;
let b = 0;
let c = 0;
let xpos = 0;
let ypos = 0;
let num = 0;
let correct = false;

level = Math.floor(Math.random()*5);

generatePositions();
if(level == 0){
	while(a==0){
		a = Math.floor(Math.random()*10);
	}
	while(b==0){
		b = Math.floor(Math.random()*10);
	}
	for(let i=0; i<4; i++){

		correct = false;
		xpos = xlist[i];
		ypos = ylist[i];

		if(i==0){
			num = a+b;
		}
		else if(i==1){
			num = a+b+1;
		}
		else if(i==2){
			num = b+a+2
		}
		else if(i==3){
			num = a+b-1;
		}
		if(i==0){
			correct = true;
		}
		apples.push(new Apple(xpos,ypos,num,correct));
	}
} else if(level == 1){
	while(a==0){
		a = Math.floor(Math.random()*10);
	}
	while(b==0){
		b = Math.floor(Math.random()*10);
	}
	for(let i=0; i<4; i++){

		correct = false;
		xpos = xlist[i];
		ypos = ylist[i];

		if(i==0){
			num = a-b;
		}
		else if(i==1){
			num = a-b+Math.floor(Math.random()*4)-2;
			if(num == a-b){
				num = num+1;
			}
		}
		else if(i==2){
			if(a==b){
				num = 1;
			}
			else {
				num = b-a;
			}
		}
		else if(i==3){
			num = -(a+b);
		}
		if(i==0){
			correct = true;
		}
		apples.push(new Apple(xpos,ypos,num,correct));
	}
} else if(level == 2) {
	while(a==0){
		a = Math.floor(Math.random()*-10);
	}
	while(b==0){
		b = Math.floor(Math.random()*10);
	}
	for(let i=0; i<4; i++){

		correct = false;
		xpos = xlist[i];
		ypos = ylist[i];

		if(i==0){
			num = a+b;
		}
		else if(i==1){
			num = b-a;
		}
		else if(i==2){
			num = a-b;
		}
		else if(i==3){
			num = -(a+b);
			if(a+b==0){
				num = 1;
			}
		}
		if(i==0){
			correct = true;
		}
		apples.push(new Apple(xpos,ypos,num,correct));
	}
} else if(level == 3) {
	while(a==0){
		a = Math.floor(Math.random()*10);
	}
	while(b==0){
		b = Math.floor(Math.random()*-10);
	}
	for(let i=0; i<4; i++){

		correct = false;
		xpos = xlist[i];
		ypos = ylist[i];

		if(i==0){
			num = a-b;
		}
		else if(i==1){
			num = a+b;
		}
		else if(i==2){
			num = b-a;
		}
		else if(i==3){
			num = -(a+b);
			if(a+b == 0)
				num = 1;
		}
		if(i==0){
			correct = true;
		}
		apples.push(new Apple(xpos,ypos,num,correct));
	}
} else if(level == 4) {
	while(a==0){
		a = Math.floor(Math.random()*-10);
	}
	while(b==0){
		b = Math.floor(Math.random()*-10);
	}
	for(let i=0; i<4; i++){

		correct = false;
		xpos = xlist[i];
		ypos = ylist[i];

		if(i==0){
			num = a-b;
		}
		else if(i==1){
			num = a+b;
		}
		else if(i==2){
			num = b-a;
			if(b-a == 0)
				bum = 1;
		}
		else if(i==3){
			num = -(a+b);
		}
		if(i==0){
			correct = true;
		}
		apples.push(new Apple(xpos,ypos,num,correct));
	}
}



let xVelocity = 0;
let yVelocity = 0;

let score = 0;

// game loop
function drawGame(){
	changeSnakePosition();
	let result = isGameOver();
	if(result){
		return;
	}

	clearScreen();

	checkAppleCollision(apples);
	for(let i=0; i<apples.length; i++){
		drawApple(apples[i]);
	}
	if(xVelocity == 0 && yVelocity == 0 && result == false)
		drawDirections();
	drawSnake();
	drawScore();
	drawHealth(health);
	drawProblem(a,b);
	setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
	let gameOver = false;

	if(yVelocity === 0 && xVelocity === 0){
		return false;
	}
	
	// walls
	if(headX < 0){
		gameOver = true;
	}
	else if(headX == tileCount){
		gameOver = true;
	}
	else if(headY < 0){
		gameOver = true;
	}
	else if(headY == tileCount){
		gameOver = true;
	}

	// Snake body
	for(let i=0; i<snakeParts.length; i++){
		let part = snakeParts[i];
		if(part.x === headX && part.y === headY){
			gameOver = true;
			break;
		}
	}

	if(snakeColor == colors[3]){
		gameOver = true;
	}

	if(gameOver){
		ctx.fillStyle = "white";
		ctx.font = "50px Verdana";
		
		ctx.fillText("Game Over!", canvas.width/6.5, canvas.height /2 - 70);

		ctx.font = "40px Verdana";
		ctx.fillText("Score: " + score*multiplier, canvas.width/3.5, canvas.height /2 + 30);

		ctx.font = "18px Verdana";
		ctx.fillText("Refresh your browser to try again.", 50,300);
	}
	
	return gameOver;
}

function drawScore(){
	ctx2.fillStyle = 'white';
	ctx2.font = "16px Verdana";
	ctx2.fillText("Score: " + score*multiplier, canvas2.width - 100, 25);
}

function drawHealth(health){
	ctx2.strokeStyle = 'white';
	for(let i=0; i<3; i++){
		ctx2.strokeRect(10+i*(tileSize+5),9,tileSize,tileSize);
	}	
	ctx2.fillStyle = 'orange';
	for(let i=0; i<health; i++){
		ctx2.fillRect(10+i*(tileSize+5),9,tileSize,tileSize);
	}	
}

function clearScreen(){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx2.fillStyle = 'black';
	ctx2.fillRect(0,0,canvas2.width,canvas2.height);
}

function drawSnake(){

	ctx.fillStyle = snakeColor;
	ctx.shadowBlur = 10;
	ctx.shadowColor = "white";
	for(let i = 0; i < snakeParts.length; i++){
		let part = snakeParts[i];
		ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
	}

	snakeParts.push(new SnakePart(headX,headY)); // put an item at the end of the list next to head
	if(snakeParts.length > tailLength){
		snakeParts.shift(); // remove the farthest item from snake parts if we have more than tailSize
	}

	ctx.fillStyle = '#FF8300';
	ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function changeSnakePosition(){
	headX = headX + xVelocity;
	headY = headY + yVelocity;
}

function drawProblem(a,b){
	ctx2.fillStyle = 'yellow';
	ctx2.font = "30px Verdana";
	if(level == 0){
		ctx2.fillText(a + " + " + b, canvas2.width/2 - 40, 30);
	} else if(level == 1){
		ctx2.fillText(a + " - " + b, canvas2.width/2 - 40, 30);
	} else if(level == 2){
		ctx2.fillText(a + " + " + b, canvas2.width/2 - 40, 30);
	} else if(level == 3){
		ctx2.fillText(a + " - " + b, canvas2.width/2 - 40, 30);
	} else if(level == 4){
		ctx2.fillText(a + " - " + b, canvas2.width/2 - 40, 30);
	}
}


function drawApple(apple){
	let app = apple;
	let ans = app.num;
	ctx.fillStyle = '#FF00CC';
	ctx.shadowBlur = 20;
	ctx.shadowColor = "white";
	ctx.fillRect(app.x * tileCount, app.y * tileCount, tileSize, tileSize);
	ctx.fillStyle = 'white';
	if(ans>=10){
		ctx.font = "bold 10px Verdana";
		ctx.fillText(ans, app.x*tileCount+tileSize/6, app.y*tileCount+tileSize*2/3);
	}
	else if(ans<=-10) {
		ctx.font = "bold 8px Verdana";
		ctx.fillText(ans, app.x*tileCount+tileSize/8, app.y*tileCount+tileSize*2/3);
	}
	else if(ans<0){
		ctx.font = "bold 12px Verdana";
		ctx.fillText(ans, app.x*tileCount+tileSize/8, app.y*tileCount+tileSize*3/4);
	}
	else{
		ctx.font = "bold 12px Verdana";
		ctx.fillText(ans, app.x*tileCount+tileSize/3, app.y*tileCount+tileSize*3/4);
	}

}

function drawDirections(){
	ctx.fillStyle = "white";
	ctx.font = "20px Verdana";
	ctx.fillText("Press an arrow key to", 90,50);
	ctx.fillText("start moving.", 140,100);
}


function checkAppleCollision(apples){
	let generating = true;
	let oops = false;
	for(let i=0; i<apples.length; i++){
		if(apples[i].x == headX && apples[i].y == headY){
			if(i==0){
				tailLength++;
				score++;
				if(score%10==0){
					speed++;
				}
				a = 0;
				b = 0;
				while(a==0){
					a = Math.floor(Math.random()*10);
				}
				while(b==0){
					b = Math.floor(Math.random()*10);
				}

				level = Math.floor(Math.random()*5);
				generatePositions();
				for(let i=0; i<apples.length; i++){
					apples[i].x = xlist[i];
					apples[i].y = ylist[i];
				}
				generating = true;
				oops = false;
				while(generating == true){
					for(let i=0; i<4; i++){
						if(xVelocity == 1){
							if(apples[i].y == headY && apples[i].x >= headX && apples[i].x <= headX+10){
								oops = true;
							}
						}
						if(xVelocity == -1){
							if(apples[i].y == headY && apples[i].x >= headX-10 && apples[i].x <= headX){
								oops = true;
							}
						}
						if(yVelocity == 1){
							if(apples[i].x == headX && apples[i].y >= headY && apples[i].y <= headY+10){
								oops = true;
							}
						}
						if(yVelocity == -1){
							if(apples[i].x == headX && apples[i].y >= headY-10 && apples[i].y <= headY){
								oops = true;
							}
						}
					}

					if(oops == true){
						generatePositions();
						for(let i=0; i<apples.length; i++){
							apples[i].x = xlist[i];
							apples[i].y = ylist[i];
						}			
						oops = false;
					} else {
						generating = false;
					}
				}

				// This is where we assign the answers to each apple.
				assignAnswers(apples,level);


			}
			else{
				snakeColor = colors[colors.indexOf(snakeColor,0)+1];
				apples[i].x = canvas.width + 2*tileSize;
				apples[i].y = canvas.height + 2*tileSize;
				health = health - 1;
			}
		}
	}

	

}

// Generate 4 unique pairs of numbers between 0 and tileCount
function generatePositions(){
	xlist = [];
	ylist = [];
	let done = false;

	for(let i=0; i<4; i++){
		x = Math.floor(Math.random() * tileCount);
		y = Math.floor(Math.random() * tileCount);
		xlist.push(x);
		ylist.push(y);
	}

	while(done == false){
		for(let i=0; i<4; i++){
			for(let j=0; j<4; j++){
				if( (i!=j) && (xlist[i]==xlist[j]) && (ylist[i]==ylist[j]) ){
					xlist[i] = Math.floor(Math.random() * tileCount);
				}
				else{
					done = true;
				}
			}
		}
	}
}

function assignAnswers(apples, level){
	if(level == 0){
		for(let i=0; i<4; i++){
	
			apples[i].correct = false;

			if(i==0){
				apples[i].num = a+b;
			}
			else if(i==1){
				apples[i].num = a+b+1;
			}
			else if(i==2){
				apples[i].num = a+b+2;
			}
			else if(i==3){
				apples[i].num = a+b-1;
			}
			if(i==0){
				apples[i].correct = true;
			}
		}
	} else if(level == 1){
		for(let i=0; i<4; i++){

			apples[i].correct = false;

			if(i==0){
				apples[i].num = a-b;
			}
			else if(i==1){
				apples[i].num = a-b+Math.floor(Math.random()*4)-2;
				if(apples[i].num == a-b){
					apples[i].num = apples[i].num+1;
				}
			}
			else if(i==2){
				if(a == b){
					apples[i].num = 1;
				}
				else{
					apples[i].num = b-a;
				}
			}
			else if(i==3){
				apples[i].num = -(a+b);
			}
			if(i==0){
				apples[i].correct = true;
			}
		}

	} else if(level == 2){
		a = -1*a
		for(let i=0; i<4; i++){

			correct = false;

			if(i==0){
				apples[i].num = a+b;
			}
			else if(i==1){
				apples[i].num = b-a
			}
			else if(i==2){
				apples[i].num = a-b;
			}
			else if(i==3){
				apples[i].num = -(a+b);
				if(a+b==0){
					apples[i].num = 1;
				}
			}
			if(i==0){
				apples[i].correct = true;
			}
			apples[i].x = xlist[i];
			apples[i].y = ylist[i];
		}

	} else if(level == 3) {
		b = -1*b;
		for(let i=0; i<4; i++){

			apples.correct = false;
			xpos = xlist[i];
			ypos = ylist[i];

			if(i==0){
				apples[i].num = a-b;
			}
			else if(i==1){
				apples[i].num = a+b;
			}
			else if(i==2){
				apples[i].num = b-a;
			}
			else if(i==3){
				apples[i].num = -(a+b);
				if(a+b == 0)
					apples[i].num = 1;
			}
			if(i==0){
				apples[i].correct = true;
			}
		}
	} else if(level == 4) {
		b = -1*b;
		a = -1*a;
		for(let i=0; i<4; i++){

			apples.correct = false;
			xpos = xlist[i];
			ypos = ylist[i];

			if(i==0){
				apples[i].num = a-b;
			}
			else if(i==1){
				apples[i].num = a+b;
			}
			else if(i==2){
				apples[i].num = b-a;
				if(b-a == 0)
					apples[i].num = 1;
			}
			else if(i==3){
				apples[i].num = -(a+b);
			}
			if(i==0){
				apples[i].correct = true;
			}
		}
	}
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
	// up
	if(event.keyCode == 38){
		if(yVelocity == 1)
			return;
		yVelocity = -1;
		xVelocity = 0;
	}
	// down
	if(event.keyCode == 40){
		if(yVelocity == -1)
			return;
		yVelocity = 1;
		xVelocity = 0;
	}	
	// left
	if(event.keyCode == 37){
		if(xVelocity == 1)
			return;
		yVelocity = 0;
		xVelocity = -1;
	}
	// right
	if(event.keyCode == 39){
		if(xVelocity == -1)
			return;
		yVelocity = 0;
		xVelocity = 1;
	}
}

drawGame();
