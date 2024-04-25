import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';


import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)

Chart.register(...registerables);
app.mount('#app')
