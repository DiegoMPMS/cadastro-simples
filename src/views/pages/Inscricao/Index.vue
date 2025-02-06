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
            <template v-slot:title="{ item }">
              <span class="item-bread" :class="router.meta.router == item.route_name ? 'text-blue' : ''"
                @click="redirected(item.route_name)">{{ item.title }}</span>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
          <RouterView />
        </v-card>
      </v-sheet>
    </v-main>
  </v-app>


</template>
<script>
export default {
  name: 'Inscricao',
  data() {
    // usado pelas migalhas para mostrar a etapa do cadastro
    return {
      router: this.$router.currentRoute,
      items: [
        {
          title: 'Dados Pessoais',
          disabled: false,
          route_name: 'cadastro_dados',
          active: false,
        },
        {
          title: 'Endereço',
          disabled: false,
          route_name: 'cadastro_endereco',
          active: false,
        },
        {
          title: 'Documentos',
          disabled: true,
          route_name: 'cadastro_documentos',
          active: false,
        },
      ],
    }
  },
  methods: {
    redirected(value) {
      this.$router.push({ name: value });
    }
  }

}
</script>
<style>
.item-bread:hover {
  cursor: pointer;
  text-decoration: underline;
  color: #0592d3;
}
</style>