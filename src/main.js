//import './assets/main.css'

//Plugins
import { registerPlugins } from './plugins'

// Components
import App from './App.vue'

// Composable
import { createApp } from 'vue'

// Vue-Route é adicionado dentro do registerPlugins

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
