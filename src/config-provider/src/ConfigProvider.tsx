import { h, defineComponent, InjectionKey, PropType, provide, ref, Ref, watch } from "vue";
import { Theme, lightTheme } from "../../themes";
import { ExtractPublicPropTypes } from "../../util/extract-public-props";

export interface ConfigProviderInjection {
    theme: Ref<Theme>,
    hljs: any
}

export const configProviderInjectionKey: InjectionKey<ConfigProviderInjection> =
  Symbol('configProviderInjection');

const configProviderProps = {
    theme: Object as PropType<Theme>,
    hljs: Object,
}
export type ConfigProviderProps = ExtractPublicPropTypes<typeof configProviderProps>

export default defineComponent({
    name: "ConfigProvider",
    props: configProviderProps,
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