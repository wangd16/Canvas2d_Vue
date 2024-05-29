<template>

    <!-- 导航链接 -->
    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
    </nav>
    <!-- 路由视图区域 -->
    <router-view></router-view>

</template>
<script setup></script>

<style>
* {
    margin: 0;
    padding: 0;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}

#app {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

nav {
    text-align: center;
}
</style>
