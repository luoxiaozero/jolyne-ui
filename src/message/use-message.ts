import { throwError } from "../util";
import { inject } from "@vue/runtime-core";
import { MessageApiInjection, messageApiInjectionKey } from "./MessageProvider";
export function useMessage(): MessageApiInjection {
   const api = inject(messageApiInjectionKey, null);
   if (api === null) {
    throwError(
        'use-message',
        'No outer <jo-message-provider /> founded. '
      )
   }
   return api;
}