<template>

	<!-- Formulário de inscrição -->
	<v-form v-model="form" @submit.prevent="onSubmit">

		<v-container>
		
		<v-row>
				<v-col cols="12" sm="6">
					<v-file-input v-model="store.arquivos.doc_pessoal_com_foto" label="Documento pessoal com foto"
						accept="application/.pdf" :rules="[rules.required, rules.file_size_limit]" clearable show-size
						hint="* obrigatório" persistent-hint>
						<template v-slot:append-inner>
							<v-tooltip location="bottom">
								<template v-slot:activator="{ props }">
									<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
								</template>
<ul class="mx-2">
	<li>Carteira de identidade</li>
	<li>Carteira de motorista</li>
	<li>Certificado de reservista</li>
	<li>Carteira de trabalho</li>
	<li>Passaporte</li>
	<li>Identidade funcional emitida por órgão de classe</li>
</ul>
</v-tooltip>
</template>
</v-file-input>
</v-col>
<v-col cols="12" sm="6">
	<v-file-input v-model="store.arquivos.cert_quitacao_eleitoral" label="Certidão de quitação eleitoral"
		accept="application/.pdf" :rules="[rules.required, rules.file_size_limit]" clearable show-size hint="* obrigatório"
		persistent-hint>
		<template v-slot:append-inner>
							<v-tooltip location="bottom">
								<template v-slot:activator="{ props }">
									<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
								</template>
		Para mais informações sobre documentos aceitos, consulte o edital XX.X
		</v-tooltip>
		</template>
	</v-file-input>
</v-col>
</v-row>

<v-row>
	<v-col cols="12" sm="6">
		<v-file-input v-model="store.arquivos.certidao_antecedentes_criminais" label="Certidão de antecedentes criminais"
			accept="application/.pdf" :rules="[rules.required, rules.file_size_limit]" clearable show-size
			hint="* obrigatório" persistent-hint>
			<template v-slot:append-inner>
							<v-tooltip location="bottom">
								<template v-slot:activator="{ props }">
									<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
								</template>
			Para mais informações sobre documentos aceitos, consulte o edital XX.X
			</v-tooltip>
			</template>
		</v-file-input>
	</v-col>
	<v-col cols="12" sm="6">
		<v-file-input v-model="store.arquivos.reservista_dispensa"
			label="Certificado de reservista / Dispensa de incorporação" accept="application/.pdf"
			:rules="[rules.file_size_limit]" clearable show-size>
			<template v-slot:append-inner>
							<v-tooltip location="bottom">
								<template v-slot:activator="{ props }">
									<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
								</template>
			Para mais informações sobre documentos aceitos, consulte o edital XX.X
			</v-tooltip>
			</template>
		</v-file-input>
	</v-col>
</v-row>

<v-row>
	<v-col cols="12" sm="6">
		<v-file-input v-model="store.arquivos.relatorio_medico" label="Relatório médico" accept="application/.pdf"
			:rules="[rules.file_size_limit]" clearable show-size>
			<template v-slot:append-inner>
							<v-tooltip location="bottom">
								<template v-slot:activator="{ props }">
									<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
								</template>
			Para mais informações sobre documentos aceitos, consulte o edital XX.X
			</v-tooltip>
			</template>
		</v-file-input>
	</v-col>
	<v-col cols="12" sm="6">
		<v-file-input v-model="store.arquivos.declaracao_afrodescendencia"
			label="Certidão de auto declaração de afrodescendência" accept="application/.pdf" :rules="[rules.file_size_limit]"
			clearable show-size>
			<template v-slot:append-inner>
							<v-tooltip location="bottom">
								<template v-slot:activator="{ props }">
									<v-icon v-bind="props" icon="mdi-help-circle-outline"></v-icon>
								</template>
			Para mais informações sobre documentos aceitos, consulte o edital XX.X
			</v-tooltip>
			</template>
		</v-file-input>
	</v-col>

</v-row>


		</v-container>

		<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" block>Cadastrar</v-btn>

	</v-form>

</template>

<script>
//import { useCadastroStore } from '@/stores/cadastro'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export default {
	props: ['store', 'formData', 'formFiles'],
	emits: [],
	setup(props, { emit }) {
		// --- DATA ---
		const store = ref(props.store)
		const router = useRouter()
		const route = useRoute()
		const form = ref(false)
		const loading = ref(false)
		const item = ref(store.form)

		// Regras de validação para o formulário
		const rules = {
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
		}

		// --- METHODS ---

		const onSubmit = async () => {
			if (!this.form) return

			this.loading = true

			const url = 'http://localhost:8000/api/cadastro'
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-type": "application/json;charset=UTF-8" },
				body: JSON.stringify(this.get_cadastro_info())
			});
			console.log('------------ RESPONSE --------------');
			console.log(response.json());
			// aqui deveria estar a chama da API para realizar o cadastro com os dados iniciais, e a espera pela resposta para seguir ao próximo passo 
			// e provavelmente um acesso ao VUE storage pra guardar as informações caso seja necessário voltar ou reiniciar o formulário
			// por enquanto esperamos alguns segundos e seguimos para a próxima página.
			//setTimeout(2000);
			this.loading = false
		}

		const send_files = async () => {
			// async para enviar documentos, devido ao possível limite de post de 2megabytes,
			// cada arquivo tera um limite de 2.000 bytes e o resto do post deve caber no espaço restante
			// e os arquivos serão enviados em um loop para a API, e após receber a confirmação de tudo prosseguimos.
			for (let index = 0; index < array.length; index++) {
				const element = array[index];
			}
		}
		return{
			item,
			form,
			store,
			loading,
			rules,
			onSubmit,
			send_files
		}

	}
}
</script>
