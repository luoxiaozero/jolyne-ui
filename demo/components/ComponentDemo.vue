<template>
    <JoCard :title="title" segmented="footer" :id="demoFileName">
        <template #header-extra>
            <JoButton text @click="showCodeRef = !showCodeRef">
                <JoIcon>
                    <CodeSlashOutlineIcon />
                </JoIcon>
            </JoButton>
        </template>
        <slot name="content"></slot>
        <slot name="demo"></slot>
        <template #footer v-if="showCodeRef">
            <JoScrollbar>
                <JoCode :code="codeStr" lang="html"></JoCode>
            </JoScrollbar>
        </template>
    </JoCard>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { JoCard, JoCode, JoScrollbar, JoIcon, JoButton } from "../../src";
import { CodeSlashOutline as CodeSlashOutlineIcon } from "@vicons/ionicons5";

export default defineComponent({
    name: "ComponentDemo",
    components: {
        JoCard,
        JoCode,
        JoScrollbar,
        CodeSlashOutlineIcon,
        JoIcon,
        JoButton
    },
    props: {
        demoFileName: {
            type: String,
            required: true,
        },
        relativeUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        }
    },
    setup(props) {
        const codeStr = decodeURIComponent(props.code || "");
        const showCodeRef = ref(false);
        return {
            codeStr,
            showCodeRef,
        }
    },
})
</script>


<style scoped>
</style>
