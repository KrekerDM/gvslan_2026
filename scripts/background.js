const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];


const PARTICLE_COUNT = 50;
const CONNECTION_DISTANCE = 150;
const MOUSE_DISTANCE = 200;
const PARTICLE_SPEED = 0.2;

const COLOR_PURPLE = '186, 23, 207'; 
const COLOR_LAVENDER = '214, 156, 227'; 
const COLOR_BLUE = '6, 54, 126'; 

let mouse = {
    x: null,
    y: null
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * PARTICLE_SPEED;
        this.vy = (Math.random() - 0.5) * PARTICLE_SPEED;
        this.size = Math.random() * 2 + 1;
        this.size = Math.random() * 2 + 1;
        const rand = Math.random();
        if (rand < 0.33) this.color = COLOR_PURPLE;
        else if (rand < 0.66) this.color = COLOR_LAVENDER;
        else this.color = COLOR_BLUE;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_DISTANCE) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;

                const force = (MOUSE_DISTANCE - distance) / MOUSE_DISTANCE;
                const pushX = forceDirectionX * force * 1;
                const pushY = forceDirectionY * force * 1;

                this.vx -= pushX * 0.05;
                this.vy -= pushY * 0.05;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.5)`;
    }
}

function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < CONNECTION_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${particles[i].color}, ${1 - distance / CONNECTION_DISTANCE})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
    }

    if (mouse.x != null) {
        for (let i = 0; i < particles.length; i++) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${particles[i].color}, ${1 - distance / MOUSE_DISTANCE})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);

init();
animate();
