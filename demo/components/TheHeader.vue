<template>
    <JoLayoutHeader class="nav" bordered>
        <div class="nav-box">
            <router-link to="/" class="router-link--text">Jolyne UI</router-link>
            <router-link to="/components/menu" class="router-link--text">组件</router-link>
            <router-link to="/theme" class="router-link--text">主题</router-link>
        </div>
        <div>
            <JoButton text @click="changeTheme">{{ themeNameRef }}</JoButton>
        </div>
    </JoLayoutHeader>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { JoLayoutHeader, JoButton } from "../../src";
import { changeTheme, useThemeName } from "../store";
export default defineComponent({
    components: {
        JoLayoutHeader,
        JoButton
    },
    setup() {
        const themeNameRef = useThemeName();
        return {
            changeTheme,
            themeNameRef
        }
    },
})
</script>

<style scoped>
.nav {
    display: flex;
    height: 50px;
    padding: 0 20px;
    line-height: 50px;
    box-sizing: border-box;
    justify-content: space-between;
}
.router-link--text {
    color: inherit;
    text-decoration: none;
}
.router-link--text:hover {
    color: #12aa9c;
}
.nav-box > a {
    margin-right: 16px;
}
</style>