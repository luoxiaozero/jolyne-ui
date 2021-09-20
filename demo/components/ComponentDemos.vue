<template>
    <div class="demos">
        <slot></slot>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    name: "ComponentDemos",
    props: {

    },
    setup() {
        return {}
    },
})
</script>

<style scoped>
.demos {
    display: grid;
    gap: 16px;
    grid-template-columns: minmax(0px, 1fr) minmax(0px, 1fr);
    align-items: flex-start;
}
@media screen and (max-width: 1200px) {
    .demos {
        grid-template-columns: 100%;
    }
}
</style>