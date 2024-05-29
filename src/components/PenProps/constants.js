// 线条样式
export const LINE_STYLE = [
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

// 连线类型
export const LINE_TYPE = [
    {
        label: "曲线",
        icon: "l-curve2",
        action: "line",
        value: "curve",
    },
    {
        label: "线段",
        icon: "l-polyline",
        action: "line",
        value: "polyline",
    },
    {
        label: "直线",
        icon: "l-line",
        action: "line",
        value: "line",
    },
    {
        label: "脑图曲线",
        icon: "l-mind",
        action: "line",
        value: "mind",
    }]

// 起点下拉选项值
export const startIcon = [{
    name: "line",
    icon: "l-line",
    action: "start",
    value: "",
},
{
    name: "triangle",
    icon: "l-from-triangle",
    action: "start",
    value: "triangle",
},
{
    name: "diamond",
    icon: "l-from-diamond",
    action: "start",
    value: "diamond",
},
{
    name: "circle",
    icon: "l-from-circle",
    action: "start",
    value: "circle",
},
{
    name: "lineDown",
    icon: "l-from-lineDown",
    action: "start",
    value: "lineDown",
},
{
    name: "lineUp",
    icon: "l-from-lineUp",
    action: "start",
    value: "lineUp",
},
{
    name: "triangleSolid",
    icon: "l-from-triangleSolid",
    action: "start",
    value: "triangleSolid",
},
{
    name: "diamondSolid",
    icon: "l-from-diamondSolid",
    action: "start",
    value: "diamondSolid",
},
{
    name: "circleSolid",
    icon: "l-from-circleSolid",
    action: "start",
    value: "circleSolid",
},
{
    name: "lineArrow",
    icon: "l-from-line",
    action: "start",
    value: "line",
}]

// 终点下拉选项值
export const endIcon = [
    {
        name: "line",
        icon: "l-line",
        action: "end",
        value: "",
    },
    {
        name: "triangle",
        icon: "l-to-triangle",
        action: "end",
        value: "triangle",
    },
    {
        name: "diamond",
        icon: "l-to-diamond",
        action: "end",
        value: "diamond",
    },
    {
        name: "circle",
        icon: "l-to-circle",
        action: "end",
        value: "circle",
    },
    {
        name: "lineDown",
        icon: "l-to-lineDown",
        action: "end",
        value: "lineDown",
    },
    {
        name: "lineUp",
        icon: "l-to-lineUp",
        action: "end",
        value: "lineUp",
    },
    {
        name: "triangleSolid",
        icon: "l-to-triangleSolid",
        action: "end",
        value: "triangleSolid",
    },
    {
        name: "diamondSolid",
        icon: "l-to-diamondSolid",
        action: "end",
        value: "diamondSolid",
    },
    {
        name: "circleSolid",
        icon: "l-to-circleSolid",
        action: "end",
        value: "circleSolid",
    },
    {
        name: "lineArrow",
        icon: "l-to-line",
        action: "end",
        value: "line",
    }
]