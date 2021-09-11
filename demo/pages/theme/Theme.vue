<template>
    <PageContainer>
        <div style="margin: 16px 20px;" class="color-box">
            <JoCard title="字体">
                <div>
                    字体
                    <code>font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;</code>
                </div>
                <table style="width: 100%;" class="font-box">
                    <thead>
                        <tr>
                            <td>层级</td>
                            <td>字体大小</td>
                            <td>举例</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="font-size: 12px;">
                            <td>辅助文字</td>
                            <td>12px Extra Small</td>
                            <td>这是个字体大小演示</td>
                        </tr>
                        <tr style="font-size: 13px;">
                            <td>正文（小）</td>
                            <td>13px Small</td>
                            <td>这是个字体大小演示</td>
                        </tr>
                        <tr style="font-size: 14px;">
                            <td>正文</td>
                            <td>14px Base</td>
                            <td>这是个字体大小演示</td>
                        </tr>
                        <tr style="font-size: 16px;">
                            <td>小标题</td>
                            <td>16px Medium</td>
                            <td>这是个字体大小演示</td>
                        </tr>
                        <tr style="font-size: 18px;">
                            <td>标题</td>
                            <td>18px large</td>
                            <td>这是个字体大小演示</td>
                        </tr>
                        <tr style="font-size: 20px;">
                            <td>主标题</td>
                            <td>20px Extra large</td>
                            <td>这是个字体大小演示</td>
                        </tr>
                    </tbody>
                </table>
            </JoCard>
            <JoCard title="边框和圆角">
                <div class="border-box">
                    <div>
                        实线
                        <code>border-top: 1px solid #dcdfe6;</code>
                    </div>
                    <div class="border-box__line" style="border-top: 1px solid #dcdfe6;"></div>
                    <div>
                        虚线
                        <code>border-top: 1px dashed #dcdfe6;</code>
                    </div>
                    <div class="border-box__line" style="border-top: 1px dashed #dcdfe6;"></div>
                </div>
                <div class="angle-box">
                    <span style="border-radius: 0px;">无圆角 0px</span>
                    <span style="border-radius: 2px;">小圆角 2px</span>
                    <span style="border-radius: 4px;">大圆角 4px</span>
                    <span style="border-radius: 30px;">圆形圆角 30px</span>
                </div>
            </JoCard>
            <ContrastColor :colors="colors" title="主题色" />
            <ContrastColor :colors="auxiliaryColors" title="辅助色" />
            <ContrastColor :colors="neutralColors" title="中性色" />
            <ContrastColor :colors="chooseColors" title="待选色" />
        </div>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoCard } from "../../../src";
import PageContainer from "../../components/PageContainer.vue";
import ContrastColor from "./ContrastColor.vue";
export default defineComponent({
    components: {
        JoCard,
        PageContainer,
        ContrastColor
    },
    setup() {
        const neutralColors = [
            {
                name: "基础黑色",
                rgb: "#000000",
            },
            {
                name: "基础白色",
                rgb: "#FFFFFF",
                fontColor: "#000000",
                border: true,
            },
            {
                name: "主要文字",
                rgb: "#303133",
            },
            {
                name: "常规文字",
                rgb: "#606266",
            },
            {
                name: "次要文字",
                rgb: "#909399",
            },
            {
                name: "占位文字",
                rgb: "#C0C4CC",
            },
            {
                name: "一级边框",
                rgb: "#DCDFE6",
                fontColor: "#000000",
            },
            {
                name: "二级边框",
                rgb: "#E4E7ED",
                fontColor: "#000000",
            },
            {
                name: "三级边框",
                rgb: "#EBEEF5",
                fontColor: "#000000",
                border: true,
            },
            {
                name: "四级边框",
                rgb: "#F2F6FC",
                fontColor: "#000000",
                border: true,
            },
        ]
        const colors = [
            {
                name: "美蝶绿",
                rgb: "#12aa9c",
                children: [
                    {
                        name: "1",
                        rgb: "#12aa9c2c"
                    }
                ]
            },
            {
                name: "黛绿",
                rgb: "#426666",
            },
            {
                name: "3",
                rgb: "#509a80"
            },
        ]
        const auxiliaryColors = [
            {
                name: "Success",
                rgb: "#67C23A",
                children: [
                    {
                        name: "1",
                        rgb: "#e1f3d8"
                    },
                    {
                        name: "2",
                        rgb: "#f0f9eb"
                    }
                ]
            },
            {
                name: "Warning",
                rgb: "#E6A23C",
            },
            {
                name: "Danger",
                rgb: "#F56C6C",
            },
            {
                name: "Info",
                rgb: "#909399",
            },
            {
                name: "艾绿",
                rgb: "#a4e2c6",
            },
        ]
        const chooseColors = [
            {
                name: "苍绿",
                rgb: "#223e36",
            },
            {
                name: "5",
                rgb: "#badde9"
            },
            {
                name: "1",
                rgb: "#3d6756"
            },
            {
                name: "2",
                rgb: "#4f7764"
            },
        ]
        return {
            colors,
            neutralColors,
            auxiliaryColors,
            chooseColors
        }
    },
})
</script>

<style scoped>
.color-box > div {
    margin-bottom: 20px;
}
.angle-box > span {
    display: inline-block;
    width: 140px;
    height: 50px;
    margin-right: 32px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #dcdfe6;
}
.border-box {
    margin-bottom: 12px;
}
.border-box__line {
    display: inline-block;
    width: 100%;
    height: 5px;
}
.font-box td {
    height: 40px;
    border-bottom: 1px solid #dcdfe6;
}
</style>