function game() {
    var snake = function(cross, id, color) {

        // Pixel size, size of grid case
        this.size = 15;

        // ID which allow us to differenciate me from others
        this.id = id;


        // Use to create a non-real grid
        this.x = Math.floor(Math.random() * ((window.innerWidth - 270) / this.size)) * this.size + 135;
        this.y = Math.floor(Math.random() * ((window.innerHeight - 270) / this.size)) * this.size + 135;

        // Arrays which contains snake positions
        this.posX = [this.x,this.x-15,this.x-30];
        this.posY = [this.y,this.y-15,this.y-30];


        this.backgroundColor = color;

        // Controls cross
        this.cross = cross;

        // A pos will gain his own size to grow
        this.speed = this.size;

        // At start, the snake will go to his right
        this.direction = 'right';

        this.div = new Array();

        this.show = function() {
            for (var i = 0; i < this.posX.length; i++) {
                if (this.div[i]) {
                    this.div[i].remove();
                }
                this.div[i] = document.createElement('div');
                this.div[i].style.left = this.posX[i] + 'px';
                this.div[i].style.top = this.posY[i] + 'px';
                this.div[i].style.width = this.size + 'px';
                this.div[i].style.height = this.size + 'px';
                this.div[i].style.backgroundColor = this.backgroundColor;
                document.querySelector('.snake-container').appendChild(this.div[i]);
            }
        }

        this.update = function() {
            var _this = this;
            window.setInterval(function() {
                var nextX = _this.posX[_this.posX.length - 1];
                var nextY = _this.posY[_this.posY.length - 1];
                if (_this.direction === 'up') {
                    nextY -= _this.speed;
                } else if (_this.direction === 'right') {
                    nextX += _this.speed;
                } else if (_this.direction === 'left') {
                    nextX -= _this.speed;
                } else if (_this.direction === 'down') {
                    nextY += _this.speed;
                }
                var eating = _this.eat(nextX, nextY);
                if (eating === false) {
                    _this.posX.splice(0, 1);
                    _this.posY.splice(0, 1);
                } else if (eating === true) {
                    fruit.eaten();
                }
                _this.posX.push(nextX);
                _this.posY.push(nextY);
                _this.show();
                _this.shock();
            }, 100);
        }

        this.move = function() {
            var _this = this;
            window.addEventListener('keypress', function(e) {
                if (e.keyCode === _this.cross[0]) {
                    _this.direction = 'up';
                } else if (e.keyCode === _this.cross[1]) {
                    _this.direction = 'right';
                } else if (e.keyCode === _this.cross[2]) {
                    _this.direction = 'left';
                } else if (e.keyCode === _this.cross[3]) {
                    _this.direction = 'down';
                }
            }, false);

            this.shock = function() {
                for (var i = 0; i < this.posX.length - 1; i++) {
                    if (this.posX.length - 1 > 0) {
                        if (this.posX[this.posX.length - 1] === this.posX[i] && this.posY[this.posY.length - 1] === this.posY[i]) {
                            this.lose();
                        }
                    }
                }
                if (this.posX[this.posX.length - 1] > window.innerWidth || this.posY[this.posY.length - 1] > window.innerHeight ||  this.posX[this.posX.length - 1] < 0 ||  this.posY[this.posY.length - 1] < 0) {
                    this.lose();
                }
                for (var i = 0; i < snakes.length; i++) {
                    if (this.id !== i) {
                        for (var j = 0; j < snakes[i].posX.length; j++) {
                            if (this.posX[this.posX.length - 1] === snakes[i].posX[j] && this.posY[this.posY.length - 1] === snakes[i].posY[j]) {
                                this.lose();
                            }
                        }
                    }
                }
            }
        }

        this.eat = function(x, y) {
            if (x === fruit.x && y === fruit.y) {
                return true;
            } else {
                return false;
            }
        }

        this.lose = function() {
            this.id++;
            // window.alert('Perdu, le joueur ' + this.id + ' avait un score de ' + this.posX.length);
            window.location.reload();
        }

        this.update();
        this.move();
    }

    var food = function() {
        this.size = 15;

        this.x = Math.floor(Math.random() * (window.innerWidth / this.size)) * this.size;
        this.y = Math.floor(Math.random() * (window.innerHeight / this.size)) * this.size;

        this.backgroundColor = 'yellow';

        this.div;

        this.show = function() {
            this.div = document.createElement('div');
            this.div.style.left = this.x + 'px';
            this.div.style.top = this.y + 'px';
            this.div.style.backgroundColor = this.backgroundColor;
            this.div.style.width = this.size + 'px';
            this.div.style.height = this.size + 'px';
            this.div.style.position = 'relative';
            document.querySelector('.snake-container').appendChild(this.div);
        }

        this.eaten = function() {

            this.div.remove();

            this.x = Math.floor(Math.random() * (window.innerWidth / this.size)) * this.size;
            this.y = Math.floor(Math.random() * (window.innerHeight / this.size)) * this.size;

            this.show();
        }

        this.show();
    }

    var zqsd = [122, 100, 113, 115];
    var arrows = [105, 108, 106, 107];
    var fruit = new food();
    var snakes = new Array;
    snakes.length = 1;
    snakes[0] = new snake(zqsd, 0,'blue');
    snakes[1] = new snake(arrows, 1, 'red');
}
game();
