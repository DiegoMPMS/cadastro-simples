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
              <span class="item-bread" :class="$route.name == item.route_name ? 'item-current-route' : ''"
                @click="redirected(item.route_name)">{{ item.title }}</span>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
          <RouterView />
        </v-card>
        <v-btn class="mt-2" color="alert" size="large" @click="store.increment" block>testar pinia no pai</v-btn>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script setup>
import { useCadastroStore } from '@/stores/cadastro';
const store = useCadastroStore();
</script>

<script>
export default {
  data() {
    // usado pelas migalhas para mostrar a etapa do cadastro
    return {
      items: [
        {
          title: 'Dados Pessoais',
          disabled: true,
          route_name: 'cadastro_dados',
          step: 1,
        },
        {
          title: 'Endereço',
          disabled: true,
          route_name: 'cadastro_endereco',
          step: 2,
        },
        {
          title: 'Documentos',
          disabled: true,
          route_name: 'cadastro_documentos',
          step: 3,
        },
      ],
      route_order: ['cadastro_dados', 'cadastro_endereco', 'cadastro_documentos'],
    }
  },
  watch: {
    $route(to, from) {
      this.whereAmI();
    }
  },
  mounted: function () {
    // uma forma meio feia de desativar opções futuras do cadastro, o ideal será usar o pinia
    // usando o pinia o cadastro terá elementos em memoria para saber a etapa e poder avançar e voltar, para etapas já concluídas
    this.whereAmI();
  },
  methods: {
    redirected(value) {
      this.$router.push({ name: value });
    },
    whereAmI() {
      // a função é chamada ma vez no evento de mounted() e chamada sempre que a rota muda, usando um watcher
      for (let index = 0; index < this.items.length; index++) {
        const element = this.items[index];
        if (this.route_order.indexOf(this.$route.name) + 1 >= parseInt(element.step)) {
          element.disabled = false;
        } else {
          element.disabled = true;
        }
      }
    },
  },
}
</script>
<style>
.item-bread:hover {
  cursor: pointer;
  text-decoration: underline;
  /* color: #0592d3; */
}

.item-current-route {
  font-weight: 800;
}
</style>