import { defineStore } from "pinia";

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    message: "",
  }),
  actions: {
    setMessage(msg) {
      this.message = msg;
    },
    clearMessage() {
      this.message = "";
    },
  },
  persist: true, // Permet de persister les données après redirection
});
