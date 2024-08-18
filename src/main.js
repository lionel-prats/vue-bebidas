import './assets/main.css'

import { createApp } from 'vue' // aca estamos creando la aplicacion de Vue.js (v223)
import { createPinia } from 'pinia' // aca estamos creando Pinia (v223)
// aca estamos xxx (v223)
import App from './App.vue'
import router from './router'

const app = createApp(App)// aca instanciamos la aplicacion (v223)

app.use(createPinia()) // aca agregamos Pinia (v223)
app.use(router) // aca agregamos el router (v223)

app.mount('#app')
