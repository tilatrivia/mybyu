import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false

import PinLink from './pin-link.js'
import links from './links.js'

let data = {
  user: "Demo Student",
  links: links,
  linkMap: new Map()
}

data.links.forEach(link => {
  data.linkMap[link.id] = new PinLink(link.name, link.address, link.icon, link.heading, link.tags)
})

new Vue({
  data,
  render: h => h(App),
}).$mount('#app')
