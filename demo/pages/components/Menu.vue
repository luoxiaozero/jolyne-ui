<template>
    <JoMenu :options="menuOptions" v-model:value="keyRef" />
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { JoMenu } from "../../../src";
import { router } from '../../router';
import { menuOptions } from '../../store/menuOptions';

export default defineComponent({
    components: {
        JoMenu,
    },
    setup() {
        const route = useRoute();
        const path = route.path;
        const name = path.match(/components\/(.*?)$/)?.[1];
        const keyRef = ref(name || "");
        watch(keyRef, (value) => {
            router.push(`/components/${value}`);
        })
        return {
            keyRef,
            menuOptions
        }
    },
})
</script>