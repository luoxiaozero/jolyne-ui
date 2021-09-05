import { defineComponent, inject, InjectionKey, PropType, provide, ref, Ref, watch } from "vue";
import { Theme, lightTheme } from "../themes";

export interface ConfigProviderInjection {
    theme: Ref<Theme>
}

export const configProviderInjectionKey: InjectionKey<ConfigProviderInjection> =
  Symbol('configProviderInjection');


export default defineComponent({
    name: "ConfigProvider",
    props: {
        theme: Object as PropType<Theme>,
    },
    setup(props) {
        const mergeTheme = ref(Object.assign({}, lightTheme, props.theme))
        provide(configProviderInjectionKey, {
            theme: mergeTheme
        });
        watch(() => props.theme, () => {
            mergeTheme.value = Object.assign({}, lightTheme, props.theme);
        })
    },
    render() {
        return this.$slots.default?.();
    }
})