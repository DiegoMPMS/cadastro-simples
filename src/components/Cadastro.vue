<template>
	<v-app>
		<v-app-bar>
			<!-- Titulo da barra de navegação no topo -->
			<v-app-bar-title>Página de Cadastro</v-app-bar-title>
		</v-app-bar>
		<v-main>
			<v-sheet class="bg-light-blue pa-12" rounded>
				<v-card class="mx-auto px-6 py-8">

					
						<v-breadcrumbs :items="items">
							<template v-slot:divider>
								<v-icon icon="mdi-chevron-right"></v-icon>
							</template>
						</v-breadcrumbs>
					
					<v-form v-model="form" @submit.prevent="onSubmit">

						<v-text-field v-model="Nome" :readonly="loading" :rules="[rules.required]" class="mb-2" label="Nome"
							clearable></v-text-field>

						<v-text-field v-model="Sobrenome" :readonly="loading" :rules="[rules.required]" class="mb-2"
							label="Sobrenome" clearable></v-text-field>

						<v-text-field v-model="NomeSocial" :readonly="loading" label="Nome Social" clearable>
							<template v-slot:append-inner>
								<v-tooltip location="bottom">
									<template v-slot:activator="{ props }">
										<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
									</template>
									O nome social é o nome pelo qual a pessoa se identifica e é reconhecida na sociedade. Garantido pelo
									decreto nº 8.727,
									de 28 de abril de 2016
								</v-tooltip>
							</template>
						</v-text-field>

						<v-text-field v-model="CPF" :readonly="loading" :rules="[rules.required, rules.CPF]" class="mb-2"
							label="CPF" placeholder="XXX.XXX.XXX-XX"></v-text-field>

						<v-text-field v-model="email" :readonly="loading" :rules="[rules.required, rules.email]" class="mb-2"
							label="Email" clearable></v-text-field>

						<v-text-field v-model="password" type="password" :readonly="loading" class="mb-2"
							:rules="[rules.required, rules.comprimento_senha]" label="Senha" placeholder="Digite sua senha"
							clearable></v-text-field>

						<v-text-field v-model="password_confirmation" type="password" :readonly="loading" class="mb-2"
							:rules="[rules.required, rules.comprimento_senha]" label="Confirmar Senha" placeholder="Digite sua senha"
							clearable></v-text-field>

						<br>
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
		email: null,
		password: null,
		loading: false,
		rules: {
			required: value => !!value || 'Campo Obrigatório.',
			comprimento_senha: value => value.length >= 8 || 'Senha deve conter no mínimo 8 caracteres.',
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || 'Email inválido.'
			},
		},
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
		required(v) {
			return !!v || 'Campo Obrigatório'
		}
	}
}
</script>
