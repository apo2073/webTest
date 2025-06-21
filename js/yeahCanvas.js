window.addEventListener("load", function () {
    var canvas = document.getElementById("yeah");
    if (!canvas)
        return;
    var ctx = canvas.getContext("2d");
    if (!ctx)
        return;
    var bird = {
        x: 100,
        y: 150,
        width: 30,
        height: 30,
        velocity: 0,
        gravity: 0.5,
        jumpStrength: -8,
        draw: function () {
            ctx.fillStyle = "yellow";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function () {
            this.velocity += this.gravity;
            this.y += this.velocity;
            if (this.y + this.height > canvas.height || this.y < 0) {
                gameOver();
            }
        },
        flap: function () {
            this.velocity = this.jumpStrength;
        },
        reset: function () {
            this.y = 150;
            this.velocity = 0;
        }
    };
    var pipes = [];
    var pipeGap = 120;
    var pipeWidth = 50;
    var score = 0;
    var gameRunning = false;
    function createPipe() {
        var top = Math.random() * (canvas.height - pipeGap - 100) + 30;
        pipes.push({
            x: canvas.width,
            topHeight: top,
            bottomY: top + pipeGap
        });
    }
    function updatePipes() {
        for (var _i = 0, pipes_1 = pipes; _i < pipes_1.length; _i++) {
            var pipe = pipes_1[_i];
            pipe.x -= 2;
            // 충돌 체크
            if (bird.x < pipe.x + pipeWidth &&
                bird.x + bird.width > pipe.x &&
                (bird.y < pipe.topHeight || bird.y + bird.height > pipe.bottomY)) {
                gameOver();
            }
            if (pipe.x + pipeWidth === bird.x) {
                score++;
            }
        }
        pipes = pipes.filter(function (pipe) { return pipe.x + pipeWidth > 0; });
    }
    function drawPipes() {
        ctx.fillStyle = "green";
        for (var _i = 0, pipes_2 = pipes; _i < pipes_2.length; _i++) {
            var pipe = pipes_2[_i];
            ctx.fillRect(pipe.x, 0, pipeWidth, pipe.topHeight);
            ctx.fillRect(pipe.x, pipe.bottomY, pipeWidth, canvas.height - pipe.bottomY);
        }
    }
    function drawScore() {
        ctx.fillStyle = "white";
        ctx.font = "24px sans-serif";
        ctx.fillText("\uC810\uC218: ".concat(score), 20, 30);
    }
    function drawGameOver() {
        ctx.fillStyle = "red";
        ctx.font = "36px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("💥 게임 오버!", canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = "24px sans-serif";
        ctx.fillText("🖱 클릭해서 다시 시작!", canvas.width / 2, canvas.height / 2 + 30);
        ctx.textAlign = "start";
    }
    function drawStartPrompt() {
        ctx.fillStyle = "white";
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("🖱 클릭해서 시작!", canvas.width / 2, canvas.height / 2);
        ctx.textAlign = "start";
    }
    function gameOver() {
        gameRunning = false;
    }
    function resetGame() {
        pipes = [];
        score = 0;
        bird.reset();
        gameRunning = true;
    }
    function gameLoop() {
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
        }
        else if (!gameRunning && score > 0) {
            drawGameOver();
        }
        requestAnimationFrame(gameLoop);
    }
    // 🖱 마우스로만 조작
    canvas.addEventListener("mousedown", function () {
        if (!gameRunning) {
            resetGame(); // 시작 or 재시작
        }
        else {
            bird.flap(); // 플레이 중 점프
        }
    });
    // 주기적으로 파이프 생성
    setInterval(function () {
        if (gameRunning)
            createPipe();
    }, 1500);
    gameLoop();
});
var particles = [];
function createFirework(x, y, particleCount) {
    for (var i = 0; i < particleCount; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = Math.random() * 4 + 1;
        var vx = Math.cos(angle) * speed;
        var vy = Math.sin(angle) * speed;
        particles.push({
            x: x,
            y: y,
            vx: vx,
            vy: vy,
            alpha: 1,
            color: "hsl(".concat(Math.random() * 360, ", 100%, 60%)"),
        });
    }
}
function updateParticles(ctx) {
    for (var i = particles.length - 1; i >= 0; i--) {
        var p = particles[i];
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
function drawParticles(ctx) {
    for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
        var p = particles_1[_i];
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}
