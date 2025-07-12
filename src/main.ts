import './assets/styles/index.less'
import Alpine from 'alpinejs'
// @ts-ignore
import component from 'alpinejs-component'

Alpine.plugin(component)
window.Alpine = Alpine

Alpine.start()