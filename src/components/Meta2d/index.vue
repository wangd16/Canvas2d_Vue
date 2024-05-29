<!-- meta2d图纸所占位置 -->
<template>
    <div id="meta2d"></div>
    <ContextMenu></ContextMenu>
</template>

<script setup>
import { onMounted } from 'vue'
import { Meta2d } from "@meta2d/core";
import { flowPens } from "@meta2d/flow-diagram";
import { register as registerEcharts } from "@meta2d/chart-diagram";
import ContextMenu from '@/components/ContextMenu/index.vue'

import { useEventbus } from '@/hooks/useEventbus.js'

const event = useEventbus()

onMounted(async () => {
    // 创建meta2d对象
    let meta2d = new Meta2d("meta2d")
    window.meta2d = meta2d // 挂载到全局对象上  
    meta2d.register(flowPens())

    // 直接调用Echarts的注册函数
    registerEcharts();

    event.customEmit('opened')
    event.customEmit('load')


    window.addEventListener('contextmenu', handlerContextmenu);
})


//当放大镜是开始状态时，单机鼠标右键关闭放大镜
function handlerContextmenu () {
    if (window.meta2d.canvas.magnifierCanvas.magnifier) {
        window.meta2d.hideMagnifier()
    }
}

</script>

<style lang="scss" scoped>
#meta2d {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #eee;
}
</style>