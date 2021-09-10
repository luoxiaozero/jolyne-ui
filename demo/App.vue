<script lang="ts">
import { defineComponent } from 'vue';
import { JoConfigProvider, JoGlobalStyle } from "../src";
import { themeRef } from './store';
import hljs from "./util/hljs";
export default defineComponent({
  name: "App",
  components: {
    JoConfigProvider,
    JoGlobalStyle
  },
  setup() {
    return {
      themeRef,
      hljs
    }
  }
})
</script>

<template>
  <JoConfigProvider :theme="themeRef" :hljs="hljs">
    <router-view></router-view>
    <JoGlobalStyle />
  </JoConfigProvider>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>
