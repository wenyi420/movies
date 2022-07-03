import { message } from "ant-design-vue";

const defaultkey = "message"; // 透過 key 處理同一個 msg
const duration = 2;

export const openLoadingMessage = (msg = "", key = defaultkey) => {
  message.loading({ content: msg, key });
};

export const openSuccessMessage = (msg = "", key = defaultkey) => {
  message.success({ content: msg, key, duration });
};

export const openErrorMessage = (msg = "", key = defaultkey) => {
  message.error({ content: msg, key, duration });
};
