import { h, defineComponent, InjectionKey, PropType, provide, ref, Ref, watch } from "vue";
import { Theme, lightTheme } from "../../themes";

export interface ConfigProviderInjection {
    theme: Ref<Theme>,
    hljs: any
}

export const configProviderInjectionKey: InjectionKey<ConfigProviderInjection> =
  Symbol('configProviderInjection');


export default defineComponent({
    name: "ConfigProvider",
    props: {
        theme: Object as PropType<Theme>,
        hljs: Object,
    },
    setup(props) {
        const mergeTheme = ref(Object.assign({}, lightTheme, props.theme))
        provide(configProviderInjectionKey, {
            theme: mergeTheme,
            hljs: props.hljs,
        });
        watch(() => props.theme, () => {
            mergeTheme.value = Object.assign({}, lightTheme, props.theme);
        })
    },
    render() {
        return this.$slots.default?.();
    }
})