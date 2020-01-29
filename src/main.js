"use strict";

function buildDom(htmlStr) {
  var div = document.createElement('div');

  div.innerHTML = htmlStr;

	return div.children[0];
}

var mainContainer = document.getElementById('game-container');

function main() {
	var game;
	var splashScreen;
	var gameOverScreen;
	var victoryScreen;

	function createSplashScreen() {
		splashScreen = buildDom(`
			<main>
				<h1>BIRB STOP!</h1>
				<button>Start</button>
			</main>`);

		mainContainer.appendChild(splashScreen);

		var startBtn = splashScreen.querySelector('button');
		startBtn.addEventListener('click', function() {
			startGame();
		});
	}

	function removeSplashScreen() {
		splashScreen.remove();
	}

	function createGameScreen() {
		var gameScreen = buildDom(`
			<div>
				<div class="canvas-container">
					<canvas width="860" height="550"></canvas>
				</div>
			</div>`)
			
		mainContainer.appendChild(gameScreen);
		return gameScreen;
	}

	function removeGameScreen() {
		game.removeGameScreen();
	}

	function createGameOverScreen() { 
		gameOverScreen = buildDom(`
			<main id="game-over-sc">
				<h1>Game over</h1>
				<p>You couldn't protect your things from the birds.</p>
				<button>Restart</button>
			</main>`);

		var restartBtn = gameOverScreen.querySelector('button');

		
		mainContainer.appendChild(gameOverScreen);
		
		restartBtn.addEventListener('click', function(){
			startGame(gameOverScreen)
		});
	}

	function removeGameOverScreen() {		
		if (gameOverScreen !== undefined) {
			gameOverScreen.remove();
		}
	}

	function createVictoryScreen() { 
		victoryScreen = buildDom(`
			<main id="victory-sc">
				<h1>Victory!</h1>
				<p>You protected your things from the birds, boss. I'm proud of you.</p>
				<button>Restart</button>
			</main>`);
		var restartBtn = victoryScreen.querySelector('button');
		restartBtn.addEventListener('click', startGame);
		mainContainer.appendChild(victoryScreen);
	}

	function removeVictoryScreen() {
		if (victoryScreen !== undefined) {
			victoryScreen.remove();
		}
	}
	
	function startGame() {
		removeSplashScreen();
		removeGameOverScreen();
		removeVictoryScreen();
		
		game = new Game();
		game.gameScreen = createGameScreen();
		
		game.start();
		game.passGameOverCallback(gameOver); 
		game.passGameWinCallback(gameVictory);
	}

	function gameOver() {
		removeGameScreen();
		createGameOverScreen();
	}

	function gameVictory() {
		removeGameScreen();
		createVictoryScreen();
	}

	createSplashScreen();
}

window.addEventListener('load', main);