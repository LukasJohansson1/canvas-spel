// Setup
const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)

const gravity = 0.2

class Sprite {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.height = 250
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50 , this.height)
    }

    update() {
        this.draw()

        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
            
        } else this.velocity.y += gravity
    }
}

let player1 = new Sprite({

    position: {
        x: 0,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

let player2 = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
      pressed: false
    },
    ArrowLeft: {
      pressed: false
    }
  }



function animate() {
    window.requestAnimationFrame(animate)
    
    c.fillStyle = "black"
    c.fillRect(0,0, canvas.width, canvas.height)
    player1.update()
    player2.update()
    
    player1.velocity.x = 0
    player2.velocity.x = 0
    
    if (keys.d.pressed) {
        player1.velocity.x += 1
        }
        else if (keys.a.pressed) {
        player1.velocity.x -= 1
        }
    if (keys.ArrowLeft.pressed) {
        player2.velocity.x -=1
    } else if (keys.ArrowRight.pressed) {
        player2.velocity.x += 1
    }
}

animate()

window.addEventListener('keydown',(event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        }
    
    switch (event.key) {
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        }

    console.log(event.key)

})

window.addEventListener('keyup',(event) =>{
    switch (event.key) {
        case 'd':
          keys.d.pressed = false
          break
        case 'a':
          keys.a.pressed = false
          break
      }
    
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
      }
})