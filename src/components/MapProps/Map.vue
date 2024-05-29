<!--  -->
<template>
    <div class="mapProps">
        <el-form>
            <el-form-item :label="it.title"
                v-for="it in mapList">
                <!-- 颜色选择器 -->
                <el-color-picker v-if="it.type === 'color'"
                    v-model="it.bindProp[it.prop]"
                    show-alpha
                    @[it.event]="it.func" />
                <!-- 开关 -->
                <el-switch v-else-if="it.type === 'switch'"
                    v-model="it.bindProp[it.prop]"
                    @[it.event]="it.func" />
                <!-- 数字输入框 -->
                <el-input-number v-else-if="it.type === 'number'"
                    :placeholder="it.option?.placeholder || '请输入'"
                    :step="it.option?.step || 1"
                    v-model="it.bindProp[it.prop]"
                    :min="it.option?.min ?? -Infinity"
                    :max="it.option?.max ?? Infinity"
                    @[it.event]="it.func" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { computed, reactive, onMounted, } from "vue";
import { mapProps } from '@/config/defaultConfig.js'
import { useEventbus } from '@/hooks/useEventbus.js'

let m = reactive(mapProps)
const eventBus = useEventbus()

function loadOptionsFromMeta2d (options, target) {
    for (let it in target) {
        target[it] = (options[it] || target[it])
    }
}
onMounted(() => {
    meta2d.on('opened', () => {
        const options = meta2d.data()
        loadOptionsFromMeta2d(options, m)
        loadOptionsFromMeta2d(options, meta2d.getOptions())
        eventBus.customEmit('opened')
    })
    // 初始化
    const options = meta2d.getOptions()
    loadOptionsFromMeta2d(options, m)
    meta2d.fileName = m.fileName
})

const mapList = computed(() => {
    return [
        {
            title: '背景颜色',
            type: 'color',
            prop: 'color',
            event: 'change',
            bindProp: m,//绑定属性
            func (value) {
                meta2d.setBackgroundColor(value)
                meta2d.render()
            },
        },
        {
            title: '背景网格',
            type: 'switch',
            prop: 'grid',
            bindProp: m,//绑定属性
            event: 'change',
            func (value) {
                meta2d.setGrid({
                    grid: value
                });
                meta2d.render();
            },
        },
        {
            title: '网格颜色',
            type: 'color',
            prop: 'gridColor',
            bindProp: m,//绑定属性
            event: 'change',
            func (value) {
                meta2d.setGrid({
                    gridColor: value
                });
                meta2d.render();
            },
        },
        {
            title: '网格大小',
            type: 'number',
            prop: 'gridSize',
            bindProp: m,//绑定属性
            event: 'change',
            func (value) {
                meta2d.setGrid({
                    gridSize: value
                });
                meta2d.render();
            },
        }
    ]
})
</script>