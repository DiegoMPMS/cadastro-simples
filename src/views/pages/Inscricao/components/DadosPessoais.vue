<template>

	<!-- Formulário de inscrição -->
	<v-form v-model="form" @submit.prevent="onSubmit">

		<v-container>

			<v-row>
				<!-- Se eu estiver entendo isso corretamente cols divide a linha em 12 "blocos" e sm indica quantos blocos tem ESSA coluna -->
				<!-- tentei alterar o valor de 'sm' não vi mudança visual -->
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.name" :readonly="loading" :rules="[rules.required]" label="Nome"
						clearable></v-text-field>
				</v-col>
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.sobrenome" :readonly="loading" :rules="[rules.required]" label="Sobrenome"
						clearable></v-text-field>
				</v-col>
			</v-row>

			<v-row class="mb-2">
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.nomeSocial" :readonly="loading" label="Nome Social" clearable>
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
					<v-text-field v-model="formData.cpf" :readonly="loading" :rules="[rules.required, rules.cpf_format, cpf_valid]"
						label="CPF" placeholder="XXX.XXX.XXX-XX" maxlength="14"></v-text-field>
				</v-col>
			</v-row>
		</v-container>

		<v-divider class="mb-6" thickness="3" opacity="0.6" color="light-blue"></v-divider>

		<v-container>
			<v-row>
				<v-col cols="12" sm="12">
					<v-text-field v-model="formData.email" :readonly="loading" :rules="[rules.required, rules.email]" label="Email"
						clearable></v-text-field>
				</v-col>

			</v-row>

			<v-row>
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.password" type="password" :readonly="loading"
						:rules="[rules.required, rules.comprimento_senha]" label="Senha" placeholder="Digite sua senha"
						clearable></v-text-field>
				</v-col>
				<v-col>
					<v-text-field v-model="formData.password_confirmation" type="password" :readonly="loading"
						:rules="[rules.required, rules.comprimento_senha, password_match]" label="Confirmar Senha"
						placeholder="Digite sua senha" clearable></v-text-field>
				</v-col>
			</v-row>
		</v-container>

		<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" block>Prosseguir</v-btn>
	</v-form>

</template>

<script>
//import { useCadastroStore } from '@/stores/cadastro'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
	props: ['store', 'formData'],
	emits: ['save'],
	setup(props, { emit }) {
		// --- DATA ---
		const store = ref(props.store)
		const router = useRouter()
		//const route = useRoute()
		const form = ref(false)
		const loading = ref(false)
		const formData = ref(props.formData)

		// Regras de validação para o formulário
		const rules = {
			required: value => !!value || 'Campo Obrigatório.',
			comprimento_senha: value => value.length >= 8 || 'Senha deve conter no mínimo 8 caracteres.',
			// não consigo acessar a propriedade 'password' dentro da função abaixo, tanto com a declaração de função com 'function()' quanto com '=>'
			// password_match: function(value) {
			// 	return value === password || 'Senhas não conferem'
			// },
			email: (value) => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				return pattern.test(value) || 'Email inválido.'
			},
			cpf_format: (value) => {
				const pattern = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
				return pattern.test(value) || 'CPF em formato inválido'
			}
		}

		// --- METHODS ---
		const onSubmit = () => {
			if (!form.value) return

			loading.value = true

			// aqui deveria estar a chama da API para realizar o cadastro com os dados iniciais, e a espera pela resposta para seguir ao próximo passo 
			// e provavelmente um acesso ao VUE storage pra guardar as informações caso seja necessário voltar ou reiniciar o formulário
			// por enquanto esperamos alguns segundos e seguimos para a próxima página.

			store.setCadastro(formData.value)
			setTimeout(() => (

				router.push({ name: 'cadastro_endereco' })), 2000)
		}

		const password_match = () => {
			if (formData.value.password === formData.value.password_confirmation) {
				return true;
			} else { return 'Senhas não conferem' }
		}

		const cpf_valid = () => {
			var cpf_temp = formData.value.cpf

			cpf_temp = cpf_temp.replace(/[^\d]/g, "");

			// primeira condição de falha do validador não é encontrada com operações matemáticas.
			if (cpf_temp == '00000000000') return 'CPF inválido';

			var soma = 0;
			var verificador = 0;

			for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpf_temp.substring(i - 1, i)) * (11 - i);
			verificador = 11 - (soma % 11);

			// validar primeiro digito verificador
			if (verificador == 10) verificador = 0;
			if (verificador != parseInt(cpf_temp.substring(9, 10))) return 'CPF inválido2';

			soma = 0;
			for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpf_temp.substring(i - 1, i)) * (12 - i);
			verificador = 11 - (soma % 11);

			// validar segundo digito verificador
			if (verificador == 10) verificador = 0;
			if (verificador != parseInt(cpf_temp.substring(10, 11))) return 'CPF inválido3';

			//aplicar pontos e barra no cpf
			//console.log('done')
			formData.value.cpf = cpf_temp.substring(0, 3) + '.' + cpf_temp.substring(3, 6) + '.' + cpf_temp.substring(6, 9) + '-' + cpf_temp.substring(9, 11);
			return true
		}
		onMounted(() => {
			/*formData.$subscribe((mutation,state)=>{
				if(mutation.events.key === 'step'){
				
				}})
				emit('save', state)
				
				*/
		})
		return {
			form,
			formData,
			loading,
			rules,
			onSubmit,
			password_match,
			cpf_valid,
		};
	}


}
</script>
