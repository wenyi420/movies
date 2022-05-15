import { message } from "ant-design-vue";

export const tip = (msg, type) => {
  switch (type) {
    case "success":
      message.success(msg);
      break;
    case "error":
      message.error(msg);
      break;
    case "warning":
      message.warning(msg);
      break;
  }
};
