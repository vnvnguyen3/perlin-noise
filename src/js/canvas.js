import utils from './utils'

const { noise } = require('@chriscourses/perlin-noise');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.offset = offset
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
const circles = [];
let time = 0;
function init() {
  for (let i = 0; i < 100; i++) {
    circles.push(new Circle(-30, -30, 100-i, `hsl(${Math.random() * 255}, 50%, 50%)`, i * 0.01));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0,0,0,0.01)"
  c.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => {
    circle.update();
    circle.x = noise(time + 20 + circle.offset) * canvas.width;
    circle.y = noise(time + circle.offset) * canvas.height;
  })

  time += 0.005;
}

init()
animate()
