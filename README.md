# BIRB STOP!

## Description
Birb Stop is a game where the player has to, well, stop their bird from destroying their carefully organized stack of things. After 20 seconds surviving, the speed intervals randomize themselves and get quicker for higher difficulty. If you survive 1 minute you win the game. If the bird gets to pass your barrier, it’s game over.


## MVP (DOM - CANVAS)
- Player uses a barrier that moves vertically.
- Birds appear randomly on the left side of the screen.
- The birds change irection when they touch the barrier.
- If a bird collides with the tower, the game ends.

--------

## Backlog
- Timer
- Lives
- Harder mode ‘left + right’
- Harder mode ‘left + right + up’
- Game over screen specifically for the ‘left + right’ mode
- Game over screen specifically for the ‘left + right + up’ mode


## Data structure

### main.js
```

buildSplashScreen(){
}

removeSplashScreen(){
}

buildGameScreen(){
}

removeGameScreen(){
}

buildGameOverScreen(){
}

removeGameOverScreen(){
}

```

### game.js
```
Game(){
  this.canvas;
  this.birdEnemies;
}

start()

startLoop()

checkCollisionsToTower()

checkCollisionsToPlayer()

setGameOver()
```

### player.js
```
Player(){
  this.canvas;
  this.x;
  this.y;
  this.width;
  this.height;
  this.speed; 
  this.direction;
}

draw()

updatePosition()


```

### bird.js
```
EnemyBird(){
  this.canvas;
  this.x;
  this.y;
  this.direction;
  this.speed;
  this.width;
  this.height;
}

updatePosition()

bounceBack()

draw()

```

### tower.js 
```
Tower(){
  this.canvas;
  this.x;
  this.y;
  this.width;
  this.height;
}

draw()

```


## States and States Transitions
```
- splashScreen()
  - buildSplash()
  - addEventListener(startGame)
  
  
- startGame()
  - create new Game()
  - game.start()
  
  
- gameOver()
  - buildGameOver()
  - addEventListener(startGame) 
```

## Task
- Main - buildDom
- Main - buildSplashScreen
- Main - addEventListener
- Main - buildGameScreen
- Main - removeGameScreen
- Main - buildGameOverScreen
- Main - addEventListener
- Main - removeGameOverScreen
- Game - startLoop
- Game - checkCollisionsToTower
- Game - checkCollisionsToPlayer
- Game - setGameOver
- Game - addEventListener
- Player - draw
- Player - updatePosition
- EnemyBird - draw
- EnemyBird - updatePosition
- EnemyBird - bounceBack
- Tower - draw

## Links


### Trello
[Link url](https://trello.com/b/P8V3S9Pm)


### Git
URLs for the project repo and deploy
- [Link Repo](https://github.com/valmgisbert/birb-stop-game-v.2/)
- [Link Deploy](https://valmgisbert.github.io/birb-stop-game-v.2/)


### Slides
URLs for the project presentation 
- [Link Slides](https://docs.google.com/presentation/d/1xHrsnaDQCRyFKnbXI8uwNGIqQXnX85mA20rLVP9v9pw/edit?usp=sharing)



