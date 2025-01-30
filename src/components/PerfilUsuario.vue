<template>
  <v-app id="inspire">
    <!-- Barra Lateral oculta sanduíche -->
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src=""></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>Nome do Usuário</v-list-item-title>
            <v-list-item-subtitle>cargo/tipo da conta</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <!-- Itens dentro da v-list secundária possui texto menor para passar a idea de função secundária -->
          <v-list-item prepend-icon="mdi-pencil-plus-outline" title="Nova Inscrição"
            @click="irNovaInscricao"></v-list-item>
          <v-list-item prepend-icon="mdi-file-account-outline" title="Documentos Pessoais"
            @click="irDocumentosPessoais"></v-list-item>
        </v-list>

        <!-- Item para sair da página no final da barra lateral -->
        <v-list-group style="position: fixed; bottom: 0; width: 100%;">
          <v-list-item prepend-icon="mdi-logout" title="Sair" @click="logout"></v-list-item>
        </v-list-group>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <!-- Titulo da barra de navegação no topo -->
      <v-app-bar-title>Perfil do Usuário</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    

    </v-main>
  </v-app>
</template>

<script setup>
const avatar_img = 



function irNovaInscricao(params) {
  alert("Redirecionar para a página de inscrições")
}

function irDocumentosPessoais(params) {
  alert("Redirecionar para página de documentos pessoais do candidato")
}
function logout(params) {
  alert("Saindo da conta")
}
</script>

<script>
export default {
}
</script>
