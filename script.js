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
        this.lastkey
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
    
    if (keys.d.pressed ) {
        player1.velocity.x += 3
        }
        else if (keys.a.pressed ) {
        player1.velocity.x -= 3
        }
    if (keys.ArrowLeft.pressed) {
        player2.velocity.x -=3
    } else if (keys.ArrowRight.pressed) {
        player2.velocity.x += 3
    }


    
}

animate()

window.addEventListener('keydown',(event) =>{
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player1.lastkey = "d"
            break
        case 'a':
            keys.a.pressed = true
            player1.lastkey = "a"
            break
        case 'w':
            player1.velocity.y = -7
            break
        }
        


    switch (event.key) {
        case 'ArrowRight' :
            keys.ArrowRight.pressed = true
            player2.lastkey = "ArrowRight"
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            player2.lastkey = "ArrowLeft"
            break
        case 'ArrowUp':
            player2.velocity.y = -7
            player2.lastkey = "ArrowUp"
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
        case 'w':
            
            break
      }
    
    switch (event.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowUp':
            
            break
      }
})