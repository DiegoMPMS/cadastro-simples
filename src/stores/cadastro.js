import { defineStore } from "pinia";

// nome segue padrão
export const useCadastroStore = defineStore('cadastro', {
  // state => data
  state: () => ({ count: 0, name: 'apenas para teste'}),
  // getters => computed
  getters: {},
  // actions => methods 
  actions: {
    increment() {
      this.count++;
    }
  },
  persist: true,
});