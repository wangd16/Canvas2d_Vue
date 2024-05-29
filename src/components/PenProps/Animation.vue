<!--  -->
<template>
    <el-collapse>
        <el-collapse-item class="collapse-animation"
            title="动画">
            <el-form className="grid-container"
                label-position="top"
                @submit="(e) => e.preventDefault()">
                <el-form-item label="动画">
                    <el-switch v-model="animate.play"
                        @change="handlerAnimate" />
                </el-form-item>
                <el-form-item label="动画类型">
                    <el-select v-model="animate.lineAnimateType">
                        <el-option v-for="item in ANIMATION_TYPE"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            <div v-if="item.template"
                                class="select_template"
                                v-html="item.template"></div>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="颜色">
                    <el-input type="color"
                        v-model="animate.animateColor"
                        show-alpha></el-input>
                </el-form-item>
                <el-form-item label="动画速度">
                    <el-input-number :step="1"
                        v-model="animate.animateSpan"
                        :min="0"
                        :max="5" />
                </el-form-item>
                <el-form-item label="圆点大小">
                    <el-input-number :step="1"
                        v-model="animate.animateDotSize"
                        :min="6"
                        :max="Infinity" />
                </el-form-item>

            </el-form>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from "vue";

const ANIMATION_TYPE = [
    {
        label: '水珠流动',
        value: 1,
    },
    {
        label: '圆点',
        value: 2,
    },
    {
        label: '水流',
        value: 0,
    },
]
let animate = ref({
    play: false,//是否播放
    autoPlay: false,//是否自动播放
    lineAnimateType: 1,//动画类型
    animateColor: '',//颜色
    animateSpan: 1,//动画速度
    animateDotSize: 20,//圆点大小
    animateCycle: Infinity,// 动画播放次数
})

let activePen = {}

onMounted(() => {
    meta2d.on('active', (pens) => {
        if (pens[0]?.type !== 1) return
        console.log('🚀WYD-dev 🚝 meta2d.on 🚝 pens:', pens);
        animate.value = {
            play: false,
            autoPlay: false,
            lineAnimateType: 1,
            animateColor: '',
            animateSpan: 1,
            animateDotSize: 20,
        }
        if (pens.length === 1) {
            activePen = reactive(pens[0])
        }
        if (pens[0]) {
            animate.value.play = activePen.play || false
            animate.value.autoPlay = activePen.autoPlay || false
            animate.value.lineAnimateType = activePen.lineAnimateType || 1
            animate.value.animateColor = activePen.animateColor || ''
            animate.value.animateSpan = activePen.animateSpan || 1
            animate.value.animateDotSize = activePen.animateDotSize || 20
            animate.value.animateCycle = activePen.animateCycle || Infinity
        }
    })
})

function handlerAnimate (value) {
    if (value) {
        activePen.play = animate.value.play
        activePen.lineAnimateType = animate.value.lineAnimateType
        activePen.animateColor = animate.value.animateColor
        activePen.animateSpan = animate.value.animateSpan
        activePen.animateDotSize = animate.value.animateDotSize
        activePen.animateCycle = animate.value.animateCycle
        console.log('🚀WYD-dev 🚝 handlerAnimate 🚝 activePen:', activePen);
        meta2d.startAnimate([activePen])
    } else {
        meta2d.stopAnimate([activePen])
    }
}

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
    const position = calculatePositionAlongLine(lineStart, lineEnd, cometParticle);

    // 绘制彗星粒子
    drawComet(position.x, position.y);
}

// 辅助函数：计算粒子在连接线上的位置
function calculatePositionAlongLine (start, end, particle) {
    // 根据时间计算粒子在连接线上的位置
    // 这里使用线性插值
    const progress = particle.elapsedTime / particle.animationDuration;
    const x = start.x + (end.x - start.x) * progress;
    const y = start.y + (end.y - start.y) * progress;
    return { x, y };
}

// 绘制彗星粒子
function drawComet (x, y) {
    // 绘制彗星尾巴
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 5);
    ctx.lineTo(x, y);
    ctx.lineTo(x - 10, y + 5);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // 绘制彗星头部
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
}


</script>

<style lang='scss' scoped>
.collapse-animation {
    padding: 12px 0;
    border-bottom: 1px solid #ebeef5;

    .el-form-item {
        display: initial;
        margin: 0 0;

        :deep(.el-input-number) {
            width: 100%;

            .el-input-number__decrease,
            .el-input-number__increase {
                display: none;
            }

            .el-input__wrapper {
                padding: 0 10px;
            }
        }
    }
}

:deep(.el-collapse-item) {
    &:last-child {
        border-bottom: none;
    }
}

:deep(.el-collapse-item__header) {
    height: 16px;
    font-weight: 1000;
    border-bottom: none;
    outline: 0 !important;
    margin-bottom: 5px;
}

:deep(.el-collapse-item__wrap) {
    border-bottom: none;
}

:deep(.el-collapse-item__content) {
    padding-bottom: 0px;

    .el-text {
        color: #c4c9cd;
        font-size: 12px;
    }
}

:deep(.el-form-item__label) {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
}
</style>