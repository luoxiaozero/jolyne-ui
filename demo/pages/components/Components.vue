<template>
    <PageContainer has-sider>
        <JoLayoutSider style="padding: 2px 0 4px;">
            <JoScrollbar scroll-style="remove">
                <TheSider :bordered="false" />
            </JoScrollbar>
        </JoLayoutSider>
        <JoLayout id="listenTo-doc">
            <router-view></router-view>
        </JoLayout>
    </PageContainer>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoLayout, JoLayoutSider, JoScrollbar } from "../../../src";
import PageContainer from "../../components/PageContainer.vue";
import TheSider from "./Menu.vue";
export default defineComponent({
    components: {
        PageContainer,
        TheSider,
        JoLayout,
        JoLayoutSider,
        JoScrollbar
    },
    setup() {

    },
})
</script>
<style scoped>
@media screen and (max-width: 1000px) {
    .jo-layout-sider {
        display: none;
    }
}
</style>