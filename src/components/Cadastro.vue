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

							<v-row>
								<!-- Se eu estiver entendo isso corretamente cols divide a linha em 12 "blocos" e sm indica quantos blocos tem ESSA coluna -->
								<!-- tentei alterar o valor de 'sm' não vi mudança visual -->
								<v-col cols="12" sm="6">
									<v-text-field v-model="nome" :readonly="loading" :rules="[rules.required]" label="Nome"
										clearable></v-text-field>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field v-model="sobrenome" :readonly="loading" :rules="[rules.required]" label="Sobrenome"
										clearable></v-text-field>
								</v-col>
							</v-row>

							<v-row class="mb-2">
								<v-col cols="12" sm="6">
									<v-text-field v-model="nomeSocial" :readonly="loading" label="Nome Social" clearable>
										<template v-slot:append-inner>
											<v-tooltip location="bottom">
												<template v-slot:activator="{ props }">
													<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
												</template>
												O nome social é o nome pelo qual a pessoa se identifica e é reconhecida na sociedade. Garantido
												pelo
												decreto nº 8.727,
												de 28 de abril de 2016
											</v-tooltip>
										</template>
									</v-text-field>
								</v-col>
								<v-col cols="12" sm="6">
									<v-text-field v-model="cpf" :readonly="loading" :rules="[rules.required, rules.cpf]" label="CPF"
										placeholder="XXX.XXX.XXX-XX"></v-text-field>
								</v-col>
							</v-row>
						</v-container>

						<v-divider class="mb-6" thickness="3" opacity="0.6" color="light-blue"></v-divider>

						<v-container>
							<v-row>
								<v-col cols="12" sm="12">
									<v-text-field v-model="email" :readonly="loading" :rules="[rules.required, rules.email]" label="Email"
										clearable></v-text-field>
								</v-col>

							</v-row>

							<v-row>
								<v-col cols="12" sm="6">
									<v-text-field v-model="password" type="password" :readonly="loading"
										:rules="[rules.required, rules.comprimento_senha]" label="Senha" placeholder="Digite sua senha"
										clearable></v-text-field>
								</v-col>
								<v-col>
									<v-text-field v-model="password_confirmation" type="password" :readonly="loading"
										:rules="[rules.required, rules.comprimento_senha, rules.password_match]" label="Confirmar Senha"
										placeholder="Digite sua senha" clearable></v-text-field>
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
		nome: null,
		sobrenome: null,
		nomeSocial: null,
		cpf: null,
		email: null,
		password: null,
		password_confirmation: null,

		loading: false,
		// Regras de validação para o formulário
		rules: {
			required: value => !!value || 'Campo Obrigatório.',
			comprimento_senha: value => value.length >= 8 || 'Senha deve conter no mínimo 8 caracteres.',
			// não consigo acessar a propriedade 'password' dentro da função abaixo, tanto com a declaração de função com 'function()' quanto com '=>'
			password_match: function(value) {
				return value === password || 'Senhas não conferem'
			},
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || 'Email inválido.'
			},
			cpf: value => true || 'precisa ser implementado'
		},
		// usado pelas migalhas para mostrar a etapa do cadastro
		items: [
			{
				title: 'Dados Pessoais',
				disabled: false,

			},
			{
				title: 'Endereço',
				disabled: true,

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

			setTimeout(() => (this.loading = false), 2000)
		},
		// required(v) {
		// 	return !!v || 'Campo Obrigatório'
		// }
	}
}
</script>
