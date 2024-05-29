<!--  -->
<template>
    <div class="contextmenu"
        ref="ctxMenuRef"
        tabindex="-1"
        @blur="ctxMenuClose">
        <template v-for="(item, index) in menuItems"
            :key="index">
            <div v-if="!item.condition || isPens"
                :class="['ctx_item', item.shortcut ? 'item_flex' : '']"
                @click="item.action ? handleAction(item.action) : handleOperation(item.value)">
                <span>{{ item.text }}</span>
                <span v-if="item.shortcut">{{ item.shortcut }}</span>
            </div>
            <div v-if="item.hasLine"
                class="line"></div>
        </template>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useEventbus } from '@/hooks/useEventbus.js'
let isPens = ref(false)
let ctxMenuRef = ref()
// 选中项
let activePens = []

// 菜单初始为位置
let menuPos = reactive({
    top: -9999,
    left: -9999,
    visible: false
})

// 菜单项配置
let menuItems = computed(() => {
    return [
        { text: '置顶', action: 'top', hasLine: false, condition: true },
        { text: '置底', action: 'bottom', hasLine: isPens.value, condition: true },
        { text: '取消组合', hasLine: isPens.value, condition: true },
        { text: '删除', hasLine: isPens.value, condition: true },
        { text: '撤销', action: 'undo', shortcut: 'Ctrl + Z', hasLine: false, condition: false },
        { text: '重做', action: 'redo', shortcut: 'Ctrl + Shift + Z', hasLine: true, condition: false },
        { text: '剪切', value: 'cut', shortcut: 'Ctrl + X', hasLine: false, condition: true },
        { text: '复制', value: 'copy', shortcut: 'Ctrl + C', hasLine: false, condition: true },
        { text: '粘贴', value: 'paste', shortcut: 'Ctrl + V', hasLine: false, condition: false }
    ]
})

const calcMenuPos = computed(() => {
    return {
        top: menuPos.top + "px",
        left: menuPos.left + "px",
        visible: menuPos.visible ? "visible" : "hidden"
    }
})

const eventBus = useEventbus()

eventBus.customOn('load', () => {
    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        ctxMenuRef.value.focus()
    })
    meta2d.on('contextmenu', ({ e }) => {
        menuPos.top = e.clientY
        menuPos.left = e.clientX
        menuPos.visible = true
        ctxMenuRef.value.focus()
    })
    meta2d.on("active", (pens) => {
        if (pens.length > 0) {
            activePens = reactive(pens)
            isPens.value = true
        } else {
            isPens.value = false
            activePens = []
        }
    })
    meta2d.on('inactive', () => {
        isPens.value = false
    })
})

// 置顶、置地、撤销、重做操作
function handleAction (pos) {
    switch (pos) {
        case "top":
            meta2d.top(activePens)
            break
        case "bottom":
            meta2d.bottom(activePens)
            break
        case "undo":
            meta2d.undo()
            break
        case 'redo':
            meta2d.redo()
    }
    ctxMenuRef.value.blur()
}

// 剪切、复制、粘贴操作
function handleOperation (val) {
    switch (val) {
        case "cut":
            cut()
            break
        case "copy":
            copy()
            break
        case "paste":
            paste()
            break
    }
    ctxMenuRef.value.blur()
}

function ctxMenuClose () {
    menuPos.visible = false
}

function cut () {
    if (!isPens.value) return
    meta2d.cut(activePens)
    ctxMenuRef.value.blur()
}
function copy () {
    if (!isPens.value) return
    meta2d.copy(activePens)
    ctxMenuRef.value.blur()
}
// 粘贴之前判断是否存在复制的图元
function paste () {
    meta2d.paste()
    ctxMenuRef.value.blur()
}


</script>
<style lang="scss" scoped>
.contextmenu {
    padding: 6px;
    position: absolute;
    top: v-bind("calcMenuPos.top");
    left: v-bind("calcMenuPos.left");
    visibility: v-bind("calcMenuPos.visible");
    z-index: 999;
    color: #000;
    width: 190px;
    background-color: #fff;
    box-shadow: 0 0 10px #0000004d;
    text-align: left;
    padding: 8px 0;

    .ctx_item {
        color: #595959;
        padding: 5px 20px;
        transition: background-color .5s ease;
        font-size: 12px;
    }

    .ctx_item:hover {
        cursor: pointer;
        color: #26bbf0 !important;
    }

    .item_flex {
        display: flex;
        justify-content: space-between;
    }

    .line {
        background-color: transparent !important;
        padding: 0;
        margin: .05rem 0;
        border-top: 1px solid #eee;
    }
}
</style>