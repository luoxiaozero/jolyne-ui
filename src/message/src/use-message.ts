import { throwError } from "../../util";
import { inject } from "vue";
import { MessageApiInjection, messageApiInjectionKey } from "./MessageProvider";
export function useMessage(): MessageApiInjection {
   const api = inject(messageApiInjectionKey, null);
   if (api === null) {
      throwError(
         'use-message',
         'No outer <jo-message-provider /> founded. '
      )
   } else if (api === undefined) {
      throwError(
         'use-message',
         'useMessage 定义位置不对，应定义到 setup 函数顶部。'
      )
   }
   return api;
}