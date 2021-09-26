import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

import './index.css'
import 'vant/lib/index.css'
import {
  Search,
  Tab,
  Tabs,
  Field,
  CellGroup,
  Button,
  Image,
  Checkbox,
  Badge,
} from 'vant'

const app = createApp(App)

app.use(router)

app
  .use(Search)
  .use(Tab)
  .use(Tabs)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Image)
  .use(Checkbox)
  .use(Badge)

app.mount('#app')
