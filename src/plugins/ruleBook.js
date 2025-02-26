const ruleBook = {
  required: (value) => !!value || "Campo Obrigatório - ruleBook.",
  // fieldMaxLength: (maxLength) => (value) => {
  //   return (
  //     value.length <= maxLength ||
  //     "O campo deve ter no máximo " + maxLength + " caracteres."
  //   );
  // },
  // fieldMinLength: (minLength) => (value) => {
  //   return (
  //     value.length >= minLength ||
  //     "O campo deve ter no máximo " + minLength + " caracteres."
  //   );
  // },
  // filedBetweenLength: (minLength, maxLength) => (value) => {
  //   return (
  //     (value.length <= maxLength && value.length >= minLength) ||
  //     "O campo deve ter entre " + minLength + " e " + maxLength + " caracteres."
  //   )
  // },
  // comprimento: (value) =>
  //   value.length >= 8 || "Senha deve conter no mínimo 8 caracteres.",
  // confirmed: (secondField) => (value) => {
  //   return (
  //     value === secondField || "Campo original e confirmação não são iguais"
  //   );
  // },
  // password_match: (value) => {
  //   return (
  //     formData.value.password === formData.value.password_confirmation ||
  //     "Senhas não conferem"
  //   );
  // },
  // email: (value) => {
  //   const pattern =
  //     /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return pattern.test(value) || "Email inválido.";
  // },
  // cpf_format: (value) => {
  //   const pattern = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
  //   return pattern.test(value) || "CPF em formato inválido";
  // },
  // cpf_valid: (value) => {
  //   var cpf_temp = formData.value.cpf;

  //   cpf_temp = cpf_temp.replace(/[^\d]/g, "");

  //   // primeira condição de falha do validador não é encontrada com operações matemáticas.
  //   if (cpf_temp == "00000000000") return "CPF inválido";

  //   var soma = 0;
  //   var verificador = 0;

  //   for (let i = 1; i <= 9; i++)
  //     soma = soma + parseInt(cpf_temp.substring(i - 1, i)) * (11 - i);
  //   verificador = 11 - (soma % 11);

  //   // validar primeiro digito verificador
  //   if (verificador == 10) verificador = 0;
  //   if (verificador != parseInt(cpf_temp.substring(9, 10)))
  //     return "CPF inválido";

  //   soma = 0;
  //   for (let i = 1; i <= 10; i++)
  //     soma = soma + parseInt(cpf_temp.substring(i - 1, i)) * (12 - i);
  //   verificador = 11 - (soma % 11);

  //   // validar segundo digito verificador
  //   if (verificador == 10) verificador = 0;
  //   if (verificador != parseInt(cpf_temp.substring(10, 11)))
  //     return "CPF inválido";

  //   //aplicar pontos e barra no cpf
  //   formData.value.cpf =
  //     cpf_temp.substring(0, 3) +
  //     "." +
  //     cpf_temp.substring(3, 6) +
  //     "." +
  //     cpf_temp.substring(6, 9) +
  //     "-" +
  //     cpf_temp.substring(9, 11);
  //   return true;
  // },
  // file_size_limit: (sizeLimit) => (value) => {
  //   // sizeLimit em bytes
  //   if (value.length) {
  //     // FileField em vue é um array de arquivos, mesmo que contenha apenas um arquivo
  //     let totalSize = 0;
  //     for (let i = 0; index < value.length; i++) {
  //       const file = value[i];
  //       totalSize += parseInt(file.size);
  //     }
  //     if (totalSize > sizeLimit) {
  //       return (
  //         "Arquivo muito grande, tamanho limite do arquivo é " +
  //         sizeLimit +
  //         " bytes"
  //       );
  //     }
  //     return true;
  //   } else return "Arquivo não recebido";
  // },
};

export default ruleBook ;
