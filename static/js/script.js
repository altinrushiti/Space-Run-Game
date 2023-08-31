class Field {
    constructor(width) {
        this.x = 0;
        this.y = 0;
        this.move_right = false;
        this.move_left = false;
        this.enemy_width = 50;
        this.number_of_enemies = 16;
        this.isGameOver = false;
        this.width = width;
        this.height = 1050;
        this.player = new Player(this);
        this.opponents = [];
        this.lastSpawnTime = 0;
        this.score = 0;

    }

    updatePlayerLifetime() {
        if (!this.isGameOver) {
            this.score += 1;
        }
    }

    reset() {
        this.opponents = [];
        this.score = 0;
        this.player.x = this.width / 2;
        this.isGameOver = false;
    }


    collision(rect1, rect2) {
        return !(rect2.left > rect1.right ||
            rect2.right < rect1.left ||
            rect2.top > rect1.bottom ||
            rect2.bottom < rect1.top);
    }

    checkPlayerOpponentCollision(player) {
        if (!this.isGameOver) {
            const playerRect = {
                left: player.x,
                right: player.x + player.width,
                top: player.y,
                bottom: player.y + player.width
            };
            for (const opponent of this.opponents) {
                const opponentRect = {
                    left: opponent.x,
                    right: opponent.x + this.enemy_width,
                    top: opponent.y,
                    bottom: opponent.y + this.enemy_width
                };
                if (this.collision(playerRect, opponentRect)) {
                    console.log("Game Over");
                    return true;
                }
            }
        }
        return false;
    }


    gameOver() {
        if (this.checkPlayerOpponentCollision(this.player)) {
            this.isGameOver = true;
        }
    }

    moveOpponents() {
        if (this.opponents.length < this.number_of_enemies && Date.now() - this.lastSpawnTime >= 50) {
            new Opponent(this);
            this.lastSpawnTime = Date.now();
        }

        for (const opponent of this.opponents) {
            opponent.moveOpponent();
        }
    }

    movePlayer() {
        this.player.updatePlayer();
    }
}

class Player {
    constructor(field) {
        this.field = field;
        this.x = this.field.width / 2;
        this.y = this.field.height / 2;
        this.width = 50;

    }


    updatePlayer() {
        if (this.field.move_left) {
            this.x -= 6;
        }
        if (this.field.move_right) {
            this.x += 6;
        }
        this.x = this.border(this.x);

    }

    border(x) {
        if (x <= 0) {
            return 0;
        } else if (x + this.width >= this.field.width) {
            return this.field.width - this.width;
        } else {
            return x;
        }
    }
}

class Opponent {
    constructor(field) {
        this.field = field;
        this.x = Math.random() * (this.field.width - this.field.enemy_width);
        this.y = -this.field.enemy_width;
        this.initalspeed = 4;
        this.field.opponents.push(this);

        this.spawnTime = Date.now();
        this.isSpawned = false;
        this.spawnTime = Date.now();
        this.speedIncrementedTime = 0;


    }

    respawnOpponent() {
        this.x = Math.random() * (this.field.width - this.field.enemy_width);
        this.y = -this.field.enemy_width;
        this.isSpawned = false;
        this.speedIncrementedTime = 0;
        this.spawnTime = Date.now();
    }


    checkBottomBoundary() {
        return this.y >= this.field.height;
    }

    moveOpponent() {
        const currentTime = Date.now();
        const elapsed = currentTime - this.spawnTime;

        if (!this.isSpawned && elapsed >= 500 * this.field.opponents.indexOf(this)) {
            this.isSpawned = true;
        }

        if (this.isSpawned) {
            if (currentTime - this.speedIncrementedTime >= 7000) {
                this.initalspeed += 0.5;
                this.speedIncrementedTime = currentTime;
            }

            this.y += this.initalspeed;

            if (this.checkBottomBoundary()) {
                this.respawnOpponent();
            }
        }
    }
}


class View {

    constructor(field) {
        this.field = field;
        this.main = document.getElementById('main');
        this.opponent = document.getElementById('opponent');
        this.player = document.getElementById('player');
        this.loginContainer = document.getElementById('login-wrapper');
        this.registerContainer = document.getElementById('register-wrapper');
        this.switchToRegister = document.getElementById('switch-to-register');
        this.switchToLogin = document.getElementById('switch-to-login');
        this.gameWrapper = document.getElementById('game-wrapper');
        this.menuBarWrapper = document.getElementById('menu-bar-wrapper');
        this.playButton = document.getElementById('play-button');
        this.deleteAccountButton = document.getElementById('delete-account-button');
        this.gameOver = document.getElementById('gameover-wrapper');
        this.restartButton = document.getElementById('restart-button');
        this.logoutButton = document.getElementById('logout-button');
        this.backButton = document.getElementById('back-button');
        this.mode = 'login';
        this.createPlayer(this.main);
        this.numberOfOpponents = 0;
        this.opponents = [];
        this.scoreDisplay = document.getElementById('highscore');

    }


    switchMode() {
        if (this.mode === 'menubar') {
            this.menuBarWrapper.style.display = 'block';
            this.loginContainer.style.display = 'none';
            this.registerContainer.style.display = 'none';
            this.gameWrapper.style.display = 'none';
            this.gameOver.style.display = 'none';

        }
        if (this.mode === 'login') {
            this.loginContainer.style.display = 'block';
            this.registerContainer.style.display = 'none';
            this.gameWrapper.style.display = 'none';
            this.menuBarWrapper.style.display = 'none';
            this.gameOver.style.display = 'none';

        }
        if (this.mode === 'register') {
            this.loginContainer.style.display = 'none';
            this.registerContainer.style.display = 'block';
            this.gameWrapper.style.display = 'none';
            this.menuBarWrapper.style.display = 'none';
            this.gameOver.style.display = 'none';

        }
        if (this.mode === 'game') {

            this.loginContainer.style.display = 'none';
            this.registerContainer.style.display = 'none';
            this.gameWrapper.style.display = 'block';
            this.menuBarWrapper.style.display = 'none';
            this.gameOver.style.display = 'none';
        }

        if (this.mode === 'gameover') {

            this.gameOver.style.display = 'block'
            this.loginContainer.style.display = 'none';
            this.registerContainer.style.display = 'none';
            this.gameWrapper.style.display = 'block';
            this.menuBarWrapper.style.display = 'none';

        }
    }

    createPlayer() {
        const player = document.createElement("img");
        player.src = "../static/images/spaceship.png";
        player.id = "player";
        this.player.appendChild(player);
        this.setPosition(player, this.field.player.x, this.field.player.y);
        this.setSize(player, this.field.player.width)
    }

    createOpponent(object, opponentModel) {
        const opponent = document.createElement("img");
        opponent.src = "../static/images/ufo.png";
        opponent.className = "enemy";
        this.opponent.appendChild(opponent);
        this.setSize(opponent, this.field.enemy_width);
        this.setPosition(opponent, opponentModel.x, opponentModel.y);
        this.opponents.push(opponent);
    }


    setPosition(object, x, y) {

        object.style.left = `${x}px`;
        object.style.top = `${y}px`;

    }

    setSize(object, width) {
        object.style.width = `${width}px`;
        object.style.height = "auto";
    }

    resetGame() {
        for (const opponent of this.opponents) {
            this.opponent.removeChild(opponent);
        }
        this.opponents = [];
        this.numberOfOpponents = 0;

        this.field.opponents = [];

        this.field.score = 0;

        this.scoreDisplay.textContent = 'Score: 0';
    }

    update() {

        this.scoreDisplay.textContent = `Score: ${this.field.score}`;
        this.player.style.transform = `translate(${this.field.player.x}px, ${this.field.player.y}px)`;


        if (this.field.isGameOver) {
            this.resetGame();
            this.mode = 'gameover';
            this.switchMode();
        }

        for (let i = 0; i < this.opponents.length; i++) {
            const opponentModel = this.field.opponents[i];
            const opponent = this.opponents[i];

            if (opponentModel && opponentModel.isSpawned) {
                this.setPosition(opponent, opponentModel.x, opponentModel.y);
                if (opponentModel.checkBottomBoundary()) {
                    this.opponent.removeChild(opponent);
                    this.opponents.splice(i, 1);
                }
            }
        }

        while (this.numberOfOpponents < this.field.opponents.length) {
            const opponentModel = this.field.opponents[this.numberOfOpponents];
            if (opponentModel) {
                this.createOpponent(this.main, opponentModel);
            }
            this.numberOfOpponents++;
        }


    }
}

class Controller {
    constructor(view, field) {
        this.view = view;
        this.field = field;
        this.keyboardInput();
        this.keyboardOutput();
        this.switch();
        this.view.switchMode();
        this.view.mode = 'login';
        this.register();
        this.login();
        this.deleteUser();
        this.logout();
        this.gameRunning = false;
        this.scoreSaved = false;
        this.gameLoopRunning = false;


    }


    async gameLoop() {
        if (this.gameLoopRunning) {
            this.view.update();
            this.field.gameOver();
            if (this.field.isGameOver && !this.scoreSaved) {
                await this.updateScore(this.field.score);
                this.scoreSaved = true;
                this.view.mode = 'gameover';
                this.view.switchMode();
            } else if (!this.field.isGameOver) {
                this.field.moveOpponents();
                this.field.movePlayer();
            }
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    register() {
        const form = document.getElementById('register-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const response = await fetch('/register', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.message);
            } else {
                console.error(responseData.message);
            }
        })
    }


    login() {
        const form = document.getElementById('login-form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            const response = await fetch('/login', {
                method: 'POST',
                body: formData
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.message);
                this.view.mode = 'menubar';
                this.view.switchMode();
            } else {
                console.error(responseData.message);
            }
        })
    }

    async updateScore(score) {
        try {
            const response = await fetch('/update_score', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({score: score})
            });
            const responseData = await response.json();
            console.log(responseData.message);
        } catch (error) {
            console.error(error);
        }
    }


    deleteUser() {
        this.view.deleteAccountButton.addEventListener('click', async (event) => {
            event.preventDefault();
            const response = await fetch('/delete', {
                method: 'DELETE',
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.message);
                this.view.mode = 'login';
                this.view.switchMode();
            } else {
                console.error(responseData.message);
            }
        })
    }

    async logout() {
        this.view.logoutButton.addEventListener('click', async () => {
            const response = await fetch('/logout', {
                method: 'POST'
            });
            const responseData = await response.json();
            if (response.ok) {
                console.log(responseData.message);
                this.view.mode = 'login';
                this.view.switchMode();
            } else {
                console.error(responseData.message);
            }
        });
    }


    keyboardOutput() {
        document.addEventListener("keyup", (event) => {
            if (event.key === 'ArrowRight' || event.code === 'KeyD') {
                this.field.move_right = false;
            } else if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
                this.field.move_left = false;
            }
        });
    }

    startGame() {
        this.view.playButton.addEventListener('click', async () => {
            if (!this.gameRunning) {
                this.gameRunning = true;
                this.gameLoopRunning = true;
                this.view.mode = 'game';
                this.view.switchMode();
                this.view.scoreDisplay.textContent = 'Score: 0';
                this.field.reset();
                this.updateInterval = setInterval(() => this.field.updatePlayerLifetime(), 1000);
                await this.gameLoop();
            }
        });
    }

    switch() {
        this.view.switchToRegister.addEventListener('click', async () => {
            this.view.mode = 'register';
            this.view.switchMode();
            this.stopGameAndReset();
        });
        this.view.switchToLogin.addEventListener('click', async () => {
            this.view.mode = 'login';
            this.view.switchMode();
            this.stopGameAndReset();
        });
        this.view.restartButton.addEventListener('click', async () => {
            this.field.isGameOver = false;
            this.view.resetGame();
            this.view.mode = 'game';
            this.view.switchMode();
        });
        this.view.backButton.addEventListener('click', async () => {
            this.view.mode = 'menubar';
            this.view.switchMode();
            this.stopGameAndReset();
        });
    }

    stopGameAndReset() {
        this.gameRunning = false;
        this.gameLoopRunning = false;
        clearInterval(this.updateInterval);
        this.field.reset();
        this.field.isGameOver = false;
        this.view.resetGame();
        this.view.scoreDisplay.textContent = 'Score: 0';
    }

    keyboardInput() {
        document.addEventListener("keydown", (event) => {
            if (event.key === 'ArrowRight' || event.code === 'KeyD') {
                this.field.move_right = true;
            } else if (event.key === 'ArrowLeft' || event.code === 'KeyA') {
                this.field.move_left = true;
            }
        });
    }
}

const fieldElement = document.getElementById('main');
const gameField = new Field(fieldElement.offsetWidth, fieldElement.offsetHeight);
const gameView = new View(gameField);
const gameController = new Controller(gameView, gameField);
gameController.startGame();