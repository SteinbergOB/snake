class Snake{
	constructor(color, headColor, pos_x, pos_y, key_move, imgs){
		this.body = [];
		this.body[0] = {x: pos_x,
						y: pos_y}

		this.direction = { x: 1,
						   y: 0}

		this.color = color;
		this.headColor = headColor;

		this.k_left = key_move.k_left
		this.k_right = key_move.k_right
		this.k_up = key_move.k_up
		this.k_down = key_move.k_down

		this.img_left = imgs.img_left;
		this.img_right = imgs.img_right;
		this.img_up = imgs.img_up;
		this.img_down = imgs.img_down;
		this.img_curent = this.img_right;
	}

	isChangeDirection(event) {
        if(event.code == this.k_left) {
            if ((this.body.length != 1) && (this.body[0].x - 1 == this.body[1].x)) {
            	return false;
            }
            this.direction = {x: -1, y: 0}
            this.img_curent = this.img_left;
           	return true;
        } else if(event.code == this.k_right) {
            if ((this.body.length != 1) && (this.body[0].x + 1 == this.body[1].x)) {
            	return false;
            }
            this.direction = {x: 1, y: 0}
            this.img_curent = this.img_right;
           	return true;
        } else if(event.code == this.k_up) {
            if ((this.body.length != 1) && (this.body[0].y - 1 == this.body[1].y)) {
            	return false;
            }
            this.direction = {x: 0, y: -1}
            this.img_curent = this.img_up;
           	return true;
        } else if(event.code == this.k_down) {
            if ((this.body.length != 1) && (this.body[0].y + 1 == this.body[1].y)) {
            	return false;
            }
            this.direction = {x: 0, y: 1}
            this.img_curent = this.img_down;
           	return true;
        }
       	return false;
    }

	move() {
		var newHead = {
			x: this.body[0].x + this.direction.x,
			y: this.body[0].y + this.direction.y
		}

		this.body.unshift(newHead)
		if (!(this.isAteFood())) {
			this.body.pop()
		}

		this.isDead()
	}

	moveMinimapRect() {
		var shift = 7;
		if (this.body[0].x + shift == mini_rect_x + N) {
			if (this.body[0].x < mini_N-shift) {
				mini_rect_x += 1;
			}
		}
		if (this.body[0].y + shift == mini_rect_y + M) {
			if (this.body[0].y < mini_M-shift) {
				mini_rect_y += 1;
			}
		}
		if (this.body[0].x - shift+1 == mini_rect_x) {
			if (this.body[0].x > shift-1) {
				mini_rect_x -= 1;
			}
		}
		if (this.body[0].y - shift+1 == mini_rect_y) {
			if (this.body[0].y > shift-1) {
				mini_rect_y -= 1;
			}
		}
	}

	draw() {
		ctx.drawImage(this.img_curent, (this.body[0].x - mini_rect_x)*C_S + C_S, (this.body[0].y - mini_rect_y)*C_S + 3*C_S);

		ctx.fillStyle = this.color;
		for(var i=1; i < this.body.length; i++) {
			if ((this.body[i].x >= mini_rect_x-1) && (this.body[i].x <= mini_rect_x + N) && (this.body[i].y >= mini_rect_y-1) && (this.body[i].y <= mini_rect_y + M)) {
				ctx.fillRect((this.body[i].x - mini_rect_x)*C_S + C_S, (this.body[i].y - mini_rect_y)*C_S + 3*C_S, C_S, C_S);
			}
		}
	}
	drawMini() {
    	ctx.fillStyle = this.headColor;
		ctx.fillRect(mini_x + this.body[0].x*mini_C_S, mini_y + this.body[0].y*mini_C_S, mini_C_S, mini_C_S);
    	ctx.fillStyle = this.color;
		for(var i=1; i < this.body.length; i++) {
			ctx.fillRect(mini_x + this.body[i].x*mini_C_S, mini_y + this.body[i].y*mini_C_S, mini_C_S, mini_C_S);
		}
	}


	isAteFood() {
		if ((this.body[0].x == food.x) && (this.body[0].y == food.y)) {
			score++;
			if (score%3 == 0) {
				lvlNumber++;
//				clearInterval(game);
			}
			newFood();
			return true;
		}
		return false;
	}

	isDead() {
		this.isTouchWall()
		this.isTouchTail()
	}

	isTouchWall() {
		if ((this.body[0].x == -1) || (this.body[0].x == mini_N) || (this.body[0].y == -1) || (this.body[0].y == mini_M)) {
			clearInterval(game)
		}
	}

	isTouchTail() {
        for(let i = 1; i < this.body.length; i++) {
            if((this.body[0].x == this.body[i].x) && (this.body[0].y == this.body[i].y)) {
                clearInterval(game);
            }
        }
	}
}