<!--  -->
<template>
    <div class="setting">
        <div class="tz_props"
            v-show="!activePen">
            <el-tabs class="demo-tabs">
                <el-tab-pane label="能流图设置">
                    <MapProps></MapProps>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="tz_props"
            v-show="activePen && !linePen && !multiPen">
            <el-tabs v-model="activeName"
                class="demo-tabs">
                <el-tab-pane label="外观"
                    name="appearance">
                    <!-- 通用外观 -->
                    <Appearance :isLine="linePen" />
                </el-tab-pane>
                <el-tab-pane label="数据源"
                    name="dataSource">
                    <DataSource />
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="tz_props"
            v-show="activePen && linePen && !multiPen">
            <el-tabs v-model="activeName"
                class="demo-tabs">
                <el-tab-pane label="外观"
                    name="appearance">
                    <!-- 通用外观 -->
                    <Appearance :isLine="linePen" />
                </el-tab-pane>
                <el-tab-pane name="animate"
                    label="动效">
                    <Animation />
                </el-tab-pane>
                <el-tab-pane label="数据源"
                    name="dataSource">
                    <DataSource />
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="tz_props"
            v-show="multiPen">
            <el-tabs v-model="activeName"
                class="demo-tabs">
                <el-tab-pane label="外观"
                    name="appearance">
                    <!-- 多选时的外观 -->
                    <AppearancePosition />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MapProps from '@/components/MapProps/Map.vue'
import Appearance from '@/components/PenProps/Appearance.vue'
import AppearancePosition from '@/components/PenProps/AppearancePosition.vue'
import DataSource from '@/components/PenProps/DataSource.vue'
import Animation from '@/components/PenProps/Animation.vue'
const activeName = ref('appearance')
let activePen = ref(false)//单选
let multiPen = ref(false)//多选
let linePen = ref(false) //是否是线条

// todo 通过name 判断是否选中的line，如果是，则显示动画,两个及以上显示排序
onMounted(() => {
    // 监听鼠标点击事件，返回
    meta2d.on('active', (args) => {
        const isLinePen = args.length === 1 && args[0].type === 1;
        // 是否有选中的
        activePen.value = args.length >= 1;
        // 选中的是否是连线
        linePen.value = isLinePen;
        // 是否选中了多个
        multiPen.value = args.length > 1;
    })
    meta2d.on('inactive', () => {
        activePen.value = false
        multiPen.value = false
        linePen.value = false
    })
})
</script>

<style lang='scss' scoped>
.setting {
    position: relative;
    display: flex;
    width: 280px;
    overflow: auto;
    box-shadow: 0 2px 4px 0 #dad7d7;

    .tz_props {
        display: flex;
        width: 100%;
    }
}

:deep(.el-tabs) {
    display: flex;
    flex-direction: column;
    width: 100%;
}

:deep(.el-tabs__header) {
    margin: 0;
}

:deep(.el-tabs__nav-wrap) {
    margin: 0 8px;
    line-height: .32rem;
    cursor: pointer;
}

:deep(.el-tabs__content) {
    flex: 1;
    overflow: auto;
    padding: 0 15px;
}

// 公共设置字体大小
:deep(.el-tabs__item, .el-form-item__label) {
    font-size: 12px;
}

:deep(.el-color-picker .el-color-picker__icon) {
    display: none;
}

:deep(.el-tabs__content::-webkit-scrollbar) {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

:deep(.el-tabs__content::-webkit-scrollbar-thumb) {
    /*滚动条里面小方块*/
    border-radius: 10px;
    height: 20px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #4e4e4e;
}

:deep(.el-tabs__content::-webkit-scrollbar-track) {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ffffff;
}
</style>