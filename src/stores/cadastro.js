import { defineStore } from "pinia";

// nome segue padrão
export const useCadastroStore = defineStore('cadastro', {
  // state => data
  state: () => ({
    //Cadastro - Dados Pessoais 
    step: 0, 
    nome: null,
		sobrenome: null,
		nomeSocial: null,
		cpf: null,
		email: null,
		password: null,
		password_confirmation: null,
    // Cadastro - Endereço
    cep: null,
		logradouro: null,
		numero: null,
		complemento: null,
		bairro: null,
		cidade: null,
		estado: null,
    //Cadastro - Documentos
    arquivos: {
			doc_pessoal_com_foto: null,
			cert_quitacao_eleitoral: null,
			certidao_antecedentes_criminais: null,
			reservista_dispensa: null,
			cert_quitacao_eleitoral: null,
			declaracao_afrodescendencia: null,
		},
    //Documentos são o ultimo passo e são enviados diretamente ao servidor
  }),
  // getters => computed
  getters: {},
  // actions => methods 
  actions: {},
  persist: true,
});