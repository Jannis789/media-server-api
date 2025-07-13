import type { PineconeRouter } from "pinecone-router";

function initializeRoutes(router: PineconeRouter) {
	router.settings({
		targetID: 'app',
		fetchOptions: {
			headers: { 'X-Pinecone': 'true' },
		},
	});

	router.add('/login', {
		templates: ['../view/pages/login.html'],
	});

	router.add('/', {
		handlers: [
			() => {
				router.navigate('/login');
				return false;
			},
		],
	});
}

export default initializeRoutes;