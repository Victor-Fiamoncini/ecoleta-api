import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {"iconPack":"fontawesome","position":"top-right"})

const globals = undefined
if(globals) {
  globals.forEach(global => {
    Vue.toasted.register(global.name, global.message, global.options)
  })
}

export default function (ctx, inject) {
  inject('toast', Vue.toasted)
}
