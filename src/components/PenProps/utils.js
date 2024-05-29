// ! 批量处理后的图标
export function optimizedIcons (data) {
    return data.map((it) => {
        return {
            label: it.name,
            template: `<svg xmlns="http://www.w3.org/2000/svg" class="l-icon" aria-hidden='true' :class="[${it.icon}]">
                <use xlink:href ="#${it.icon}"></use>
                </svg>`,
            ...it,
        }
    })
}
