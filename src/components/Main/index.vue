<template>
    <div class="main">
        <Icons></Icons>
        <Meta2d></Meta2d>
        <Setting></Setting>
    </div>
</template>

<script setup>
import Icons from "../Icons/index.vue";
import Meta2d from "../Meta2d/index.vue";
import Setting from "../Setting/index.vue";
</script>

<style lang="scss" scoped>
.main {
    flex: 1;
    height: calc(100% - 59px);
    display: flex;
    justify-content: flex-start;
}
</style>