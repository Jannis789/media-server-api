import Alpine from 'alpinejs'
import "htmx.org";

window.Alpine = Alpine
Alpine.start()

import.meta.glob('./assets/styles/**/*.less', { eager: true })