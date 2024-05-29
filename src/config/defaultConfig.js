import { isShowChild } from "@meta2d/core";

//defaultConfig.js
export const menu = {
    left: [
        {
            key: "file",
            name: "文件",
            icon: "",
            children: [
                {
                    name: "新建文件",
                    action: "newFile"
                },
                {
                    name: "打开文件",
                    action: "openFile"
                },
                {
                    name: "导入文件",
                    action: "loadFile"
                }
            ]
        },
        {
            key: "magnifier",
            name: "放大镜",
            icon: "",
            action: "openMagnifier"
        },
        {
            key: "map",
            name: "缩略图",
            icon: "",
            action: "openMap"
        },
        {
            key: "pen",
            name: "钢笔",
            icon: "",
            action: "usePen"
        },
        {
            key: "pencil",
            name: "铅笔",
            icon: "",
            action: "usePencil"
        }
    ],
    right: [
        {
            key: 'undo',
            name: '撤销',
            icon: '',
            action: 'undo'
        },
        {
            key: 'redo',
            name: '重做',
            icon: '',
            action: 'redo'
        },
        {
            key: 'grid',
            name: '网格',
            icon: '',
            action: 'grid'
        },
        {
            key: 'rule',
            name: '标尺',
            icon: '',
            action: 'rule'
        },
        {
            key: 'exportAs',
            name: '导出为',
            icon: '',
            children:
                [
                    { name: 'svg', value: 'svg', action: 'exportAs' },
                    { name: 'png', value: 'png', action: 'exportAs' },
                    { name: 'text', value: 'text', action: 'exportAs' }
                ]
        },
        {
            key: 'save',
            name: '保存',
            icon: '',
            action: 'save'
        }
    ]
}

// 分发执行事件函数  
export function dispatchFunc (act, val, ...args) {
    // doSomething before  
    menuFunc[act](val)
}

const menuFunc = {
    newFile () {
        meta2d.open()
    },
    openFile () { },
    loadFile () { },
    openMagnifier () {
        if (window.meta2d.canvas.magnifierCanvas.magnifier) {
            window.meta2d.hideMagnifier();
        } else {
            window.meta2d.showMagnifier();
        }
    },
    openMap () {
        if (window.meta2d.map?.isShow) {
            window.meta2d.hideMap();
        } else {
            window.meta2d.showMap();
        }
    },
    usePen () { },
    usePencil () { },
    undo () {
        window.meta2d.undo();
    },
    redo () {
        window.meta2d.redo()
    },
    grid () {
        if (window.meta2d.store.data.grid) {
            window.meta2d.setGrid({
                grid: false
            })
        } else {
            window.meta2d.setGrid({
                grid: true
            })
        }
        window.meta2d.render();
    },
    rule () {
        if (window.meta2d.store.data.rule) {
            window.meta2d.setRule({
                rule: false
            })
        } else {
            window.meta2d.setRule({
                rule: true
            })
        }
        window.meta2d.render();
    },
    exportAs (value) {
        if (value === 'png') {
            window.meta2d.downloadPng()
        } else if (value === 'svg') {
            downloadSvg()
        } else if (value === 'text') {
            downloadText()
        }
    },
    save () {
        const jsonData = window.meta2d.data();//获取数据
        console.log('🚀WYD-dev 🚝 save 🚝 jsonData:', jsonData);
    }
}

function downloadSvg () {
    const rect = meta2d.getRect();
    rect.x -= 10;
    rect.y -= 10;
    const ctx = new C2S(rect.width + 20, rect.height + 20);
    ctx.textBaseline = 'middle';
    for (const pen of meta2d.store.data.pens) {
        if (pen.visible == false || !isShowChild(pen, meta2d.store)) {
            continue;
        }
        meta2d.renderPenRaw(ctx, pen, rect);
    }

    let mySerializedSVG = ctx.getSerializedSvg();
    if (meta2d.store.data.background) {
        mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
        mySerializedSVG = mySerializedSVG.replace(
            '{{bkRect}}',
            `<rect x="0" y="0" width="100%" height="100%" fill="${meta2d.store.data.background}"></rect>`
        );
    } else {
        mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
        mySerializedSVG = mySerializedSVG.replace('{{bkRect}}', '');
    }

    mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

    const urlObject = window.URL || window;
    const export_blob = new Blob([mySerializedSVG]);
    const url = urlObject.createObjectURL(export_blob);

    const a = document.createElement('a');
    a.setAttribute(
        'download',
        `${meta2d.store.data.name || 'le5le.meta2d'}.svg`
    );
    a.setAttribute('href', url);
    const evt = document.createEvent('MouseEvents');
    evt.initEvent('click', true, true);
    a.dispatchEvent(evt);
}

function downloadText () {
    const jsonData = window.meta2d.data();//获取数据
    const json = JSON.stringify(jsonData);//序列化json对象
    const file = new Blob([json, { type: 'application/json' }])//创建文件对象，指定类型为json
    const link = URL.createObjectURL(file)//创建url指向内存中的文件对象
    let a = document.createElement('a');//创建a标签用于下载操作
    a.setAttribute('download', meta2d.fileName || '未命名');//设置download属性，第二个参数为文件名
    a.setAttribute('href', link);//设置a标签的数据来源
    a.click()
}


export const mapProps = {
    fileName: "",
    color: "#eeeeee",
    penBackground: "",
    background: "",
    backGroundImage: "",
    rule: false,
    ruleColor: "",
    grid: false,
    gridColor: "",
    gridSize: 10,
    gridRotate: 90
}

export const appearanceProps = {
    x: 0,
    y: 0,
    text: "",
    color: "",
    width: 0,
    height: 0,
    lineWidth: 0,
    textLeft: 0,
    textTop: 0,
    borderRadius: 0,
    globalAlpha: 0,
    // ratio: false,
    rotate: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
    dash: 0,
    fontFamily: "",
    fontSize: "",
    textColor: "",
    lineHeight: 0,
    maxRows: 0,
    borderWidth: 0,
    lineName: '',
    ex: 0,
    ey: 0,
    fromArrow: '',
    toArrow: '',
    fromArrowSize: '',
    toArrowSize: ''
}
