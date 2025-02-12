//import './assets/main.css'

//Plugins
import { registerPlugins } from './plugins'

// Components
import App from './App.vue'

// Composable
import { createApp } from 'vue'

// Pinia
import { createPinia } from 'pinia'

// Vue-Route é adicionado dentro do registerPlugins

const app = createApp(App)
const pinia = createPinia()

registerPlugins(app)
app.use(pinia)

app.mount('#app')
