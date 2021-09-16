<template>
    <JoLayoutHeader class="nav" :shadow="shadow">
        <div class="nav-box">
            <router-link to="/" class="router-link--text logo">Jolyne UI</router-link>
            <router-link to="/components/menu" :class="{'router-link--text': true, 'router-link-active': isComponentsPage}">组件</router-link>
            <router-link to="/theme" class="router-link--text">主题</router-link>
        </div>
        <div>
            <JoButton text @click="changeTheme">{{ themeNameRef }}</JoButton>
        </div>
    </JoLayoutHeader>
</template>

<script lang='ts'>
import { defineComponent, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { JoLayoutHeader, JoButton } from "../../src";
import { changeTheme, useThemeName } from "../store";
export default defineComponent({
    components: {
        JoLayoutHeader,
        JoButton
    },
    props: {
        shadow: {
            type: Boolean,
            default: true,
        }
    },
    setup() {
        const themeNameRef = useThemeName();
        const isComponentsPage = ref(false);
        const route= useRoute();
        watch(route, (value) => {
            if (/^\/components/.test(value.path)) {
                isComponentsPage.value = true;
            } else {
                isComponentsPage.value = false;
            }
        })
        return {
            isComponentsPage,
            changeTheme,
            themeNameRef
        }
    },
})
</script>

<style scoped>
.logo {
    font-weight: bold;
    color: #12aa9c !important;
}
.nav {
    position: relative;
    z-index: 1000;
    display: flex;
    height: 54px;
    padding: 0 30px;
    line-height: 54px;
    box-sizing: border-box;
    justify-content: space-between;
}
.router-link--text {
    display: inline-block;
    padding: 0 10px;
    color: inherit;
    text-decoration: none;
}
.router-link--text:hover {
    color: #12aa9c;
}
.nav-box > a {
    margin-right: 18px;
}
.router-link-active {
    position: relative;
    color: #12aa9c;
}
.router-link-active:not(.logo)::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: #12aa9c;
}
</style>