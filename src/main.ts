import Alpine from 'alpinejs'
import "htmx.org"
import PineconeRouter from 'pinecone-router'
import component from 'alpinejs-component'
import initializeRoutes from './controller/Routes'

window.Alpine = Alpine
Alpine.plugin(component)
Alpine.plugin(PineconeRouter)

document.addEventListener('alpine:init', () => {
	initializeRoutes(window.PineconeRouter)
});

Alpine.start()