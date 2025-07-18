import { Hono } from 'hono';
import registerUserRoutes from './User/user-routes';

const app = new Hono();

registerUserRoutes(app, '/Users/graphql');

export default app;
