<template>
    <PageContainer>
        <JoCard title="主题色" style="margin: 20px 30px;">
            <span v-for="c of colors" class="theme-color">
                <div class="theme-color__name">{{ c.name }}</div>
                <div :style="{ backgroundColor: c.rgb }" class="theme-color__block"></div>
            </span>
        </JoCard>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoCard } from "../../../src";
import PageContainer from "../../components/PageContainer.vue";
export default defineComponent({
    components: {
        JoCard,
        PageContainer
    },
    setup() {
        /**
         * #3d6756 ，#4f7764 ，#509a80

#a7d4c3，#badde9，#bbd69d
         */
        const colors = [
            {
                name: "美蝶绿",
                rgb: "#12aa9c",
            },
            {
                name: "黛绿",
                rgb: "#426666",
            },
            {
                name: "艾绿",
                rgb: "#a4e2c6",
            },
            {
                name: "苍绿",
                rgb: "#223e36",
            },
            {
                name: "丁香色",
                rgb: "#cca4e3",
            },
            {
                name: "1",
                rgb: "#3d6756"
            },
            {
                name: "2",
                rgb: "#4f7764"
            },
            {
                name: "3",
                rgb: "#509a80"
            },
            {
                name: "4",
                rgb: "#a7d4c3"
            },
            {
                name: "5",
                rgb: "#badde9"
            },
            {
                name: "6",
                rgb: "#bbd69d"
            }
        ]
        return {
            colors,
        }
    },
})
</script>

<style scoped>
.theme-color {
    display: inline-block;
    width: 200px;
    margin-bottom: 20px;
    margin-left: 20px;
    padding: 8px 12px;
    border: 1px solid #eee;
    border-radius: 5px;
}
.theme-color__name {
    text-align: center;
    margin-bottom: 10px;
}
.theme-color__block {
    display: inline-block;
    width: 100%;
    height: 61px;
}
</style>