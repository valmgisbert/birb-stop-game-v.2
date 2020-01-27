"use strict";

function buildDom(htmlStr) {
  var div = document.createElement('div');

  div.innerHTML = htmlStr;

	return div.children[0];
}

	function main (){
		var game;
		var splashScreen;
		var gameOverScreen;

		function buildSplashScreen() {
			splashScreen = buildDom(`
				<main>
					<h1>BIRB STOP!</h1>
					<button>Start</button>
				</main>`);
			
			document.body.appendChild(splashScreen);

			var startBtn = splashScreen.querySelector('button');

			startBtn.addEventListener('click', function() {
				startGame();
			});
		}

	function removeSplashScreen() {
		splashScreen.remove();
		}

	function buildGameScreen() {
		var gameScreen = buildDom(`
			<main class="game-container">
				<header>
					<section class="game-status">
						<div class="timer"></div>
					</section>
				</header>
				<div class="canvas-container">
					<canvas width="680" height="440"></canvas>
				</div>
			</main>`)
			
		document.body.appendChild(gameScreen);
		return gameScreen;
		}

	function removeGameScreen() {
		game.gameScreen.remove();
	}

	function buildGameOverScreen(timer) { 
		var gameOverScreen = buildDom(`
			<main id="game-over-sc">
				<h1>Game over</h1>
				<p>Your protected your stuff for ${timer} seconds.</span></p>
				<button>Restart</button>
			</main>`);

		document.body.appendChild(gameOverScreen);

		var restartBtn = gameOverScreen.querySelector('button');

		restartBtn.addEventListener('click', startGame);
	}

	function removeGameOverScreen() {
		if (gameOverScreen !== undefined) {
			gameOverScreen.remove();
		}
	}

	function startGame() {
		removeSplashScreen();
		removeGameOverScreen();

		game = new Game();
		game.gameScreen = buildGameScreen();

		game.start();
		game.passGameOverCallback(gameOver); //check this with game
	}

	function gameOver() {
		removeGameScreen();
		buildGameOverScreen();

		console.log('GAME OVER - MAIN');

		//func for starting over the game
	}

	buildSplashScreen();
}

window.addEventListener('load', main);