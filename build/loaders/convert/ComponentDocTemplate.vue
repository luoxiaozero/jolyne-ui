<template>
    <div class="doc-anchor">
        <jo-anchor listenTo="#page-layout > .jo-scrollbar">
            <!--ANCHOR_SLOT-->
        </jo-anchor>
    </div>
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
    padding: 6px 28px 32px;
    margin-right: 180px;
}
.doc-anchor {
    position: sticky;
    top: 20px;
    right: 10px;
    width: 170px;
    float: right;
}
@media screen and (max-width: 1000px) {
    .doc-anchor {
        display: none;
    }
    .doc {
        margin-right: 0;
    }
}
</style>