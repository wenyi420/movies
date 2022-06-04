import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useUserStore = defineStore("item", () => {
  let users = reactive([
    {
      account: "test@mail.tw",
      password: "123",
      like: [], // 喜歡電影
      disLike: [],
      playlist: [], // 待看片單
    },
  ]);

  let count = ref(0);

  let increment = () => count.value++;

  return { users, count, increment };
});
// export const useUserStore = defineStore(, {
//   state: () => ({
//     // 存放各個 user 資料
//     users: [
//       // default login
//       {
//         account: "test@mail.tw",
//         password: "123",
//         like: [], // 喜歡電影
//         disLike: [],
//         playlist: [], // 待看片單
//       },
//     ],
//   }),
//   getters: {
//     getUsers: (state) => state.users,
//   },
//   actions: {
//     // increment() {
//     //   this.counter++;
//     // },
//   },
// });
