const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");

canvas.width = 1536;
canvas.height = 650;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {
  constructor({ position, velocity, color = "", offset }) {
    this.position = position;
    this.velocity = velocity;
    this.height = 250;
    this.width = 60;
    this.jumpsRemaining = 2;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.isAttackCooldown = false;
    this.cooldownDuration = 250;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.isAttacking) {
      c.fillStyle = "red";
      c.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }
  
  checkPlayerLost() {
    if (player1Health <= 0) {
      alert("Player 2 wins!");
    } else if (player2Health <= 0) {
      alert("Player 1 wins!");
    }
  }


  update() {
    this.draw();
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y - this.attackBox.offset.y;

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
      this.jumpsRemaining = 2;
    } else this.velocity.y += gravity;

    if (this.position.x < 0) {
      this.position.x = 0;
    } else if (this.position.x + 50 > canvas.width) {
      this.position.x = canvas.width - 50;
    }
  }

  attack() {
    if (!this.isAttackCooldown) {
      this.isAttacking = true;
      this.isAttackCooldown = true;

      setTimeout(() => {
        this.isAttacking = false;
        setTimeout(() => {
          this.isAttackCooldown = false;
        }, this.cooldownDuration);
      }, 100);
    }
  }



  jump() {
    if (this.jumpsRemaining > 0) {
      this.velocity.y = -7;
      this.jumpsRemaining -= 1;
    }
  }
}

let player1Health = 100;
let player2Health = 100;
const maxHealth = 100;

const healthBarWidth = 300;
const healthBarHeight = 20;

function drawHealthBars() {
  
  c.fillStyle = "red";
  c.fillRect(50, 50, healthBarWidth, healthBarHeight);

  c.fillStyle = "red";
  c.fillRect(
    canvas.width - healthBarWidth - 50,
    50,
    healthBarWidth,
    healthBarHeight
  );


  const player1HealthPercentage = Math.max(player1Health, 0) / maxHealth;
  const player1HealthDisplay = Math.max(player1Health, 0);
  c.fillStyle = "green";
  c.fillRect(
    50,
    50,
    healthBarWidth * player1HealthPercentage,
    healthBarHeight
  );
  c.fillStyle = "white";
  c.fillText(`Player 1: ${player1HealthDisplay}`, 50, 40);

  const player2HealthPercentage = Math.max(player2Health, 0) / maxHealth;
  const player2HealthDisplay = Math.max(player2Health, 0);
  c.fillStyle = "green";
  c.fillRect(
    canvas.width - healthBarWidth - 50,
    50,
    healthBarWidth * player2HealthPercentage,
    healthBarHeight
  );
  c.fillStyle = "white";
  c.fillText(`Player 2: ${player2HealthDisplay}`, canvas.width - healthBarWidth - 50, 40);
}

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

function checkCollision(player1, player2) {
  if (
    player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&
    player1.attackBox.position.x <= player2.position.x + player2.width &&
    player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&
    player1.attackBox.position.y <= player2.position.y + player2.height &&
    player1.isAttacking
  ) {
    return true;
  } else {
    return false;
  }
}

function animate() {
  window.requestAnimationFrame(animate);

  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player1.update();
  player2.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  if (keys.d.pressed) {
    player1.velocity.x += 2;
  } else if (keys.a.pressed) {
    player1.velocity.x -= 2;
  }

  if (keys.ArrowLeft.pressed) {
    player2.velocity.x -= 5;
  } else if (keys.ArrowRight.pressed) {
    player2.velocity.x += 5;
  }

  if (checkCollision(player1, player2)) {
    player1.isAttacking = false;
    player2Health -= 10;
  }
  if (checkCollision(player2, player1)) {
    player2.isAttacking = false;
    player1Health -= 10;
  }

  
  player1Health = Math.max(player1Health, 0);
  player2Health = Math.max(player2Health, 0);

  drawHealthBars();
  player1.checkPlayerLost();
}

let player1 = new Sprite({
  position: {
    x: 100,
    y: 300,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: -65,
  },
  color: "blue",
});

let player2 = new Sprite({
  position: {
    x: 1400,
    y: 300,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: -40,
    y: -65,
  },
  color: "purple",
});

window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player1.lastkey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player1.lastkey = "a";
        break;
      case "w":
        player1.jump();
        break;
      case "s":
        player1.attack();
        break;
    }
  
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        player2.lastkey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        player2.lastkey = "ArrowLeft";
        break;
      case "ArrowUp":
        player2.jump();
        break;
      case "ArrowDown":
        player2.attack();
        break;
    }
  
    console.log(event.key);
  });
  

  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "w":
        break;
    }
  
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
      case "ArrowUp":
        break;
      case "ArrowDown":
        break;
    }
  });
  

animate();