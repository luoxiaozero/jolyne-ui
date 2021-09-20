<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { JoConfigProvider, JoGlobalStyle, JoLoadingBarProvider, useLoadingBar, JoMessageProvider } from "../src";
import { themeRef, loadingBarApiRef } from './store';
import hljs from "./util/hljs";
export default defineComponent({
  name: "App",
  components: {
    JoConfigProvider,
    JoGlobalStyle,
    JoLoadingBarProvider,
    JoMessageProvider,
  },
  setup() {
    const loadingBarProviderRef = ref<any>(null);
    onMounted(() => {
      loadingBarApiRef.value = loadingBarProviderRef.value.loadingBarRef;
    })
    return {
      themeRef,
      hljs,
      loadingBarProviderRef
    }
  }
})
</script>

<template>
  <JoConfigProvider :theme="themeRef" :hljs="hljs">
    <JoLoadingBarProvider ref="loadingBarProviderRef">
      <JoMessageProvider>
        <router-view></router-view>
      </JoMessageProvider>
    </JoLoadingBarProvider>
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
