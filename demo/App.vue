<script lang="ts">
import { defineComponent } from 'vue';
import { JoConfigProvider, JoGlobalStyle } from "../src";
import { themeRef } from './store';
export default defineComponent({
  name: "App",
  components: {
    JoConfigProvider,
    JoGlobalStyle
  },
  setup() {
    return {
      themeRef
    }
  }
})
</script>

<template>
  <JoConfigProvider :theme="themeRef">
    <router-view></router-view>
    <JoGlobalStyle/>
  </JoConfigProvider>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  margin: 0;
  padding: 0;
}
</style>
