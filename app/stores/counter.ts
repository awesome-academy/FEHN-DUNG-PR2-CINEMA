import { defineStore } from "pinia";

export const useCouterStore = defineStore('counter', {
    state: () => ({
        count: 0
    }),
    actions: {
        increase() {
            this.count++;
        },
        decrease() {
            this.count--;
        }
    }
})
