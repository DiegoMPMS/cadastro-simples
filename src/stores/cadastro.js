import { defineStore } from "pinia";

// nome segue padrão
export const useCadastroStore = defineStore('cadastro', {
  // state => data
  state: () => ({ 
    step: 0, 
    nome: null,
		sobrenome: null,
		nomeSocial: null,
		cpf: null,
		email: null,
		password: null,
		password_confirmation: null,
  }),
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