const canvas = document.getElementById('mosaic-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cols = 40;
const rows = 25;
const blockWidth = canvas.width / cols;
const blockHeight = canvas.height / rows;

// 색상 설정 (흐리게 보이는 느낌)
ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
ctx.filter = 'blur(8px)';

// 초기 블록 좌표 배열
let activeRows = Array.from({ length: rows }, (_, i) => i);

function drawFrame(time: number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < activeRows.length; r++) {
        const y = activeRows[r] * blockHeight;

        for (let c = 0; c < cols; c++) {
            const x = c * blockWidth;
            ctx.fillRect(x, y, blockWidth, blockHeight);
        }
    }
}

// 애니메이션
let currentRow = 0;
function animate() {
    drawFrame(performance.now());

    currentRow++;
    if (currentRow < rows) {
        activeRows = activeRows.slice(1);
        requestAnimationFrame(animate);
    } else {
        // 애니메이션 종료 후 캔버스 제거
        setTimeout(() => {
            canvas.remove();
        }, 500);
    }
}

animate();
