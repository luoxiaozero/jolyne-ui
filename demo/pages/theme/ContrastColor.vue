<template>
    <div style="display: flex; ">
        <JoConfigProvider :theme="themeRef">
            <JoCard style="margin-right: 6px;flex: 1;">
                <template #header>
                    <div style="display: flex; justify-content: space-between;">
                        <span>{{ title }}</span>
                        <JoSwitch v-model:value="themeFlagRef" />
                    </div>
                </template>
                <ColorBlock v-for="c of colors" :colorData="c"/>
            </JoCard>
        </JoConfigProvider>
        <JoConfigProvider :theme="contrastThemeRef">
            <JoCard style="flex: 1; ">
                <template #header>
                    <div style="display: flex; justify-content: space-between;">
                        <span>深色{{ title }}</span>
                        <JoSwitch v-model:value="contrastThemeFlagRef" />
                    </div>
                </template>
                <ColorBlock v-for="c of colors" :colorData="c"/>
            </JoCard>
        </JoConfigProvider>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, computed } from 'vue';
import { JoCard, JoConfigProvider, darkTheme, JoSwitch } from "../../../src";
import ColorBlock, { ColorData } from "./ColorBlock.vue";

export default defineComponent({
    components: {
        JoCard,
        JoConfigProvider,
        JoSwitch,
        ColorBlock,
    },
    props: {
        title: String,
        colors: Array as PropType<ColorData[]>,
    },
    setup() {
        const themeFlagRef = ref(true);
        const themeRef = computed(() => {
            return themeFlagRef.value ? undefined : darkTheme;
        })
        const contrastThemeFlagRef = ref(false);
        const contrastThemeRef = computed(() => {
            return contrastThemeFlagRef.value ? undefined : darkTheme;
        })
        return {
            themeRef,
            contrastThemeRef,
            themeFlagRef,
            contrastThemeFlagRef,
        }
    },
})
</script>

<style scoped>
</style>