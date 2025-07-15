import Alpine from 'alpinejs'
import "htmx.org"
import PineconeRouter from 'pinecone-router'
import component from 'alpinejs-component'
import initializeRoutes from './controller/Routes'
import { initializeTranslations } from './controller/Translations'
import './assets/styles/global.less'

window.Alpine = Alpine
Alpine.plugin(component)
Alpine.plugin(PineconeRouter)

document.addEventListener('alpine:init', () => {
	initializeTranslations()
	initializeRoutes(window.PineconeRouter)
});

Alpine.start()