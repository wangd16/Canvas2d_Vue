<template>
    <div class="icons">
        <div class="icon_search">
            <el-input v-model="searchElements"
                size="small"
                placeholder="搜索图元"
                :prefix-icon="Search" />
        </div>
        <div class="icon_list">
            <el-collapse v-model="activeNames">
                <template v-for="(icons, index) in defaultIcons">
                    <el-collapse-item :title="icons.name"
                        :name="index.toString()">
                        <div class="icon_container">
                            <div class="icon_item"
                                v-for="(item, index) in icons.list"
                                draggable="true"
                                @dragstart="dragPen(item.data, $event)"
                                :index="index"
                                :title="item.name">
                                <svg v-if="item.icon"
                                    class="l-icon"
                                    aria-hidden="true">
                                    <use :xlink:href="'#' + item.icon"></use>
                                </svg>
                                <img v-else-if="item.image"
                                    :src="item.image" />
                                <div v-else-if="item.svg"
                                    v-html="item.svg"></div>
                                <i v-else-if="item.custom"
                                    class="">
                                </i>
                            </div>
                        </div>
                    </el-collapse-item>
                </template>
            </el-collapse>
        </div>
        <div class="icon_manage">
            <el-button> 管理图元 </el-button>
            <i class="icon-a-bianzu18 iconfont
                ng-star-inserted" />
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { defaultIcons } from "@/utils/icons.js";
import { Search } from "@element-plus/icons-vue";

const activeNames = ref(1);
const searchElements = ref("");

function dragPen (data, e) {
    const json = JSON.stringify(data);
    e.dataTransfer.setData("meta2d", json);
}
</script>

<style lang="scss" scoped>
.icons {
    width: 245px;
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;

    .icon_search {
        max-height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .el-input {
            padding: 8px;
        }
    }

    .icon_list {
        padding: 5px 10px;
        overflow: auto;
        flex: 1;

        .icon_container {
            display: flex;
            justify-content: flex-start;
            overflow: auto;
            flex-wrap: wrap;
            align-content: center;
        }

        .icon_item {
            padding: 5px;
            cursor: pointer;
        }

        img {
            max-width: 25px;
            max-height: 25px;
            margin: 4px;
        }

        :deep(button:focus) {
            outline: none;
        }
    }

    .icon_manage {
        border-top: 1px solid #eee;
        display: flex;
        padding: 16px 0;
        justify-content: center;
        align-items: center;
    }

    :deep(.el-collapse-item__header) {
        border-bottom: none;
    }
}

.icon_search_container {
    padding: 0 10px;
    max-height: 200px;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
}

.icon_search_container::-webkit-scrollbar,
.icon_list::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.icon_search_container::-webkit-scrollbar-thumb,
.icon_list::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    height: 20px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #4e4e4e;
}

.icon_search_container::-webkit-scrollbar-track,
.icon_list::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ffffff;
}

.icon_search_container::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}

.icon_search_container::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    height: 20px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #4e4e4e;
}

.icon_search_container::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ffffff;
}
</style>