<template>
    <JoLayoutHeader class="nav" :box-shadow="shadow">
        <div class="nav-box">
            <router-link to="/" class="router-link--text logo">Jolyne UI</router-link>
            <router-link
                to="/components/menu"
                :class="{ 'router-link--text': true, 'router-link-active': isComponentsPage }"
            >组件</router-link>
            <router-link to="/theme" class="router-link--text">主题</router-link>
            <span style="display: inline-flex;">
                <JoAutoComplete
                    placeholder="搜索组件"
                    clear-after-select
                    blur-after-select
                    v-model:value="searchValueRef"
                    :options="options"
                    :onSelect="searchSelect"
                />
            </span>
        </div>

        <div>
            <JoButton text @click="jumpGitee" style="margin-right: 18px;">Gitee</JoButton>
            <JoButton text @click="changeTheme" style="margin-right: 18px;">{{ themeNameRef }}</JoButton>
            <span title="版本">{{ version }}</span>
        </div>
    </JoLayoutHeader>
</template>

<script lang='ts'>
import { defineComponent, watch, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { JoLayoutHeader, JoButton, JoAutoComplete } from "../../src";
import { router } from '../router';
import { changeTheme, useThemeName } from "../store";
import { menuItemOptions } from '../store/menuOptions';
import { version } from "../../package.json";
export default defineComponent({
    components: {
        JoLayoutHeader,
        JoButton,
        JoAutoComplete
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
        const route = useRoute();
        const searchValueRef = ref("");
        watch(route, (value) => {
            if (/^\/components/.test(value.path)) {
                isComponentsPage.value = true;
            } else {
                isComponentsPage.value = false;
            }
        })
        function searchSelect(value: string) {
            router.push(`/components/${value}`);
        }
        const searchOptionsRef = computed(() => {
            function match(pattern: string, string: any): any {
                if (!pattern.length) return true
                if (!string.length) return false
                if (pattern[0] === string[0]) return match(pattern.slice(1), string.slice(1))
                return match(pattern, string.slice(1))
            }

            function getLabel(item: { label: string, extra: string, key: string }) {
                if (item.label) {
                    return item.label + (item.extra ? ' ' + item.extra : '')
                }
                return item.key;
            }
            if (!searchValueRef.value) return []
            const replaceRegex = / |-/g
            return menuItemOptions
                .filter((item) => {
                    const pattern = searchValueRef.value
                        .toLowerCase()
                        .replace(replaceRegex, '')
                        .slice(0, 20)
                    const label = getLabel(item).toLowerCase().replace(replaceRegex, '')
                    return match(pattern, label)
                })
                .map((item) => ({
                    label: getLabel(item),
                    value: item.key
                }))
        })
        function jumpGitee() {
            window.open("https://gitee.com/luoxiaozero/jolyne-ui");
        }
        return {
            version,
            isComponentsPage,
            jumpGitee,
            changeTheme,
            searchSelect,
            themeNameRef,
            searchValueRef,
            options: searchOptionsRef
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