window.addEventListener("load", () => {
    const canvas = document.getElementById("yeah") as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    interface Pipe {
        x: number;
        topHeight: number;
        bottomY: number;
    }

    const bird = {
        x: 100,
        y: 150,
        width: 30,
        height: 30,
        velocity: 0,
        gravity: 0.5,
        jumpStrength: -8,
        draw() {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        update() {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y + this.height > canvas.height || this.y < 0) {
                gameOver();
            }
        },
        flap() {
            this.velocity = this.jumpStrength;
        },
        reset() {
            this.y = 150;
            this.velocity = 0;
        }
    };

    let pipes: Pipe[] = [];
    const pipeGap = 120;
    const pipeWidth = 50;
    let score = 0;
    let gameRunning = false;

    function createPipe(): void {
        const top = Math.random() * (canvas.height - pipeGap - 100) + 30;
        pipes.push({
            x: canvas.width,
            topHeight: top,
            bottomY: top + pipeGap
        });
    }

    function updatePipes(): void {
        for (let pipe of pipes) {
            pipe.x -= 2;

            // 충돌 체크
            if (
                bird.x < pipe.x + pipeWidth &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY)
            ) {
                gameOver();
            }

            if (pipe.x + pipeWidth === bird.x) {
                score++;
            }
        }

        pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    }

    function drawPipes(): void {
        ctx.fillStyle = "green";
        for (let pipe of pipes) {
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
            ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
        }
    }

    function drawScore(): void {
        ctx.fillStyle = "white";
        ctx.font = "24px sans-serif";
        ctx.fillText(`점수: ${score}`, 20, 30);
    }

    function drawGameOver(): void {
        ctx.fillStyle = "red";
        ctx.font = "36px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("💥 게임 오버!", canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = "24px sans-serif";
        ctx.fillText("🖱 클릭해서 다시 시작!", canvas.width / 2, canvas.height / 2 + 30);
        ctx.textAlign = "start";
    }

    function drawStartPrompt(): void {
        ctx.fillStyle = "white";
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🖱 클릭해서 시작!", canvas.width / 2, canvas.height / 2);
        ctx.textAlign = "start";
    }

    function gameOver(): void {
        gameRunning = false;
    }

    function resetGame(): void {
        pipes = [];
        score = 0;
        bird.reset();
        gameRunning = true;
    }

    function gameLoop(): void {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (gameRunning) {
            bird.update();
            updatePipes();
        }

        bird.draw();
        drawPipes();
        drawScore();

        if (!gameRunning && score === 0) {
            drawStartPrompt();
        } else if (!gameRunning && score > 0) {
            drawGameOver();
        }

        requestAnimationFrame(gameLoop);
    }

    // 🖱 마우스로만 조작
    canvas.addEventListener("mousedown", () => {
        if (!gameRunning) {
            resetGame(); // 시작 or 재시작
        } else {
            bird.flap(); // 플레이 중 점프
        }
    });

    // 주기적으로 파이프 생성
    setInterval(() => {
        if (gameRunning) createPipe();
    }, 1500);

    gameLoop();
});


interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    color: string;
}

const particles: Particle[] = [];

function createFirework(x: number, y: number, particleCount: number): void {
    for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;

        particles.push({
            x,
            y,
            vx,
            vy,
            alpha: 1,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        });
    }
}

function updateParticles(ctx: CanvasRenderingContext2D): void {
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }

    drawParticles(ctx);
}

function drawParticles(ctx: CanvasRenderingContext2D): void {
    for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
