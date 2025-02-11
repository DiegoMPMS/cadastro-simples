<template>

	<!-- Formulário de inscrição -->
	<v-form v-model="form" @submit.prevent="onSubmit">

		<v-container>
			<v-row>
				<v-col cols="12" sm="6">
					<v-file-input v-model="arquivos.doc_pessoal_com_foto" label="Documento pessoal com foto"
						accept="application/.pdf" :rules="[rules.file_size_limit, rules.required]" clearable show-size
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
				<v-col>
					<v-file-input v-model="arquivos.cert_quitacao_eleitoral" label="Certidão de quitação eleitoral"
						accept="application/.pdf" :rules="[rules.file_size_limit, rules.required]" clearable show-size
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
			</v-row>

			<v-row>
				<v-col>
					<v-file-input v-model="arquivos.certidao_antecedentes_criminais" label="Certidão de antecedentes criminais"
						accept="application/.pdf" :rules="[rules.file_size_limit, rules.required]" clearable show-size hint="* obrigatório"
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
				<v-col>
					<v-file-input v-model="arquivos.reservista_dispensa"
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
				<v-col>
					<v-file-input v-model="arquivos.relatorio_medico" label="Relatório médico" accept="application/.pdf"
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
				<v-col>
					<v-file-input v-model="arquivos.declaracao_afrodescendencia"
						label="Certidão de auto declaração de afrodescendência" accept="application/.pdf"
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
		</v-container>

		<v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit" block>Cadastrar</v-btn>
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
		arquivos: {
			doc_pessoal_com_foto: null,
			cert_quitacao_eleitoral: null,
			certidao_antecedentes_criminais: null,
			reservista_dispensa: null,
			cert_quitacao_eleitoral: null,
			declaracao_afrodescendencia: null,
		},


		loading: false,
		// Regras de validação para o formulário
		rules: {
			required: value => !!value || 'Campo Obrigatório.',
			file_size_limit: value => !!value || 'Campo Obrigatório.',
		},
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
