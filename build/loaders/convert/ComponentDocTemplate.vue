<template>
    <div class="doc">
        <!--CONTENT_SLOT-->
    </div>
    
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
//<!--IMPORT_SLOT-->
export default defineComponent({
    components: {
        //<!--COMPONENTS_SLOT-->
    },
    setup() {

    },
})
</script>

<style scoped>
.doc {
    padding: 2px 22px 28px;
}
</style>