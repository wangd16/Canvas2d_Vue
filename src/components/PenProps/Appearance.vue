<!--  -->
<template>
    <div class="appearanceProps">
        <Form :form-list="showMap"></Form>
    </div>
</template>

<script setup>
import { computed, onMounted, reactive, toRaw } from 'vue'
import { deepClone, PenType } from "@meta2d/core";
import Form from '@/components/Form.vue'
import { appearanceProps } from '@/config/defaultConfig'
import { mergeProps } from '@/utils/mergeProps'
import { LINE_STYLE, LINE_TYPE, startIcon, endIcon } from './constants'
import { optimizedIcons } from './utils'

const props = defineProps({
    isLine: {
        type: Boolean,
        default: false,
    }
})

const isLine = computed(() => {
    return props.isLine
})

//深拷贝保存默认配置
const defaultConfig = deepClone(appearanceProps)
let m = reactive(appearanceProps) // 响应式数据源
let activePen = reactive({ target: {} })
let otherProps = reactive({ props: [] })

// 更新属性方法
function updateFunc (prop) {
    return (value) => {

        meta2d.setValue({
            id: activePen.target.id,
            [prop]: value,
        })
        // !行高变化时，实现文字高度变化
        if (prop === 'maxRows' || prop == 'lineHeight' || prop === 'fontSize') {
            meta2d.setValue({
                id: activePen.target.id,
                textHeight: Number(activePen.target.fontSize) * Number(activePen.target.lineHeight) * Number(activePen.target.maxRows || 1)
            })
        }
    }
}


onMounted(() => {
    meta2d.on('active', (args) => {
        // 只修改一个
        if (args.length >= 1) {

            activePen.target = reactive(args[0])

            otherProps.props = []
            if (activePen.target.props) {
                let otherProp = {
                    title: "其他",
                    children: []
                }
                activePen.target.props.forEach((prop) => {
                    otherProp.children.push({
                        title: prop.title,
                        type: prop.type,
                        prop: prop.prop,
                        bindProp: m,
                        event: prop.event,
                        func: updateFunc(prop.prop)
                    })
                })
                otherProps.props.push(otherProp)
            }
            // 连接线
            if (activePen.target.type === 1) {
                activePen.target.ex = activePen.target.x + activePen.target.width || activePen.target.ex
                activePen.target.ey = activePen.target.y + activePen.target.height || activePen.target.ey
            }

            // 设置线条样式初始显示值
            activePen.target.dash = activePen.target.dash || 1
            // 设置行数初始显示值
            activePen.target.maxRows = activePen.target.maxRows || 1
            // 设置默认的文字高度
            activePen.target.textHeight = activePen.target.fontSize * activePen.target.lineHeight * activePen.target.maxRows
            mergeProps(m, defaultConfig)
            mergeProps(m, activePen.target)
            const penRect = meta2d.getPenRect(toRaw(activePen.target))
            Object.assign(m, penRect)
        }
    })

    // 更新数据  合并多个事件
    meta2d.on('update', () => {
        meta2d.emit('editPen')
    })
    meta2d.on('resizePens', () => {
        meta2d.emit('editPen')
    })
    meta2d.on('rotatePens', () => {
        meta2d.emit('editPen')
    })
    meta2d.on('valueUpdate', () => {
        meta2d.emit('editPen')
    })
    meta2d.on('editPen', () => {
        mergeProps(m, activePen.target)
    })
})

// 通用位置大小配置
const positionSize = [{
    title: '位置大小',
    multiShow: false,
    className: 'collapse-position-size',
    children: [
        {
            title: 'x',
            type: 'number',
            prop: 'x',
            unit: 'px',
            bindProp: m,
            event: 'change',
            func (value) {
                meta2d.setValue({
                    id: activePen.target.id,
                    x: value
                })
                meta2d.canvas.calcActiveRect()
                mergeProps(m, activePen.target)
                meta2d.render()
            }

        },
        {
            title: "y",
            type: "number",
            prop: "y",
            option: {
                placeholder: "px"
            },
            bindProp: m,
            event: "change",
            func (value) {
                // meta2d.setPenRect(toRaw(activePen.target),{x:activePen.target.x,y:value,width:activePen.target.width,height:activePen.target.height},false)
                meta2d.setValue({
                    id: activePen.target.id,
                    y: value
                })
                meta2d.canvas.calcActiveRect()
                mergeProps(m, activePen.target)
                meta2d.render()
            }
        },
        {
            title: "宽",
            type: "number",
            prop: "width",
            bindProp: m,
            option: {
                min: 0
            },
            event: "change",
            func (value) {
                if (activePen.target.ratio) {
                    meta2d.setValue({
                        id: activePen.target.id,
                        width: value,
                        height: value / activePen.target.width * activePen.target.height
                    })
                } else {
                    meta2d.setValue({
                        id: activePen.target.id,
                        width: value
                    })
                }
                mergeProps(m, activePen.target)
            }
        },
        {
            title: "高",
            type: "number",
            prop: "height",
            bindProp: m,
            event: "change",
            func (value) {
                if (activePen.target.ratio) {
                    meta2d.setValue({
                        id: activePen.target.id,
                        height: value,
                        width: value / activePen.target.height * activePen.target.width
                    })
                } else {
                    meta2d.setValue({
                        id: activePen.target.id,
                        height: value
                    })
                }
                mergeProps(m, activePen.target)
            }
        },
        {
            title: "圆角",
            type: "number",
            prop: "borderRadius",
            bindProp: m,
            event: "change",
            option: {
                min: 0
            },
            func: updateFunc("borderRadius")
        },
        {
            title: "旋转",
            type: "number",
            prop: "rotate",
            bindProp: m,
            event: "change",
            option: {
                placeholder: "角度",
            },
            func: updateFunc("rotate")
        },
        {
            title: "内边距左",
            type: "number",
            prop: "paddingLeft",
            bindProp: m,
            event: "change",
            option: {
                placeholder: "px",
            },
            func: updateFunc("paddingLeft")
        },
        {
            title: "内边距右",
            type: "number",
            prop: "paddingRight",
            bindProp: m,
            event: "change",
            option: {
                placeholder: "px",
            },
            func: updateFunc("paddingRight")
        },
        {
            title: "内边距上",
            type: "number",
            prop: "paddingTop",
            bindProp: m,
            event: "change",
            option: {
                placeholder: "px",
            },
            func: updateFunc("paddingTop")
        },
        {
            title: "内边距下",
            type: "number",
            prop: "paddingBottom",
            bindProp: m,
            event: "change",
            option: {
                placeholder: "px",
            },
            func: updateFunc("paddingBottom")
        },
    ]
}]
// 通用样式配置 
const style = [{
    title: '样式',
    multiShow: false,
    className: 'collapse-style',
    children: [
        {
            title: "线条样式",
            type: "select",
            multiShow: true,
            prop: "dash",
            option: {
                placeholder: "线条样式",
                list: LINE_STYLE
            },
            bindProp: m,
            event: "change",
            func (value) {
                const dash = [
                    [0, 0],
                    [5, 5],
                    [10, 10],
                    [10, 10, 2, 10]
                ]

                activePen.target.dash = value
                meta2d.setValue({
                    id: activePen.target.id,
                    dash: value,
                    lineDash: dash[value - 1]
                })
            }
        },
        {
            title: "线条宽度",
            type: "number",
            multiShow: true,
            prop: "lineWidth",
            bindProp: m,
            event: "change",
            func: updateFunc("lineWidth")
        },
        {
            // ! 线条颜, 设置文字颜色不随背景色更改
            title: "线条颜色",
            type: "color",
            multiShow: true,
            prop: "color",
            bindProp: m,
            event: "change",
            func (value) {
                meta2d.setValue({
                    id: activePen.target.id,
                    color: value,
                    textColor: activePen.target.textColor || "#000"
                })
            }
        },
        {
            title: "背景颜色",
            type: "color",
            multiShow: true,
            prop: "background",
            bindProp: m,
            event: "change",
            func: updateFunc("background")
        },
        {
            title: "透明度",
            type: "number",
            multiShow: true,
            prop: "globalAlpha",
            bindProp: m,
            option: {
                min: 0,
                step: 0.1,
                max: 1
            },
            event: "change",
            func: updateFunc("globalAlpha")
        },
    ]
}]
// 通用文字配置
const text = [{
    title: '文字',
    multiShow: false,
    className: 'collapse-characters',
    children: [
        {
            title: '字体',
            type: 'select',
            multiShow: true,
            prop: 'fontFamily',
            bindProp: m,
            event: 'change',
            func: updateFunc('fontFamily'),
            option: {
                placeholder: '请选择字体',
                list: [
                    { label: '宋体', value: '宋体' },
                    { label: '黑体', value: '黑体' }
                ]
            },

        },
        {
            title: '大小',
            type: 'number',
            multiShow: true,
            prop: 'fontSize',
            bindProp: m,
            event: 'change',
            func: updateFunc('fontSize'),
        },
        {
            title: '行高',
            type: 'number',
            multiShow: true,
            prop: 'lineHeight',
            bindProp: m,
            event: 'change',
            func: updateFunc('lineHeight')
        },
        // ! 最大行数 未找到api实现 应该通过修改文字高度去实现换行显示 文字高度=文字大小*文字行高*最大行数
        {
            title: '最大行数',
            type: 'number',
            multiShow: true,
            prop: 'maxRows',
            bindProp: m,
            event: 'change',
            option: {
                min: 1,
            },
            func: updateFunc('maxRows'),
        },
        {
            title: '字体粗细',
            type: 'select',
            multiShow: true,
            prop: 'fontWeight',
            bindProp: m,
            event: 'change',
            func: updateFunc('fontWeight'),
            option: {
                placeholder: '请选择粗细',
                list: [
                    { label: '100', value: 100 },
                    { label: '200', value: 200 },
                    { label: '300', value: 300 },
                    { label: '400', value: 400 },
                    { label: '500', value: 500 },
                    { label: '600', value: 600 },
                    { label: '700', value: 700 },
                    { label: '800', value: 800 },
                    { label: '900', value: 900 },
                    { label: '1000', value: 1000 },
                ]
            }
        },
        {
            title: '水平偏移（px）',
            type: 'number',
            multiShow: true,
            prop: 'textLeft',
            bindProp: m,
            event: 'change',
            func: updateFunc('textLeft')
        },
        {
            title: '垂直偏移（px）',
            type: 'number',
            multiShow: true,
            prop: 'textTop',
            bindProp: m,
            event: 'change',
            func: updateFunc('textTop')
        },
        {
            title: '文字颜色',
            type: 'color',
            multiShow: true,
            prop: 'textColor',
            bindProp: m,
            event: 'change',
            func: updateFunc('textColor')
        },
        {
            title: "内容",
            type: "input",
            option: {
                type: "textarea"
            },
            prop: "text",
            bindProp: m,
            event: "input",
            func: updateFunc("text")
        }
    ]
}]

// 线条样式
const lineStyle = [{
    title: '样式',
    multiShow: false,
    className: 'collapse-style',
    children: [
        {
            title: "线条样式",
            type: "select",
            multiShow: true,
            prop: "dash",
            option: {
                placeholder: "线条样式",
                list: [
                    {
                        label: "直线",
                        template: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" style=\"height: 20px;width: 80px;\">\n" +
                            "                  <g fill=\"none\" stroke=\"black\" stroke-width=\"1\">\n" +
                            "                    <path d=\"M0 9 l85 0\"></path>\n" +
                            "                  </g>\n" +
                            "                </svg>",
                        value: 1
                    },
                    {
                        label: "点线",
                        template: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" style=\"height: 20px;width: 80px;\">\n" +
                            "                  <g fill=\"none\" stroke=\"black\" stroke-width=\"1\">\n" +
                            "                    <path stroke-dasharray=\"5 5\" d=\"M0 9 l85 0\"></path>\n" +
                            "                  </g>\n" +
                            "                </svg>",
                        value: 2
                    },
                    {
                        label: "虚线",
                        template: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" style=\"height: 20px;width: 80px;\">\n" +
                            "                  <g fill=\"none\" stroke=\"black\" stroke-width=\"1\">\n" +
                            "                    <path stroke-dasharray=\"10 10\" d=\"M0 9 l85 0\"></path>\n" +
                            "                  </g>\n" +
                            "                </svg>",
                        value: 3
                    },
                    {
                        label: "点横线",
                        template: "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" style=\"height: 20px;width: 80px;\">\n" +
                            "                  <g fill=\"none\" stroke=\"black\" stroke-width=\"1\">\n" +
                            "                    <path stroke-dasharray=\"10 10 2 10\" d=\"M0 9 l85 0\"></path>\n" +
                            "                  </g>\n" +
                            "                </svg>",
                        value: 4
                    },
                ]
            },
            bindProp: m,
            event: "change",
            func (value) {
                const dash = [
                    [0, 0],
                    [5, 5],
                    [10, 10],
                    [10, 10, 2, 10]
                ]

                activePen.target.dash = value
                meta2d.setValue({
                    id: activePen.target.id,
                    dash: value,
                    lineDash: dash[value - 1]
                })
            }
        },
        {
            title: "连线类型",
            type: "select",
            multiShow: true,
            prop: "lineName",
            bindProp: m,
            event: "change",
            option: {
                list: optimizedIcons(LINE_TYPE)
            },
            func (value) {
                // 只进行当前的连线样式
                meta2d.canvas.drawingLineName &&
                    (meta2d.canvas.drawingLineName = value);
                // 更新图元的连线样式
                meta2d.store.active?.forEach((pen) => {
                    meta2d.updateLineType(pen, value);
                });
                meta2d.render()
            }
        },
        {
            title: "线条宽度(px)",
            type: "number",
            multiShow: true,
            prop: "lineWidth",
            bindProp: m,
            event: "change",
            func: updateFunc("lineWidth")
        },
        {
            // ! 线条颜, 设置文字颜色不随背景色更改
            title: "线条颜色",
            type: "color",
            multiShow: true,
            prop: "color",
            bindProp: m,
            event: "change",
            func (value) {
                meta2d.setValue({
                    id: activePen.target.id,
                    color: value,
                    textColor: activePen.target.textColor || "#000"
                })
            }
        },
        {
            title: "边框宽度(px)",
            type: "number",
            multiShow: true,
            prop: "borderWidth",
            bindProp: m,
            event: "change",
            func: updateFunc("borderWidth")
        },
        {
            title: "透明度",
            type: "number",
            multiShow: true,
            prop: "globalAlpha",
            bindProp: m,
            option: {
                min: 0,
                step: 0.1,
                max: 1
            },
            event: "change",
            func: updateFunc("globalAlpha")
        },
    ]
}]


// ! 修改连线的箭头样式、箭头大小
function updateArrow (key) {
    // meta2d.store.data.toArrow = value  // 修改meta2d的fromArrow样式值
    return (value) => {
        if (meta2d.store.active) {   // 循环遍历 修改激活图元fromArrow// 样式
            meta2d.store.active.forEach((i) => {
                if (i.type === PenType.Line) {
                    i[key] = value
                }
            })
        }
        meta2d.render()  //重新渲染
    }
}

// 线条位置
const linePosition = [
    {
        title: '位置',
        multiShow: false,
        className: 'collapse-position-size',
        children: [
            {
                title: '起点',
                type: 'number',
                prop: 'x',
                option: {
                    placeholder: "X（px）"
                },
                bindProp: m,
                event: 'change',
                func (value) {
                    meta2d.setValue({
                        id: activePen.target.id,
                        x: value,
                        ex: value + activePen.target.width
                    })
                    meta2d.canvas.calcActiveRect()
                    mergeProps(m, activePen.target)
                    meta2d.render()
                }
            },
            {
                title: " ",
                type: "number",
                prop: "y",
                option: {
                    placeholder: "Y（px）"
                },
                bindProp: m,
                event: "change",
                func (value) {
                    // meta2d.setPenRect(toRaw(activePen.target),{x:activePen.target.x,y:value,width:activePen.target.width,height:activePen.target.height},false)
                    meta2d.setValue({
                        id: activePen.target.id,
                        y: value,
                        ey: value + activePen.target.height
                    })
                    meta2d.canvas.calcActiveRect()
                    mergeProps(m, activePen.target)
                    meta2d.render()
                }
            },
            // TODO 初始位置为 起点x+width y+height
            // TODO 如何实现修改终点坐标后出发点位更新
            {
                title: "终点",
                type: "number",
                prop: "ex",
                bindProp: m,
                option: {
                    placeholder: "X（px）"
                },
                event: "change",
                func (value) {
                    meta2d.setValue({
                        id: activePen.target.id,
                        ex: value
                    })
                    meta2d.canvas.calcActiveRect()
                    mergeProps(m, activePen.target)
                    meta2d.render()
                }
            },
            {
                title: " ",
                type: "number",
                prop: "ey",
                bindProp: m,
                option: {
                    placeholder: "Y（px）"
                },
                event: "change",
                func (value) {
                    meta2d.setValue({
                        id: activePen.target.id,
                        ey: value
                    })
                    meta2d.canvas.calcActiveRect()
                    mergeProps(m, activePen.target)
                    meta2d.render()
                }
            },
            {
                title: "起点箭头",
                type: "select",
                prop: "fromArrow",
                bindProp: m,
                event: "change",
                option: {
                    list: optimizedIcons(startIcon)
                },
                func: updateArrow('fromArrow')
            },
            {
                title: "终点箭头",
                type: "select",
                prop: "toArrow",
                bindProp: m,
                event: "change",
                option: {
                    list: optimizedIcons(endIcon)
                },
                func: updateArrow('toArrow')
            },
            {
                title: "起点箭头大小",
                type: "number",
                prop: "fromArrowSize",
                bindProp: m,
                event: "change",
                option: {
                    placeholder: "px",
                },
                func: updateArrow("fromArrowSize")
            },
            {
                title: "终点箭头大小",
                type: "number",
                prop: "toArrowSize",
                bindProp: m,
                event: "change",
                option: {
                    placeholder: "px",
                },
                func: updateArrow("toArrowSize")
            },
        ]
    }
]

const map = computed(() => {
    if (props.isLine) {
        return [...lineStyle, ...linePosition, ...text]
    }
    return [...positionSize, ...style, ...text]
})

let showMap = computed(() => {
    if (otherProps) {
        return map.value.concat(otherProps.props)
    }
})

</script>
<style lang='scss' scoped>
.appearanceProps {}
</style>