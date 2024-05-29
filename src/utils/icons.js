import { ReplaceMode } from '@meta2d/chart-diagram';

export const defaultIcons = [
    {
        name: '基本形状',
        list: [
            {
                name: 'square',
                icon: 'l-rect',
                id: 1,
                data: {
                    text: '正方形',
                    width: 100,
                    height: 100,
                    tag: 'mind',
                    name: 'square',
                    form: [
                        {
                            key: 'text',
                            type: 'text',
                            name: '文本',
                        },
                    ]
                },
            },
            {
                name: 'rectangle',
                icon: 'l-rectangle',
                id: 2,
                data: {
                    text: '圆角矩形',
                    width: 200,
                    height: 50,
                    tag: 'mind',
                    borderRadius: 0.1,
                    name: 'rectangle',
                },
            },
            {
                name: 'circle',
                icon: 'l-circle',
                id: 3,
                data: {
                    text: '圆',
                    width: 100,
                    height: 100,
                    name: 'circle',
                },
            },
            {
                name: 'triangle',
                icon: 'l-triangle',
                id: 4,
                data: {
                    text: '三角形',
                    width: 100,
                    height: 100,
                    name: 'triangle',
                },
            },
            {
                name: 'diamond',
                icon: 'l-diamond',
                id: 5,
                data: {
                    text: '菱形',
                    width: 100,
                    height: 100,
                    name: 'diamond',
                },
            },
            {
                name: 'pentagon',
                icon: 'l-pentagon',
                id: 6,
                data: {
                    text: '五边形',
                    width: 100,
                    height: 100,
                    name: 'pentagon',
                },
            },
            {
                name: 'hexagon',
                icon: 'l-hexagon',
                id: 7,
                data: {
                    text: '六边形',
                    width: 100,
                    height: 100,
                    name: 'hexagon',
                },
            },
            {
                name: 'pentagram',
                icon: 'l-pentagram',
                id: 8,
                data: {
                    text: '五角星',
                    width: 100,
                    height: 100,
                    name: 'pentagram',
                },
            },
            {
                name: 'leftArrow',
                icon: 'l-arrow-left',
                id: 9,
                data: {
                    text: '左箭头',
                    width: 120,
                    height: 60,
                    name: 'leftArrow',
                },
            },
            {
                name: 'rightArrow',
                icon: 'l-arrow-right',
                id: 10,
                data: {
                    text: '右箭头',
                    width: 120,
                    height: 60,
                    name: 'rightArrow',
                },
            },
            {
                name: 'twowayArrow',
                icon: 'l-twoway-arrow',
                id: 11,
                data: {
                    text: '双向箭头',
                    width: 150,
                    height: 60,
                    name: 'twowayArrow',
                },
            },
            {
                name: 'line',
                icon: 'l-line',
                id: 12,
                data: {
                    anchors: [
                        {
                            x: 0,
                            y: 0.5,
                            id: '0',
                        },
                        {
                            x: 1,
                            y: 0.5,
                            id: '10',
                        },
                    ],
                    text: '直线',
                    width: 100,
                    height: 100,
                    name: 'line',
                    lineHeight: 1.5,
                    textTop: -30,
                    fontColor: "#222222",
                },
            },
            {
                name: 'cloud',
                icon: 'l-cloud',
                id: 13,
                data: {
                    text: '云',
                    width: 100,
                    height: 100,
                    name: 'cloud',
                },
            },
            {
                name: 'message',
                icon: 'l-msg',
                id: 14,
                data: {
                    textTop: -0.1,
                    text: '消息框',
                    width: 100,
                    height: 100,
                    name: 'message',
                },
            },
            {
                name: 'file',
                icon: 'l-file',
                id: 15,
                data: {
                    text: '文档',
                    width: 80,
                    height: 100,
                    name: 'file',
                },
            },
            {
                name: 'text',
                icon: 'l-text',
                id: 16,
                data: {
                    text: `meta2d`,
                    width: 160,
                    height: 30,
                    name: 'text',
                },
            },
            {
                name: 'image',
                icon: 'l-image',
                id: 17,
                data: {
                    text: '',
                    width: 100,
                    height: 100,
                    name: 'image',
                    image: 'https://assets.le5lecdn.com/2d/img/logo.png',
                    props: [
                        {
                            title: "图片地址",
                            type: "input",
                            prop: "image",
                            event: "change",
                        },
                    ]
                },
            },
            {
                name: 'cube',
                icon: 'l-cube',
                id: 18,
                data: {
                    width: 60,
                    height: 100,
                    name: 'cube',
                    z: 0.25,
                    form: [
                        {
                            key: 'z',
                            name: 'z',
                            type: 'number',
                            min: 0,
                            step: 0.1,
                            placeholder: '<= 1 即宽度的比例',
                        },
                        {
                            key: 'backgroundFront',
                            name: '前背景色',
                            type: 'color',
                        },
                        {
                            key: 'backgroundUp',
                            name: '顶背景色',
                            type: 'color',
                        },
                        {
                            key: 'backgroundRight',
                            name: '右背景色',
                            type: 'color',
                        },
                    ]
                },
            },
            {
                name: 'video',
                icon: 'l-pc',
                id: 20,
                data: {
                    width: 200,
                    height: 200,
                    externElement: true,
                    name: 'video',
                    video:
                        'https://video.699pic.com/videos/17/69/11/a_aa3jeKZ0D63g1556176911_10s.mp4',
                },
            },
            {
                name: 'icon',
                icon: 'ticon ticon-share',
                id: 22,
                data: {
                    width: 100,
                    height: 100,
                    name: 'image',
                    icon: '\ue620',
                    iconFamily: 'ticon',
                },
            },
        ],
    },
    {
        name: '图表控件',
        list: [
            {
                name: '仪表盘',
                icon: 'l-dashboard-chart',
                data: {
                    width: 300,
                    height: 300,
                    disableAnchor: true,
                    externElement: true,
                    name: 'echarts',
                    form: [
                        {
                            key: 'dataY',
                            name: '数据',
                            type: 'text',
                            readonly: true,
                            placeholder: '仅绑定变量',
                            multiple: true,
                        },
                        {
                            key: 'echarts',
                            name: 'echarts',
                            type: 'code',
                            language: 'json',
                            isNotString: true,
                        },
                        {
                            key: 'echarts',
                            key2: 'max',
                            type: 'number',
                            name: '最大数量',
                            placeholder: 'x',
                        },
                    ],
                    echarts: {
                        option: {
                            tooltip: {
                                formatter: '{a} <br/>{b} : {c}%',
                            },
                            series: [
                                {
                                    name: '业务指标',
                                    type: 'gauge',
                                    axisLine: {
                                        lineStyle: {
                                            width: 25,
                                            color: [
                                                [0.2, '#91c7ae'],
                                                [0.8, '#63869e'],
                                                [1, '#c23531']
                                            ]
                                        }
                                    },
                                    pointer: {
                                        itemStyle: {
                                            color: 'auto'
                                        }
                                    },
                                    axisTick: {
                                        distance: -25,
                                        length: 6,
                                        lineStyle: {
                                            color: '#fff',
                                            width: 2
                                        }
                                    },
                                    splitLine: {
                                        distance: -25,
                                        length: 25,
                                        lineStyle: {
                                            color: '#fff',
                                            width: 2
                                        }
                                    },
                                    axisLabel: {
                                        color: 'inherit',
                                        distance: 30,
                                        fontSize: 12
                                    },
                                    detail: {
                                        valueAnimation: true,
                                        formatter: '{value}%',
                                        color: 'inherit'
                                    },
                                    data: [{ value: 90, name: '数据' }],
                                },
                            ],
                        },
                        replaceMode: ReplaceMode.Replace,
                    },
                },
            },
        ],
    },
    {
        name: '自定义',
        list: [{
            name: 'jiedi',
            custom: 'icon-a-bianzu18',
            id: 3,
            data: {
                text: 'jiedi',
                width: 100,
                height: 100,
                name: 'jiedi',
            },
        }]
    }
]