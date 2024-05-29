<!-- Nav.vue -->
<template>
    <el-menu class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :popper-offset="3"
        popper-class="style-position"
        index="1">
        <!-- 左侧操作栏 -->
        <div v-for="(it, index) in menu.left">
            <el-sub-menu v-if="it.children"
                :index="(index + 1) + ''">
                <template #title>{{ it.name }}</template>
                <el-menu-item v-for="(c, i) in it.children"
                    :index="`${index + 1}-${i + 1}`"
                    @click="dispatchFunc(c.action)">{{ c.name
                    }}</el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else
                @click="dispatchFunc(it.action)"
                :index="index + 1 + ''">{{ it.name }}</el-menu-item>
        </div>

        <div class="flex-grow"></div>

        <!-- 右侧操作栏 -->
        <div v-for="(it, index) in menu.right">
            <el-sub-menu v-if="it.children"
                :index="(index + 1) + ''">
                <template #title>
                    <div class="title">
                        {{ it.name }}
                    </div>
                </template>
                <el-menu-item v-for="(c, i) in it.children"
                    :index="`${index + 1}-${i + 1}`"
                    @click="dispatchFunc(c.action, c.value, c.icon)">
                    {{ c.name }}
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else
                :index="index + 1 + ''"
                @click="dispatchFunc(it.action, it.value, it.icon)">
                {{ it.name }}
            </el-menu-item>
        </div>
    </el-menu>
</template>

<script setup>
import { menu, dispatchFunc } from "@/config/defaultConfig.js";


</script>
<style lang="scss" scoped>
.style-position {
    position: absolute;

    inset: 83.75px auto auto 0 !important;
    color: red
}

.flex-grow {
    flex-grow: 1;
}

.font-size {
    font-size: 20px;
}

.title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-direction: column;
}
</style>