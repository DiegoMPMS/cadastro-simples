//import './assets/main.css'

//Plugins
import { registerPlugins } from './plugins'

// Components
import App from './App.vue'

// Composable
import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Vue-Route é adicionado dentro do registerPlugins

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

registerPlugins(app)
app.use(pinia)

app.mount('#app')
