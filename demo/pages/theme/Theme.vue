<template>
    <PageContainer>
        <div style="width: 840px; margin: 0 auto 30px;">
            <div class="anchor">
                <JoAnchor listenTo="#page-layout > .jo-scrollbar">
                    <JoAnchorLink title="字体" href="#字体"></JoAnchorLink>
                    <JoAnchorLink title="边框和圆角" href="#边框和圆角"></JoAnchorLink>
                    <JoAnchorLink title="主题色" href="#主题色"></JoAnchorLink>
                    <JoAnchorLink title="辅助色" href="#辅助色"></JoAnchorLink>
                    <JoAnchorLink title="中性色" href="#中性色"></JoAnchorLink>
                    <JoAnchorLink title="待选色" href="#待选色"></JoAnchorLink>
                </JoAnchor>
            </div>

            <h2 id="字体">字体</h2>
            <p>
                <strong>字体:</strong>
                <code>font-family:-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;</code>
            </p>

            <JoTable class="font-box">
                <thead>
                    <tr>
                        <th>层级</th>
                        <th>字体大小</th>
                        <th>举例</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="font-size: 12px;">
                        <td>辅助文字</td>
                        <td>12px Tiny</td>
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
                        <td>18px Large</td>
                        <td>这是个字体大小演示</td>
                    </tr>
                    <tr style="font-size: 20px;">
                        <td>主标题</td>
                        <td>20px Huge</td>
                        <td>这是个字体大小演示</td>
                    </tr>
                </tbody>
            </JoTable>
            <h2 id="边框和圆角">边框和圆角</h2>

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

            <h2 id="主题色">主题色</h2>
            <ColorBlock v-for="c of colors" :colorData="c" />
            <h2 id="辅助色">辅助色</h2>
            <ColorBlock v-for="c of auxiliaryColors" :colorData="c" />
            <h2 id="中性色">中性色</h2>
            <ColorBlock v-for="c of neutralColors" :colorData="c" />
            <h2 id="待选色">待选色</h2>
            <ColorBlock v-for="c of chooseColors" :colorData="c" />
        </div>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoCard, JoTable, JoAnchor, JoAnchorLink } from "../../../src";
import PageContainer from "../../components/PageContainer.vue";
import ColorBlock from "./ColorBlock.vue";
export default defineComponent({
    components: {
        JoCard,
        PageContainer,
        JoTable,
        ColorBlock,
        JoAnchor,
        JoAnchorLink
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
.anchor {
    position: sticky;
    top: 26px;
    width: 200px;
    float: right;
    transform: translateX(260px);
}
</style>