<template>
    <span
        :class="['theme-color', { 'theme-color--border': colorData.border }]"
        :style="{ backgroundColor: colorData.rgb, color: colorData.fontColor }"
    >
        <div class="theme-color__name">{{ colorData.name }}</div>
        <div class="theme-color__rgb">{{ colorData.rgb }}</div>
        <div class="theme-color__children-box" v-if="colorData.children">
            <span v-for="c of colorData.children" :style="{ backgroundColor: c.rgb }"></span>
        </div>
    </span>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
export interface ColorData {
    name: string;
    rgb: string;
    fontColor?: string;
    border?: boolean;
    children?: ColorData[]
}
export default defineComponent({
    props: {
        colorData: { type: Object as PropType<ColorData>, required: true }
    },
})
</script>

<style scoped>
.theme-color {
    position: relative;
    display: inline-block;
    width: 180px;
    height: 70px;
    margin-bottom: 20px;
    margin-left: 12px;
    padding: 10px 16px;
    border-radius: 4px;
    color: white;
}
.theme-color--border {
    border: 1px solid #eee;
}
.theme-color__name {
    margin-bottom: 4px;
}
.theme-color__rgb {
    font-size: 0.9em;
}
.theme-color__children-box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    
}
.theme-color__children-box span {
    display: inline-block;
    height: 26px;
    flex: 1;
}
.theme-color__children-box span:first-child {
    border-bottom-left-radius: 4px;
}
.theme-color__children-box span:last-child {
    border-bottom-right-radius: 4px;
}
</style>