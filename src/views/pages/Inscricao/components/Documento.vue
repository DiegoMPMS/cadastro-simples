<template>

	<!-- Formulário de inscrição -->
	<v-form v-model="form" @submit.prevent="onSubmit">

		<v-container>
			
		</v-container>

		<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" block>Cadastrar</v-btn>

	</v-form>

</template>

<script setup>
import { useCadastroStore } from '@/stores/cadastro';
const store = useCadastroStore();
</script>

<script>
export default {
	data: () => ({
		form: true,
		// cada field do formulário deve conter sua vária declara no script
		// o nome do variável é 'linkado' usando v-model="nome_da_variável"

		loading: false,
		// Regras de validação para o formulário
		rules: {
			required: value => value.length > 0 || 'Campo Obrigatório.',
			file_size_limit: value => {
				if (value.length) {
					if (parseInt(value[0].size) < 2000000) {
						return true;
					} else {
						return 'Arquivo muito grande, tamanho limite do arquivo é 2MB';
					}
				} else return 'Arquivo não recebido'
			},
		},
	}),
	computed: {
		store: () => useCadastroStore()
	},
	methods: {
		get_cadastro_info() {
			// retorna apenas os campos utilizados no cadastro do usuário
			// em formato de objeto
			const static_store = JSON.parse(JSON.stringify(this.store.$state));
			delete static_store.arquivos;
			delete static_store.step;
			console.log(JSON.stringify(static_store));
			return static_store
		},
		async onSubmit() {
			if (!this.form) return

			this.loading = true

			const url = 'http://localhost:8000/api/cadastro'
			const response = await fetch(url, {
				method:"POST",
				headers: {"Content-type": "application/json;charset=UTF-8"},
				body: JSON.stringify(this.get_cadastro_info())
			});
			console.log('------------ RESPONSE --------------');
			console.log(response.json());
			// aqui deveria estar a chama da API para realizar o cadastro com os dados iniciais, e a espera pela resposta para seguir ao próximo passo 
			// e provavelmente um acesso ao VUE storage pra guardar as informações caso seja necessário voltar ou reiniciar o formulário
			// por enquanto esperamos alguns segundos e seguimos para a próxima página.
			//setTimeout(2000);
			this.loading = false
		},
		// async para enviar documentos, devido ao possível limite de post de 2megabytes,
		// cada arquivo tera um limite de 2.000 bytes e o resto do post deve caber no espaço restante
		// e os arquivos serão enviados em um loop para a API, e após receber a confirmação de tudo prosseguimos.
		async send_files() {
			for (let index = 0; index < array.length; index++) {
				const element = array[index];

			}
		}
	}
}
</script>
