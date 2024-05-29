<template>
    <el-collapse>
        <el-collapse-item v-for="item in props.formList"
            :class="item.className"
            :title="item.title">
            <el-form className="grid-container"
                label-position="top"
                @submit="(e) => e.preventDefault()">
                <el-form-item class="grid-item"
                    v-for="i in item.children"
                    :label="i.title">
                    <!-- 输入框-->
                    <el-input v-model="i.bindProp[i.prop]"
                        :placeholder="i.option?.placeholder"
                        v-if="i.type === 'input'"
                        @[i.event]="i.func"
                        :type="i.option?.type || 'text'" />
                    <!-- 文件框-->
                    <el-button v-else-if="i.type === 'file'"><label :for="i.for || i.title">
                            <input :id="i.for || i.title"
                                style="display: none"
                                type="file"
                                :accept="i.option?.accept || '*/*'"
                                @[i.event]="i.func">
                            选择文件
                        </label>
                    </el-button>
                    <!-- 数字框-->
                    <el-input-number :placeholder="i.option?.placeholder || '请输入'"
                        :step="i.option?.step || 1"
                        v-model="i.bindProp[i.prop]"
                        :min="i.option?.min ?? -Infinity"
                        :max="i.option?.max ?? Infinity"
                        @[i.event]="i.func"
                        v-else-if="i.type === 'number'" />
                    <!-- 选择框-->
                    <el-select v-model="i.bindProp[i.prop]"
                        :placeholder="i.option.placeholder"
                        v-else-if="i.type === 'select'"
                        @[i.event]="i.func">
                        <el-option v-for="item in i.option.list"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            :disabled="item.disabled">
                            <div v-if="item.template"
                                class="select_template"
                                v-html="item.template"></div>
                        </el-option>
                    </el-select>
                    <!-- 取色器-->
                    <el-input type="color"
                        v-model="i.bindProp[i.prop]"
                        show-alpha
                        v-else-if="i.type === 'color'"
                        @[i.event]="i.func"></el-input>
                    <!-- 开关-->
                    <el-switch v-model="i.bindProp[i.prop]"
                        v-else-if="i.type === 'switch'"
                        @[i.event]="i.func" />

                    <!-- 按钮-->
                    <el-button :type="i.option.type"
                        v-else-if="i.type === 'button'"
                        @[i.event]="i.func"
                        :style="i.middle ? 'width:100%;margin: auto;' : ''">{{ i.option.title }}</el-button>

                </el-form-item>
            </el-form>
            <el-text v-show="item.className === 'collapse-position-size'">
                内边距：输入数字表示像素；输入%表示百分比
            </el-text>
        </el-collapse-item>
    </el-collapse>
</template>

<script setup>
const props = defineProps(['formList'])
</script>

<style lang="scss" scoped>
.el-collapse {
    border-bottom: none;
}

.collapse-position-size,
.collapse-style,
.collapse-characters,
.collapse-animation {
    padding: 12px 0;
    border-bottom: 1px solid #ebeef5;

    .el-form-item {
        display: initial;
        margin: 0 0;

        :deep(.el-input-number) {
            width: 100%;

            .el-input-number__decrease,
            .el-input-number__increase {
                display: none;
            }

            .el-input__wrapper {
                padding: 0 10px;
            }
        }
    }
}

.collapse-position-size {
    .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        /* 创建两列，每列宽度相同 */
        grid-template-rows: repeat(5, 1fr);
        /* 创建五行，每行高度相同 */
        gap: 5px;
        /* 设置网格项之间的间隔 */
    }


}

.collapse-style {}

:deep(.el-collapse-item) {
    &:last-child {
        border-bottom: none;
    }
}

:deep(.el-collapse-item__header) {
    height: 16px;
    font-weight: 1000;
    border-bottom: none;
    outline: 0 !important;
    margin-bottom: 5px;
}

:deep(.el-collapse-item__wrap) {
    border-bottom: none;
}

:deep(.el-collapse-item__content) {
    padding-bottom: 0px;

    .el-text {
        color: #c4c9cd;
        font-size: 12px;
    }
}

:deep(.el-form-item__label) {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
}
</style>