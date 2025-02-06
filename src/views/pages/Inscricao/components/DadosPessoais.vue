<template>

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
									<v-text-field v-model="cpf" :readonly="loading" :rules="[rules.required, rules.cpf_format, cpf_valid]" label="CPF"
										placeholder="XXX.XXX.XXX-XX" maxlength="14"></v-text-field>
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
										:rules="[rules.required, rules.comprimento_senha, password_match]" label="Confirmar Senha"
										placeholder="Digite sua senha" clearable></v-text-field>
								</v-col>
							</v-row>
						</v-container>

						<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
							block>Cadastrar</v-btn>
					</v-form>

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
			// password_match: function(value) {
			// 	return value === password || 'Senhas não conferem'
			// },
			email: value => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || 'Email inválido.'
			},
			cpf_format: value =>{
				const pattern = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
				return pattern.test(value) || 'CPF em formato inválido'
			}
		},

	}),
	methods: {
		onSubmit() {
			if (!this.form) return

			this.loading = true

			// aqui deveria estar a chama da API para realizar o cadastro com os dados iniciais, e a espera pela resposta para seguir ao próximo passo 
			// e provavelmente um acesso ao VUE storage pra guardar as informações caso seja necessário voltar ou reiniciar o formulário
			// por enquanto esperamos alguns segundos e seguimos para a próxima página.
			setTimeout(() => (this.$router.push({name:'cadastro_endereco'})), 2000)	
		},
		password_match() {
			if (this.password === this.password_confirmation) {
				return true;
			} else {return 'Senhas não conferem'}
		},
		cpf_valid(){
			var cpf_temp = this.cpf;
			cpf_temp = cpf_temp.replace(/[^\d]/g, "");
			console.log('temp:' + cpf_temp);

			// primeira condição de falha do validador não é encontrada com operações matemáticas.
			if (cpf_temp == '00000000000') return 'CPF inválido1';

			var soma = 0;
			var resto = 0;
			console.log('temp2: ' + cpf_temp)

			for (let i=1; i<=9; i++) soma = soma + parseInt(cpf_temp.substring(i-1,i)) * (11-1);
			resto = (soma * 10) % 11;


			// validar primeiro digito verificador
			if (resto == 10) resto = 0;
			if (resto != parseInt(cpf_temp.substring(9,10))) return 'CPF inválido2';
			
			soma = 0;
			for (let i=1; i<10; i++) soma = soma + parseInt(cpf_temp.substring(i-1,i)) * (12-1);
			resto = (soma * 10) % 11;

			// validar segundo digito verificador
			if (resto == 10) resto = 0;
			if (resto != parseInt(cpf_temp.substring(10,11))) return 'CPF inválido3';

			//aplicar pontos e barra no cpf
			console.log('done')
			this.cpf = cpf_temp.substring(0,3) + '.' + cpf_temp.substring(3,6) + '.' + cpf_temp.substring(6,9) + '-' + cpf_temp.substring(9,11);
			return true
		}                                                                    
	}
}
</script>
