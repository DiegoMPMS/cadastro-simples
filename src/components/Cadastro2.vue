<template>
	<v-app>
		<v-app-bar>
			<!-- Titulo da barra de navegação no topo -->
			<v-app-bar-title>Página de Cadastro</v-app-bar-title>
		</v-app-bar>
		<v-main>
			<v-sheet class="bg-light-blue pa-12" rounded>
				<v-card class="mx-auto px-6 py-8">

					<!-- Migalhas de pão usadas para indicar a etapa do cadastro, talvez exista um solução mais elegante -->
					<v-breadcrumbs :items="items">
						<template v-slot:divider>
							<v-icon icon="mdi-chevron-right"></v-icon>
						</template>
					</v-breadcrumbs>

					<!-- Formulário de inscrição -->
					<v-form v-model="form" @submit.prevent="onSubmit">

						<v-container>


							<!-- Se eu estiver entendo isso corretamente cols divide a linha em 12 "blocos" e sm indica quantos blocos tem ESSA coluna -->
							<!-- tentei alterar o valor de 'sm' não vi mudança visual -->
							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field v-model="cep" :readonly="loading"
										:rules="[rules.required, rules.cep_format, cep_search]" label="CEP" maxlength="9" clearable></v-text-field>
								</v-col>
								<!-- Mover para dentro do campo de número, espaçamento do elemento na tela deixa ele desconexo do campo de 'Número' -->
								<v-col>
									<v-checkbox v-model="sem_numero_checkbox" @change="sem_numero_checkbox_update"
										class="d-flex justify-center align-center" label="Sem Número"></v-checkbox>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field v-model="logradouro" :readonly="loading" :rules="[rules.required]" label="Logradouro"
										clearable></v-text-field>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field v-model="numero" :readonly="loading || sem_numero_checkbox" :rules="[rules.required]"
										label="Número" :variant="numero_field_variant"></v-text-field>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12" sm="12">
									<v-text-field v-model="complemento" :readonly="loading" :rules="[rules.required]" label="Complemento"
										clearable></v-text-field>
								</v-col>
							</v-row>

							<v-row>
								<v-col cols="12" sm="4">
									<v-text-field v-model="bairro" :readonly="loading" :rules="[rules.required]" label="Bairro"
										clearable></v-text-field>
								</v-col>
								<v-col cols="12" sm="4">
									<v-text-field v-model="cidade" :readonly="loading" :rules="[rules.required]" label="Cidade"
										clearable></v-text-field>
								</v-col>
								<v-col cols="12" sm="4">
									<v-text-field v-model="estado" :readonly="loading" :rules="[rules.required]" label="Estado"
										clearable></v-text-field>
								</v-col>
							</v-row>

						</v-container>

						<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
							block>Cadastrar</v-btn>
					</v-form>
				</v-card>
			</v-sheet>
		</v-main>
	</v-app>


</template>

<script setup>
</script>

<script>
export default {
	data: () => ({
		form: false,
		// cada field do formulário deve conter sua vária declara no script
		// o nome do variável é 'linkado' usando v-model="nome_da_variável"
		cep: null,
		sem_numero_checkbox: null,
		logradouro: null,
		numero: null,
		complemento: null,
		bairro: null,
		cidade: null,
		estado: null,
		numero_field_variant: 'filled',
		old_cep: null,

		loading: false,
		// Regras de validação para o formulário
		rules: {
			required: value => !!value || 'Campo Obrigatório.',
			cep_format: value => {
				const pattern = /([0-9]{5}[-]?[0-9]{3})/
				return pattern.test(value) || 'CEP em formato inválido'
			},
		},
		// usado pelas migalhas para mostrar a etapa do cadastro
		items: [
			{
				title: 'Dados Pessoais',
				disabled: false,
				href: "cadastro_dados",
			},
			{
				title: 'Endereço',
				disabled: false,
			}, {
				title: 'Documentos',
				disabled: true,
			},
		]
	}),

	methods: {
		onSubmit() {
			if (!this.form) return

			this.loading = true
			// aqui deveria estar a chama da API para realizar o cadastro com os dados iniciais, e a espera pela resposta para seguir ao próximo passo 
			// e provavelmente um acesso ao VUE storage pra guardar as informações caso seja necessário voltar ou reiniciar o formulário
			// por enquanto esperamos alguns segundos e seguimos para a próxima página.
			setTimeout(() => (this.$router.push('cadastro3')), 2000);
		},
		sem_numero_checkbox_update() {
			if (this.sem_numero_checkbox) {
				this.numero = 'Sem número';
				this.numero_field_variant = 'outlined';
			} else {
				this.numero = null;
				this.numero_field_variant = 'filled';
			}
		},
		async cep_search() {
			// TODO - toda vez que o campo é preenchido ou sai de foco a função é chamada, adicionar código para realizar chamada apenas se o conteúdo tiver mudado
			var cep_temp = this.cep.replace(/[-]/, "");
			
			await fetch('https://brasilapi.com.br/api/cep/v1/' + cep_temp)
				.then(response => {
					if (!response.ok) {
						if (response.status == '404') {
							msg = "CEP não encontrado";
							//throw msg;
						}
					}
					return response.json();
				})
				.then(data => {
					this.logradouro = data.street;
					this.bairro = data.neighborhood;
					this.cidade = data.city;
					this.estado = data.state;
					return true
				})


				console.log('mensagem: '+msg)
				return msg
		},
	}
}
</script>
