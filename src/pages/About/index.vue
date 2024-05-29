<template>
    <div>
        <!-- Canvas 元素用于渲染动画 -->
        <canvas ref="canvas"
            width="800"
            height="600"></canvas>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

let canvas;
let ctx;
let lineStart = { x: 100, y: 100 }; // 连线起点
let lineEnd = { x: 500, y: 500 }; // 连线终点
let particle; // 粒子对象

onMounted(() => {
    // 获取 canvas 元素
    canvas = $refs.canvas;
    ctx = canvas.getContext("2d");

    // 创建粒子对象
    particle = meta2d.createParticle(lineStart);

    // 启动动画
    animateComet();
});

onUnmounted(() => {
    // 停止动画
    cancelAnimationFrame(animationId);
});

// 定义彗星动画
function animateComet () {
    const animationId = requestAnimationFrame(animateComet);

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制连接线
    ctx.beginPath();
    ctx.moveTo(lineStart.x, lineStart.y);
    ctx.lineTo(lineEnd.x, lineEnd.y);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.stroke();

    // 计算粒子在连接线上的位置
    const position = calculatePositionAlongLine(lineStart, lineEnd, particle);

    // 绘制彗星粒子
    ctx.beginPath();
    ctx.arc(position.x, position.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
}

// 辅助函数：计算粒子在连接线上的位置
function calculatePositionAlongLine (start, end, particle) {
    // 根据时间计算粒子在连接线上的位置
    // 这里可以使用简单的线性插值或更复杂的运动算法
    // 这里简单示范了线性插值
    const progress = particle.elapsedTime / particle.animationDuration;
    const x = start.x + (end.x - start.x) * progress;
    const y = start.y + (end.y - start.y) * progress;
    return { x, y };
}
</script>
