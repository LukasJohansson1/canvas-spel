// Setup
const canvas = document.getElementById("myCanvas");
const c = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

c.fillRect(0,0, canvas.width, canvas.height)


class Sprite {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
    }

    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y, 50 ,150)
    }

    update() {
        this.draw()
        this.position.y += 5
    }
}

const player1 = new Sprite({
    position: {
        x: 0,
        y:100,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

const player2 = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})



function animte() {
    window.requestAnimationFrame(animte)
    player1.update()
    player2.update()
}