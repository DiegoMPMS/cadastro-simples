<template>

	<!-- Formulário de inscrição -->
	<v-form v-model="form" @submit.prevent="onSubmit">

		<v-container>

			<!-- Se eu estiver entendo isso corretamente cols divide a linha em 12 "blocos" e sm indica quantos blocos tem ESSA coluna -->
			<!-- tentei alterar o valor de 'sm' não vi mudança visual -->
			<v-row>
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.cep" :readonly="loading" :rules="[rules.required, rules.cep_format, cep_search]"
						label="CEP" maxlength="9" clearable></v-text-field>
				</v-col>
				<!-- Mover para dentro do campo de número, espaçamento do elemento na tela deixa ele desconexo do campo de 'Número' -->
				<v-col>
					<v-checkbox v-model="sem_numero_checkbox" @change="sem_numero_checkbox_update"
						class="d-flex justify-center align-center" label="Sem Número"></v-checkbox>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.logradouro" :readonly="loading" :rules="[rules.required]" label="Logradouro"
						clearable></v-text-field>
				</v-col>
				<v-col cols="12" sm="6">
					<v-text-field v-model="formData.numero" :readonly="loading || sem_numero_checkbox" :rules="[rules.required]"
						label="Número" :variant="numero_field_variant"></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" sm="12">
					<v-text-field v-model="formData.complemento" :readonly="loading" label="Complemento"
						clearable></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" sm="4">
					<v-text-field v-model="formData.bairro" :readonly="loading" :rules="[rules.required]" label="Bairro"
						clearable></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field v-model="formData.cidade" :readonly="loading" :rules="[rules.required]" label="Cidade"
						clearable></v-text-field>
				</v-col>
				<v-col cols="12" sm="4">
					<v-text-field v-model="formData.estado" :readonly="loading" :rules="[rules.required]" label="Estado"
						clearable></v-text-field>
				</v-col>
			</v-row>

		</v-container>

		<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" block>Prosseguir</v-btn>
	</v-form>

</template>

<script>
//import { useCadastroStore } from '@/stores/cadastro';
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
	props: ['store', 'formData'],
	emits: [],
	setup(props, { emit }) {
		// DATA
		const store = ref(props.store)
		const router = useRouter()
		const form = ref(false)
		const loading = ref(false)
		const formData = ref(props.formData)
		const sem_numero_checkbox = ref(null)
		const numero_field_variant = ref('filled');
		const old_cep = ref(null)
		const msg_search = ref(null)

		const rules = {
			required: value => !!value || 'Campo Obrigatório.',
			cep_format: value => {
				const pattern = /([0-9]{5}[-]?[0-9]{3})/
				return pattern.test(value) || 'CEP em formato inválido'
			},
		}

		// METHODS
		const onSubmit = () => {
			if (!form) return

			loading.value = true
			// aqui deveria estar a chama da API para realizar o cadastro com os dados iniciais, e a espera pela resposta para seguir ao próximo passo 
			// e provavelmente um acesso ao VUE storage pra guardar as informações caso seja necessário voltar ou reiniciar o formulário
			// por enquanto esperamos alguns segundos e seguimos para a próxima página.
			//store.setCadastro(formData.value)
			loading.value = false
			//setTimeout(() => (router.push({ name: 'cadastro_documentos' })), 2000);
			setTimeout(() => (store.value.step=3), 2000);
		}

		const sem_numero_checkbox_update = () => {
			if (sem_numero_checkbox.value) {
				store.value.numero = 'Sem número';
				numero_field_variant = 'outlined';
			} else {
				store.value.numero = null;
				numero_field_variant.value = 'filled';
			}
		}

		const cep_search = async () => {
			var cep_temp = formData.value.cep.replace(/[-]/, "");

			if (old_cep.value == cep_temp) {
				return msg_search.value
			}
			old_cep.value = cep_temp

			await fetch('https://brasilapi.com.br/api/cep/v1/' + cep_temp)
				.then(response => {
					if (!response.ok) {
						if (response.status == '404') {
							msg_search.value = 'CEP não encontrado'
							formData.value.logradouro = null
							formData.value.bairro = null
							formData.value.cidade = null
							formData.value.estado = null
						}
					} else {
						return response.json()
					}
				})
				.then(data => {
					if (data) {
						formData.value.logradouro = data.street
						formData.value.bairro = data.neighborhood
						formData.value.cidade = data.city
						formData.value.estado = data.state
						msg_search.value = true
						formData.value.cep = cep_temp.substring(0, 5) + '-' + cep_temp.substring(5, 8)
					}
				})
			return msg_search.value;
		}
		return {
			formData,
			form,
			store,
			loading,
			rules,
			sem_numero_checkbox,
			numero_field_variant,
			onSubmit,
			sem_numero_checkbox_update,
			cep_search,
		}
	},
}
</script>
