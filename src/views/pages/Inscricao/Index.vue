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
          <v-breadcrumbs :items="crumbs">
            <template v-slot:title="{ item }">
              <span class="item-bread" :class="route.name == item.route_name ? 'item-current-route' : ''"
                @click="redirected(item.route_name)">{{ item.title }}</span>
            </template>
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
          <!--  <RouterView />  -->
          <DadosPessoais v-if="store.step == 1" :store="store" :form-data="formData"/>
          <Endereco v-if="store.step == 2" :store="store" :form-data="formData"/>
          <Documento v-if="store.step == 3" :store="store" :form-data="formData" :form-files="formFiles"/>
        </v-card>
      </v-sheet>
    </v-main>
  </v-app>

</template>

<script>
import { useCadastroStore } from '@/stores/cadastro'
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Importando as crianças
import DadosPessoais from './components/DadosPessoais.vue'
import Endereco from './components/Endereco.vue'
import Documento from './components/Documento.vue'

export default {
  props: {},
  emits: [],
  components: { DadosPessoais, Endereco, Documento },
  setup(props, { emit }) {

    // --- DATA ---
    const router = useRouter()
    const route = useRoute()
    const store = useCadastroStore()
    const formData = ref(store.form)
    const formFiles = ref(store.arquivos)
    const crumbs = ref([
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
    ])


    const route_order = ['cadastro_dados', 'cadastro_endereco', 'cadastro_documentos']
    // --- WATCHERS ---
    watch(route, (to, from) => {
      whereAmI();
    })
    // --- MOUNTED LIFECYCLE HOOK --- 
    onMounted(() => {
      whereAmI();
    })
    // --- METHODS ---
    const redirected = (value) => {
      router.push({ name: value });
    }
    const whereAmI = () => {
      // a função é chamada ma vez no evento de mounted() e chamada sempre que a rota muda, usando um watcher
      for (let index = 0; index < crumbs.value.length; index++) {
        const element = crumbs.value[index];
        if (route_order.indexOf(route.name) + 1 >= parseInt(element.step)) {
          element.disabled = false;
        } else {
          element.disabled = true;
        }
      }
    }
    return {
      route,
      store,
      formData,
      formFiles,
      crumbs,
      redirected,
    }

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