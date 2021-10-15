// 设置屏幕高度 获取的是文档的高度
let canvas = document.getElementById("canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// copy的一些样式
let ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.strokeStyle = "gray";
ctx.lineCap = "round";
ctx.lineWidth = 4;

// 设置连线
function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// 监听上一次的位置
let last = null;

// 监听移动端触碰事件
let painting = false;

let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        last = [x, y];
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX;
        let y = e.touches[0].clientY;
        drawLine(last[0], last[1], x, y);
        last = [x, y];

    }
} else {

    // 鼠标按下事件
    canvas.onmousedown = (e) => {
        painting = true;
        last = [e.clientX, e.clientY];
    }

    // 跟随鼠标移动的坐标
    canvas.onmousemove = (e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY);
            last = [e.clientX, e.clientY];
        }
    }

    // 鼠标松开
    canvas.onmouseup = () => {
        painting = false;
    }
}