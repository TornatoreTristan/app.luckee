import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp, Link, Head } from '@inertiajs/inertia-vue3'
import DefaultLayout from './Layouts/Default.vue'
import VCalendar from 'v-calendar'
import 'v-calendar/style.css'

createInertiaApp({
  resolve: (name) => {
    const page = require(`./Pages/${name}`).default
    if (!page.layout) {
      page.layout = DefaultLayout
    }
    return page
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(VCalendar)
      .component('inertia-link', Link)
      .component('inertia-head', Head)
      .mount(el)
  },
})
