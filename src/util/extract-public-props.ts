import { ExtractPropTypes } from "vue"

type RemoveReadonly<T> = {
    -readonly [key in keyof T]: T[key]
}

export type ExtractPublicPropTypes<T> = Partial<RemoveReadonly<ExtractPropTypes<T>>>
